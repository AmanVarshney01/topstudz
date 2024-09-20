import { z } from "zod"

export const createFriendRequestSchema = z.object({
  email: z.string().email(),
})

// export const friendshipSchema = z.object({
//   id: z.number(),
//   requesterId: z.number(),
//   addresseeId: z.number(),
//   status: z.enum(["pending", "accepted", "rejected"]),
//   createdAt: z.number(),
//   updatedAt: z.number(),
// });

// export const collegeSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   stateId: z.number(),
// });

// export const stateSchema = z.object({
//   id: z.number(),
//   name: z.string(),
// });

// export const studyGroupSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   description: z.string().nullable(),
//   collegeId: z.number(),
// });

// export const studyGroupMemberSchema = z.object({
//   id: z.number(),
//   groupId: z.number(),
//   userId: z.number(),
//   role: z.enum(["admin", "member"]),
// });

// export const eventSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   startTime: z.number(),
//   endTime: z.number(),
//   createdBy: z.number(),
//   groupId: z.number().nullable(),
//   isActive: z.boolean(),
// });

// export const eventParticipantSchema = z.object({
//   id: z.number(),
//   eventId: z.number(),
//   userId: z.number(),
// });

// export const studySessionSchema = z.object({
//   id: z.number(),
//   userId: z.number(),
//   eventId: z.number().nullable(),
//   startTime: z.number(),
//   endTime: z.number().nullable(),
//   duration: z.number().nullable(),
// });
