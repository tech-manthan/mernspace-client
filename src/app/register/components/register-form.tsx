"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useEffect } from "react";
import SubmitButton from "./submit-button";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import register, { RegisterResponse } from "@/actions/register";
import PasswordInput from "@/components/custom/password-input";

const initialState: RegisterResponse = {
  type: "",
  message: "",
};

const LoginForm = () => {
  const [state, formAction] = useActionState(register, initialState);
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
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="Manthan"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Last Name</Label>
          <Input id="lastName" name="lastName" placeholder="Sharma" required />
        </div>
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
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Manthan@123"
            required
          />
        </div>
        <SubmitButton />
      </div>
    </form>
  );
};

export default LoginForm;
