import { relations } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccountType } from "next-auth/adapters";

// TODO Add achievements table
// TODO add indexes

export const users = sqliteTable(
  "user",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
    image: text("image"),
    stateId: integer("state_id").references(() => states.id),
    collegeId: text("college_id").references(() => colleges.id),
  },
  (table) => {
    return {
      emailIdx: index("email_idx").on(table.email),
    };
  },
);

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const friendships = sqliteTable("friendships", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId1: integer("user_id1")
    .notNull()
    .references(() => users.id),
  userId2: integer("user_id2")
    .notNull()
    .references(() => users.id),
  status: text("status", {
    enum: ["pending", "accepted", "rejected"],
  }).notNull(),
});

export const colleges = sqliteTable("colleges", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  stateId: integer("state_id")
    .notNull()
    .references(() => states.id),
});

export const states = sqliteTable("states", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const studyGroups = sqliteTable("study_groups", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  collegeId: text("college_id")
    .notNull()
    .references(() => colleges.id),
});

export const studyGroupMembers = sqliteTable("study_group_members", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  groupId: integer("group_id")
    .notNull()
    .references(() => studyGroups.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  role: text("role", { enum: ["admin", "member"] }).notNull(),
});

export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  startTime: integer("start_time", { mode: "timestamp" }).notNull(),
  endTime: integer("end_time", { mode: "timestamp" }).notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  groupId: text("group_id").references(() => studyGroups.id),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
});

export const eventParticipants = sqliteTable("event_participants", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eventId: text("event_id")
    .notNull()
    .references(() => events.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const studySessions = sqliteTable("study_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  eventId: text("event_id").references(() => events.id),
  startTime: integer("start_time", { mode: "timestamp" }).notNull(),
  endTime: integer("end_time", { mode: "timestamp" }),
  duration: integer("duration"),
});

export const userRelations = relations(users, ({ many, one }) => ({
  friendships: many(friendships),
  studyGroupMembers: many(studyGroupMembers),
  studySessions: many(studySessions),
  events: many(events),
  eventParticipants: many(eventParticipants),
  state: one(states, {
    fields: [users.stateId],
    references: [states.id],
  }),
  college: one(colleges, {
    fields: [users.collegeId],
    references: [colleges.id],
  }),
}));

export const friendshipsRelations = relations(friendships, ({ one }) => ({
  user1: one(users, {
    fields: [friendships.userId1],
    references: [users.id],
  }),
  user2: one(users, {
    fields: [friendships.userId2],
    references: [users.id],
  }),
}));

export const collegesRelations = relations(colleges, ({ one, many }) => ({
  users: many(users),
  studyGroups: many(studyGroups),
  state: one(states, {
    fields: [colleges.stateId],
    references: [states.id],
  }),
}));

export const statesRelations = relations(states, ({ one, many }) => ({
  colleges: many(colleges),
  users: many(users),
}));

export const studyGroupsRelations = relations(studyGroups, ({ one, many }) => ({
  college: one(colleges, {
    fields: [studyGroups.collegeId],
    references: [colleges.id],
  }),
  members: many(studyGroupMembers),
  events: many(events),
}));

export const studyGroupMembersRelations = relations(
  studyGroupMembers,
  ({ one }) => ({
    group: one(studyGroups, {
      fields: [studyGroupMembers.groupId],
      references: [studyGroups.id],
    }),
    user: one(users, {
      fields: [studyGroupMembers.userId],
      references: [users.id],
    }),
  }),
);

export const eventsRelations = relations(events, ({ many, one }) => ({
  creator: one(users, {
    fields: [events.createdBy],
    references: [users.id],
  }),
  group: one(studyGroups, {
    fields: [events.groupId],
    references: [studyGroups.id],
  }),
  participants: many(eventParticipants),
  studySessions: many(studySessions),
}));

export const eventParticipantsRelations = relations(
  eventParticipants,
  ({ one }) => ({
    event: one(events, {
      fields: [eventParticipants.eventId],
      references: [events.id],
    }),
    user: one(users, {
      fields: [eventParticipants.userId],
      references: [users.id],
    }),
  }),
);

export const studySessionsRelations = relations(studySessions, ({ one }) => ({
  user: one(users, {
    fields: [studySessions.userId],
    references: [users.id],
  }),
  event: one(events, {
    fields: [studySessions.eventId],
    references: [events.id],
  }),
}));
