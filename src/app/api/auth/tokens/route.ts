import { cookies } from "next/headers";

export async function GET() {
  const cookieHeader = await cookies();

  return Response.json({
    accessToken: cookieHeader.get("accessToken")?.value,
  });
}
