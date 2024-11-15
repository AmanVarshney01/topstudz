import { auth } from "@/auth"
import { and, eq, or } from "drizzle-orm"
import { cache } from "react"
import { db } from "."
import { friendships, users } from "./schema"

export const getCurrentUser = cache(async () => {
  const session = await auth()

  if (!session) {
    throw new Error("No session found")
  }

  return {
    id: session.user?.id,
    email: session.user?.email,
    name: session.user?.name,
    image: session.user?.image,
  }
})

export const getUserByEmail = async (email: string) => {
  return db.query.users.findFirst({
    where: eq(users.email, email),
  })
}

export const getUserFriendRequests = async (userId: string) => {
  return db.query.friendships.findMany({
    where: and(
      eq(friendships.addresseeId, userId),
      eq(friendships.status, "pending"),
    ),
    columns: {
      id: true,
    },
    with: {
      requester: {
        columns: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  })
}

export const getUserFriends = async (userId: string) => {
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
  })

  return friends.map((friendship) =>
    friendship.requesterId === userId
      ? friendship.addressee
      : friendship.requester,
  )
}
