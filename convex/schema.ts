import { authTables } from "@convex-dev/auth/server"
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
export default defineSchema({
  ...authTables,
  groups: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_creation", ["createdAt"]),
  groupMembers: defineTable({
    groupId: v.id("groups"),
    userId: v.id("users"),
    joinedAt: v.number(),
  })
    .index("by_group", ["groupId"])
    .index("by_user", ["userId"])
    .index("by_group_and_user", ["groupId", "userId"]),
  messages: defineTable({
    userId: v.id("users"),
    body: v.string(),
    groupId: v.id("groups"),
    createdAt: v.number(),
  })
    .index("by_group", ["groupId", "createdAt"])
    .index("by_user", ["userId", "createdAt"]),
})
