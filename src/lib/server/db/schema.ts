import { pgTable, text, pgEnum, timestamp } from "drizzle-orm/pg-core";

export const usersRoles = ['admin', 'teacher', 'student'] as const;

const usersRolesEnum = pgEnum('roles', usersRoles);

export const usersTable = pgTable("users", {
    id: text('id').primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    username: text('username').notNull().unique(),
    email: text('email').notNull().unique(),
    role: usersRolesEnum('roles').notNull().default("student"),

    passwordHash: text('password_hash').notNull()
});

export const sessionsTable = pgTable("sessions", {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => usersTable.id),
    expiresAt: timestamp('expires_at', {
        withTimezone: true,
        mode: "date"
    }).notNull()
});

export const mediaTable = pgTable("media", {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => usersTable.id),
    type: text('type').notNull(),
    path: text('path').notNull(),

    uploaded_at: timestamp('uploaded_at', {mode: "date"}).notNull()
});