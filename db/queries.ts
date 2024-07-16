import { and, eq, or } from "drizzle-orm";
import { db } from ".";
import { friendships, users } from "./schema";

export const getUserByEmail = async (email: string) => {
  return db.query.users.findFirst({
    where: eq(users.email, email),
  });
};

export const getUserFriends = async (userId: number) => {
  const friends = await db.query.friendships.findMany({
    where: and(
      or(
        eq(friendships.requesterId, userId),
        eq(friendships.addresseeId, userId),
      ),
      eq(friendships.status, "accepted"),
    ),
    columns: {
      requesterId: true,
    },
    with: {
      requester: {
        columns: {
          name: true,
          email: true,
          image: true,
        },
      },
      addressee: {
        columns: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  return friends.map((friendship) =>
    friendship.requesterId === userId
      ? friendship.addressee
      : friendship.requester,
  );
};
