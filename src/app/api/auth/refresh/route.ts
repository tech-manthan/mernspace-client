import { AUTH_SERVICE } from "@/http/client";
import { cookies } from "next/headers";

import * as cookie from "cookie";

export async function POST() {
  const cookiesHeader = await cookies();
  let accessToken = cookiesHeader.get("accessToken")?.value;
  let refreshToken = cookiesHeader.get("refreshToken")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${AUTH_SERVICE}/auth/refresh`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        cookie: `refreshToken=${refreshToken}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    cookiesHeader.delete("accessToken");
    cookiesHeader.delete("refreshToken");
    return Response.json({
      type: "error",
      message: data.errors[0].msg,
    });
  }

  const c = response.headers.getSetCookie();

  accessToken = c.find((cookie) => cookie.includes("accessToken"));
  refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

  if (!accessToken || !refreshToken) {
    cookiesHeader.delete("accessToken");
    cookiesHeader.delete("refreshToken");

    return Response.json({
      type: "error",
      message: "no cookies are found",
    });
  }

  const parsedAccessToken = cookie.parse(accessToken);
  const parsedRefreshToken = cookie.parse(refreshToken);

  cookiesHeader.set("accessToken", parsedAccessToken.accessToken as string, {
    expires: new Date(parsedAccessToken.Expires as string),
    httpOnly: (parsedAccessToken.HttpOnly as unknown as boolean) || true,
    path: parsedAccessToken.Path,
    domain: parsedAccessToken.Domain,
    sameSite: parsedAccessToken.SameSite as "strict",
  });

  cookiesHeader.set("refreshToken", parsedRefreshToken.refreshToken as string, {
    expires: new Date(parsedRefreshToken.Expires as string),
    httpOnly: (parsedRefreshToken.HttpOnly as unknown as boolean) || true,
    path: parsedRefreshToken.Path,
    domain: parsedRefreshToken.Domain,
    sameSite: parsedRefreshToken.SameSite as "strict",
  });

  return Response.json({
    type: "success",
    message: "token refreshed successfully",
  });
}
