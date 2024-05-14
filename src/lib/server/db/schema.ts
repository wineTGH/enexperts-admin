import { pgTable, text, pgEnum, timestamp } from "drizzle-orm/pg-core";

//? Weirdest shit I've ever written in my life. Wtf TypeScript?
export const usersRoles = ['admin', 'teacher', 'student'] as readonly [string, ...string[]];

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
    date: timestamp('uploaded_at', {
        withTimezone: true,
        mode: "date"
    })
});