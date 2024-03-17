import { pgTable, serial, text, pgEnum, boolean, timestamp, integer } from "drizzle-orm/pg-core";

export const usersRoles = pgEnum('roles', ['admin', 'teacher', 'student']);

export const users = pgTable("users", {
    id: serial('id').primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    username: text('username').notNull().unique(),
    email: text('email').notNull().unique(),
    role: usersRoles('roles').notNull().default("student"),

    passwordHash: text('password_hash').notNull()
});

export const refreshTokens = pgTable("refresh_tokens", {
    id: serial('id').primaryKey(),
    refreshToken: text('refresh_token').notNull().unique(),
    creationDate: timestamp('creation_date', {mode: "date"}).notNull().defaultNow(),
    used: boolean('used').default(false),
    userId: integer('user_id').references(() => users.id)
});
