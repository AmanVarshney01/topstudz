"use server"

import { actionClient, ActionError } from "@/lib/safe-action"
import { createFriendRequestSchema } from "@/lib/validations"
import { and, eq } from "drizzle-orm"
import { db } from "."
import { friendships, users } from "./schema"

export const createFriendRequest = actionClient
  .schema(createFriendRequestSchema)
  .action(async ({ parsedInput: { email }, ctx: { userId } }) => {
    const addressee = await db.query.users.findFirst({
      columns: {
        id: true,
      },
      where: eq(users.email, email),
    })

    if (!addressee) {
      throw new ActionError("User not found")
    }

    if (addressee.id === userId) {
      throw new ActionError("Cannot send friend request to self")
    }

    const existingFriendship = await db.query.friendships.findFirst({
      where: and(
        eq(friendships.requesterId, userId),
        eq(friendships.addresseeId, addressee.id),
      ),
    })

    if (existingFriendship) {
      throw new ActionError("Friend request already sent")
    }

    await db.insert(friendships).values({
      requesterId: userId,
      addresseeId: addressee.id,
      status: "pending",
    })

    return {
      message: "Friend request sent",
    }
  })
