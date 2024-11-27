import { getAuthUserId } from "@convex-dev/auth/server"
import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Queries
export const get = query({
  args: { groupId: v.id("groups") },
  handler: async (ctx, args) => {
    const group = await ctx.db.get(args.groupId)
    if (!group) return null

    const creator = await ctx.db.get(group.createdBy)

    return {
      ...group,
      creator,
    }
  },
})

export const list = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50
    return await ctx.db.query("groups").order("desc").take(limit)
  },
})

export const listMyGroups = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) {
      throw new Error("Not authenticated")
    }

    const memberships = await ctx.db
      .query("groupMembers")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect()

    const groupIds = memberships.map((m) => m.groupId)
    const groups = await Promise.all(groupIds.map((id) => ctx.db.get(id)))

    return groups.filter((g) => g !== null)
  },
})

export const getMembers = query({
  args: { groupId: v.id("groups") },
  handler: async (ctx, args) => {
    const memberships = await ctx.db
      .query("groupMembers")
      .filter((q) => q.eq(q.field("groupId"), args.groupId))
      .collect()

    const members = await Promise.all(
      memberships.map(async (membership) => {
        const user = await ctx.db.get(membership.userId)
        return {
          ...membership,
          user,
        }
      }),
    )

    return members
  },
})

// Mutations
export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) {
      throw new Error("Not authenticated")
    }

    const now = Date.now()
    const groupId = await ctx.db.insert("groups", {
      name: args.name,
      description: args.description,
      createdBy: userId,
      createdAt: now,
      updatedAt: now,
    })

    // Add creator as a member
    await ctx.db.insert("groupMembers", {
      groupId,
      userId,
      joinedAt: now,
    })

    return groupId
  },
})

export const update = mutation({
  args: {
    groupId: v.id("groups"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) {
      throw new Error("Not authenticated")
    }

    const group = await ctx.db.get(args.groupId)
    if (!group) {
      throw new Error("Group not found")
    }

    if (group.createdBy !== userId) {
      throw new Error("Not authorized")
    }

    const updates: any = {
      updatedAt: Date.now(),
    }
    if (args.name !== undefined) updates.name = args.name
    if (args.description !== undefined) updates.description = args.description

    await ctx.db.patch(args.groupId, updates)
  },
})

export const join = mutation({
  args: {
    groupId: v.id("groups"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) {
      throw new Error("Not authenticated")
    }

    // Check if already a member
    const existing = await ctx.db
      .query("groupMembers")
      .filter((q) =>
        q.and(
          q.eq(q.field("groupId"), args.groupId),
          q.eq(q.field("userId"), userId),
        ),
      )
      .first()

    if (existing) {
      throw new Error("Already a member")
    }

    await ctx.db.insert("groupMembers", {
      groupId: args.groupId,
      userId,
      joinedAt: Date.now(),
    })
  },
})

export const leave = mutation({
  args: {
    groupId: v.id("groups"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) {
      throw new Error("Not authenticated")
    }

    const membership = await ctx.db
      .query("groupMembers")
      .filter((q) =>
        q.and(
          q.eq(q.field("groupId"), args.groupId),
          q.eq(q.field("userId"), userId),
        ),
      )
      .first()

    if (!membership) {
      throw new Error("Not a member")
    }

    await ctx.db.delete(membership._id)
  },
})
