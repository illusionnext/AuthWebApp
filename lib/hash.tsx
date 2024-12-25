import crypto from "node:crypto";

export function hashUserPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex"),
    hashedPassword = crypto.scryptSync(password, salt, 64);

  return hashedPassword.toString("hex") + ":" + salt;
}

export function verifyPassword(
  storedPassword: string,
  suppliedPassword: string,
): boolean {
  const [hashedPassword, salt] = storedPassword.split(":"),
    hashedPasswordBuf = Buffer.from(hashedPassword, "hex"),
    suppliedPasswordBuf = crypto.scryptSync(suppliedPassword, salt, 64);

  return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}
