import { eq } from "drizzle-orm";
import { db } from ".";
import { users } from "./schema";

export const getUserByEmail = async (email: string) => {
  return db.query.users.findFirst({
    where: eq(users.email, email),
  });
};
