"use server";
import "server-only";

import DB from "./db";

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const db = await DB();
    const user = db
      .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
      .run(email, password);
    return user.lastInsertRowid;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}
