"use client";

import login, { LoginResponse } from "@/actions/login";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useActionState, useEffect } from "react";
import SubmitButton from "./submit-button";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const initialState: LoginResponse = {
  type: "",
  message: "",
};

const LoginForm = () => {
  const [state, formAction] = useActionState(login, initialState);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (state.type === "success") {
      toast.success(state.message, {});
      const redirectTo = searchParams.get("redirectTo");
      router.push(redirectTo ? redirectTo : "");
    } else if (state.type === "error") {
      toast.error(state.message);
    }
  }, [state, searchParams, router]);
  return (
    <form action={formAction}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="manthan@gmail.com"
            type="email"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href={"/forgot-password"}>Forgot your password?</Link>
          </div>
          <Input id="password" name="password" placeholder="*******" required />
        </div>
        <SubmitButton />
      </div>
    </form>
  );
};

export default LoginForm;
