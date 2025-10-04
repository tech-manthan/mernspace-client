"use server";

import { AUTH_SERVICE } from "@/http/client";
import { cookies } from "next/headers";

export type LogoutResponse = {
  type: "error" | "success" | "";
  message: string;
};

export default async function logout(): Promise<LogoutResponse> {
  try {
    const cookiesHeader = await cookies();

    console.log(cookiesHeader.get("accessToken")?.value);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${AUTH_SERVICE}/auth/logout`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookiesHeader.get("accessToken")?.value}`,
          cookie: `refreshToken=${cookiesHeader.get("refreshToken")?.value}`,
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      return {
        type: "error",
        message: data.errors[0].msg,
      };
    }

    cookiesHeader.delete("accessToken");

    cookiesHeader.delete("refreshToken");

    return {
      type: "success",
      message: "logout successfully",
    };
  } catch (error) {
    return {
      type: "error",
      message: (error as Error).message,
    };
  }
}
