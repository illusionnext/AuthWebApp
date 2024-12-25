import Link from "next/link";
import Image from "next/image";

interface signUpProps {
  message: string | null;
  errors: Record<string, string>;
  formAction: (formData: FormData) => void;
  isPending: boolean;
}

export default function AuthForm({
  message,
  errors,
  formAction,
  isPending,
}: signUpProps) {
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
      {message && <p className="form-errors">{message}</p>}
      <p>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="example@example.com"
        />
        {errors.email && <span className="form-errors">{errors.email}</span>}
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
        {errors.password && (
          <span className="form-errors">{errors.password}</span>
        )}
      </p>
      <p>
        <button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Account"}
        </button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}
