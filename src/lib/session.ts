import { AUTH_SERVICE } from "@/http/client";
import { UserData } from "@/types/user.types";
import { cookies } from "next/headers";

type Session = {
  user: UserData | null;
};

export const getSession = async (): Promise<Session> => {
  return await getSelf();
};

const getSelf = async (): Promise<{ user: UserData | null }> => {
  const cookiesHeader = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${AUTH_SERVICE}/auth/self`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookiesHeader.get("accessToken")?.value}`,
      },
    }
  );

  if (!response.ok) {
    return {
      user: null,
    };
  }

  return {
    user: await response.json(),
  };
};
