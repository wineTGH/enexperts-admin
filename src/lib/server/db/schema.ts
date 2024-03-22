import { pgTable, text, pgEnum, timestamp, integer } from "drizzle-orm/pg-core";

export const usersRoles = pgEnum('roles', ['admin', 'teacher', 'student']);

export const usersTable = pgTable("users", {
    id: text('id').primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    username: text('username').notNull().unique(),
    email: text('email').notNull().unique(),
    role: usersRoles('roles').notNull().default("student"),

    passwordHash: text('password_hash').notNull()
});

export const sessionsTable = pgTable("sessions", {
    id: text('id').primaryKey(),
    userId : text('user_id').notNull().references(() => usersTable.id),
    expiresAt : timestamp('expires_at', {
        withTimezone: true,
        mode: "date"
    }).notNull()
});
