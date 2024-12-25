import DB from "./db";
import { trainingsTypes } from "@/types/trainings";

export async function getTrainings(): Promise<trainingsTypes[]> {
  const db = await DB();
  const stmt = db.prepare("SELECT * FROM trainings");
  return stmt.all() as trainingsTypes[];
}
