"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UserData } from "@/types/user.types";
import logout from "@/actions/logout";
import { toast } from "sonner";

type AuthButtonsProps = {
  user: UserData | null;
};

const AuthButtons = ({ user }: AuthButtonsProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const handleLogout = async () => {
    const res = await logout();
    if (res.type === "success") {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      {user ? (
        <Button size={"sm"} onClick={handleLogout} className="cursor-pointer">
          Logout
        </Button>
      ) : (
        <Button asChild>
          <Link href={`/login?redirectTo=${redirectTo || pathName || "/"}`}>
            Login
          </Link>
        </Button>
      )}
    </>
  );
};

export default AuthButtons;
