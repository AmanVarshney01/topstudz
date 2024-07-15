import { and, eq, or } from "drizzle-orm";
import { db } from ".";
import { friendships, users } from "./schema";

export const getUserByEmail = async (email: string) => {
  return db.query.users.findFirst({
    where: eq(users.email, email),
  });
};

export const getUserFriends = async (userId: number) => {
  return db.query.friendships.findMany({
    where: and(
      or(
        eq(friendships.requesterId, userId),
        eq(friendships.addresseeId, userId),
      ),
      eq(friendships.status, "accepted"),
    ),
    with: {
      requester: true,
      addressee: true,
    },
  });
};
