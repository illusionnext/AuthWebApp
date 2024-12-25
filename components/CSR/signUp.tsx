"use client";
import { useActionState } from "react";
import { signUp } from "@/actions/auth";
import AuthForm from "@/components/auth-form";

export default function SignUpData() {
  const [state, formAction, isPending] = useActionState(signUp, {
    message: null,
    errors: {},
  });

  return (
    <AuthForm
      message={state.message}
      errors={state.errors}
      formAction={formAction}
      isPending={isPending}
    />
  );
}
