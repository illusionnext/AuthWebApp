"use client";
import Link from "next/link";
import Image from "next/image";
import { useActionState } from "react";
import { signUp } from "@/actions/auth";

// interface signUpProps {
//   message: string | null;
//   errors: Record<string, string>;
//   formAction: (formData: FormData) => void;
//   isPending: boolean;
// }

export default function AuthForm() {
  const [state, formAction, isPending] = useActionState(signUp, {
    message: null,
    errors: {},
  });
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <Image
          width={200}
          height={200}
          src="/images/auth-icon.jpg"
          alt="A lock icon"
          priority
        />
      </div>

      <p>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="example@example.com"
        />
        {state?.errors?.email && (
          <span id="form-errors">{state.errors.email}</span>
        )}
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Password must be at least 8 characters long"
        />
        {state?.errors?.password && (
          <span id="form-errors">{state.errors.password}</span>
        )}
      </p>
      <p>
        <button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Account"}
        </button>
        {state?.message && <span id="form-errors">{state.message}</span>}
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}
