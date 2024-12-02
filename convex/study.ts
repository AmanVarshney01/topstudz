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
        totalStudyTime: 0,
        dailyGoal: 120 * 60,
      }
    }

    return settings
  },
})

export const updateSettings = mutation({
  args: {
    studyDuration: v.number(),
    dailyGoal: v.number(),
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
        dailyGoal: args.dailyGoal,
        lastUpdated: Date.now(),
      })
    } else {
      await ctx.db.insert("studySettings", {
        userId,
        studyDuration: args.studyDuration,
        dailyGoal: args.dailyGoal ?? 120 * 60,
        totalStudyTime: 0,
        lastUpdated: Date.now(),
      })
    }
  },
})

export const completeSession = mutation({
  args: {
    duration: v.number(),
    type: v.string(),
    completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    if (args.type === "study" && args.completed) {
      const settings = await ctx.db
        .query("studySettings")
        .filter((q) => q.eq(q.field("userId"), userId))
        .first()

      if (settings) {
        const newTotalTime = settings.totalStudyTime + args.duration
        await ctx.db.patch(settings._id, {
          totalStudyTime: newTotalTime,
          lastUpdated: Date.now(),
        })
      } else {
        await ctx.db.insert("studySettings", {
          userId,
          studyDuration: 25 * 60,
          totalStudyTime: args.duration,
          lastUpdated: Date.now(),
        })
      }
    }
    await ctx.db.insert("studySessions", {
      userId,
      startTime: Date.now() - args.duration * 1000,
      endTime: Date.now(),
      duration: args.duration,
      type: args.type,
      completed: args.completed,
    })
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

export const getFullStats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const settings = await ctx.db
      .query("studySettings")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first()

    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const recentSessions = await ctx.db
      .query("studySessions")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.gt(q.field("startTime"), sevenDaysAgo),
        ),
      )
      .order("desc")
      .collect()

    const completedSessions = recentSessions.filter(
      (session) => session.completed,
    )
    const totalSessionsCount = recentSessions.length
    const completedSessionsCount = completedSessions.length

    return {
      totalStudyTime: settings?.totalStudyTime ?? 0,
      studyDuration: settings?.studyDuration ?? 25 * 60,
      dailyGoal: settings?.dailyGoal ?? 120 * 60,
      recentSessions: recentSessions.map((session) => ({
        startTime: new Date(session.startTime).toISOString(),
        endTime: session.endTime
          ? new Date(session.endTime).toISOString()
          : null,
        duration: session.duration,
        type: session.type,
        completed: session.completed,
      })),
      stats: {
        totalSessions: totalSessionsCount,
        completedSessions: completedSessionsCount,
        completionRate:
          totalSessionsCount > 0
            ? ((completedSessionsCount / totalSessionsCount) * 100).toFixed(1)
            : 0,
      },
    }
  },
})
