"use server";
import "server-only";
import { createUser } from "@/lib/user";
import { hashUserPassword } from "@/lib/hash";
import { redirect } from "next/navigation";

interface signUpProps {
  message: string | null;
  errors: Record<string, string>;
}

export async function signUp(
  prevState: signUpProps | null,
  formData: FormData,
): Promise<signUpProps> {
  const errors: Record<string, string> = {};

  const email = formData.get("email") as string,
    password = formData.get("password") as string;

  // Validate inputs
  if (!email || !email.includes("@")) errors.email = "Valid email is required.";
  if (!password || password.trim().length < 8)
    errors.password = "Password must be at least 8 characters long.";

  // **Return errors if validation fails**
  if (Object.keys(errors).length > 0) {
    return {
      message: "Validation failed. Please fix the errors below.",
      errors,
    };
  }

  // **No errors: Proceed to hash the password data**
  const hashedPassword = hashUserPassword(password);

  // **No errors: Proceed to save data**
  try {
    await createUser({ email, password: hashedPassword });
    console.dir("i am creating user... 💥🦈");
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        message: "Validation failed. Email already in use.",
        errors: { email: "Email already in use." },
      };
    }
    console.error("Error at creating user: ❌🥊", error);
    return {
      message: "An unexpected error occurred while creating a user.",
      errors: {},
    };
  }

  // Redirect after successful user creation
  console.dir("redirecting to the training page... 💥🦈🚀 ");
  redirect("/training");
}
