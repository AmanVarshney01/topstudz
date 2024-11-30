import { getAuthUserId } from "@convex-dev/auth/server"
import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const list = query({
  args: {
    groupId: v.id("groups"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("groupId"), args.groupId))
      .order("desc")
      .take(args.limit ?? 50)

    return await Promise.all(
      messages.map(async (message) => {
        const user = await ctx.db.get(message.userId)
        const name = user?.name
        const email = user?.email
        const image = user?.image
        return {
          ...message,
          author: name ?? email ?? "Unknown",
          authorImage: image,
        }
      }),
    )
  },
})

export const send = mutation({
  args: {
    body: v.string(),
    groupId: v.id("groups"),
  },
  handler: async (ctx, { body, groupId }) => {
    const userId = await getAuthUserId(ctx)
    if (userId === null) {
      throw new Error("Not signed in")
    }

    await ctx.db.insert("messages", {
      body,
      userId,
      groupId,
      createdAt: Date.now(),
    })
  },
})
