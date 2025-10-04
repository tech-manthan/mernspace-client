"use server";

import { AUTH_SERVICE } from "@/http/client";
import { z } from "zod";
import { parse as parseCookie } from "cookie";
import { cookies } from "next/headers";

const registerSchema = z.object({
  firstName: z
    .string({ error: "Firstname is required" })
    .min(3, "Firstname must have atleast 3 characters"),
  lastName: z
    .string({ error: "Lastname is required" })
    .min(1, "Lastname must have atleast 1 character"),
  email: z.email({ message: "Email is invalid" }),
  password: z
    .string()
    .regex(
      /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>\/?`~])(?!.*\s).*$/,
      {
        error:
          "Password must have at least one uppercase, one lowercase, one digit, one special character, and be at least 8 characters long",
      }
    ),
});

export type RegisterResponse = {
  type: "error" | "success" | "";
  message: string;
};

export default async function register(
  prevState: unknown,
  formData: FormData
): Promise<RegisterResponse> {
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");

  const result = registerSchema.safeParse({
    email,
    password,
    firstName,
    lastName,
  });

  if (!result.success) {
    return {
      type: "error",
      message:
        Object.values(
          z.treeifyError(result.error).properties as {
            [key: string]: { errors: string[] } | undefined;
          }
        )
          .at(0)
          ?.errors.at(0) || "internal server error",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${AUTH_SERVICE}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: result.data.email,
          password: result.data.password,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
        }),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      return {
        type: "error",
        message: data.errors[0].msg,
      };
    }

    const c = response.headers.getSetCookie();

    const accessToken = c.find((cookie) => cookie.includes("accessToken"));
    const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

    if (!accessToken || !refreshToken) {
      return {
        type: "error",
        message: "no cookies are found",
      };
    }

    const parsedAccessToken = parseCookie(accessToken);
    const parsedRefreshToken = parseCookie(refreshToken);

    const cookiesHeader = await cookies();

    cookiesHeader.set("accessToken", parsedAccessToken.accessToken as string, {
      expires: new Date(parsedAccessToken.Expires as string),
      httpOnly: (parsedAccessToken.HttpOnly as unknown as boolean) || true,
      path: parsedAccessToken.Path,
      domain: parsedAccessToken.Domain,
      sameSite: parsedAccessToken.SameSite as "strict",
    });

    cookiesHeader.set(
      "refreshToken",
      parsedRefreshToken.refreshToken as string,
      {
        expires: new Date(parsedRefreshToken.Expires as string),
        httpOnly: (parsedRefreshToken.HttpOnly as unknown as boolean) || true,
        path: parsedRefreshToken.Path,
        domain: parsedRefreshToken.Domain,
        sameSite: parsedRefreshToken.SameSite as "strict",
      }
    );

    return {
      type: "success",
      message: "login successfully",
    };
  } catch (error) {
    return {
      type: "error",
      message: (error as Error).message,
    };
  }
}
