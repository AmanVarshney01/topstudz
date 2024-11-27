import { getAuthUserId } from "@convex-dev/auth/server"
import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getSettings = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const settings = await ctx.db
      .query("studySettings")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first()

    if (!settings) {
      return {
        studyDuration: 25 * 60,
        breakDuration: 5 * 60,
        totalStudyTime: 0,
      }
    }

    return settings
  },
})

export const updateSettings = mutation({
  args: {
    studyDuration: v.number(),
    breakDuration: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const existing = await ctx.db
      .query("studySettings")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first()

    if (existing) {
      await ctx.db.patch(existing._id, {
        studyDuration: args.studyDuration,
        breakDuration: args.breakDuration,
        lastUpdated: Date.now(),
      })
    } else {
      await ctx.db.insert("studySettings", {
        userId,
        studyDuration: args.studyDuration,
        breakDuration: args.breakDuration,
        totalStudyTime: 0,
        lastUpdated: Date.now(),
      })
    }
  },
})

// Complete a study session
export const completeSession = mutation({
  args: {
    duration: v.number(),
    type: v.string(), // "study" or "break"
    completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    // Record the session
    await ctx.db.insert("studySessions", {
      userId,
      startTime: Date.now() - args.duration * 1000, // Calculate start time
      endTime: Date.now(),
      duration: args.duration,
      type: args.type,
      completed: args.completed,
    })

    if (args.type === "study" && args.completed) {
      const settings = await ctx.db
        .query("studySettings")
        .filter((q) => q.eq(q.field("userId"), userId))
        .first()

      if (settings) {
        await ctx.db.patch(settings._id, {
          totalStudyTime: settings.totalStudyTime + args.duration,
          lastUpdated: Date.now(),
        })
      }
    }
  },
})

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const settings = await ctx.db
      .query("studySettings")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first()

    const recentSessions = await ctx.db
      .query("studySessions")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .take(10)

    return {
      totalStudyTime: settings?.totalStudyTime ?? 0,
      recentSessions: recentSessions ?? [],
    }
  },
})
