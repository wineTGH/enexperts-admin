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

export const tokensPairs = pgTable("tokens_pairs", {
    id: serial('id').primaryKey(),
    accessToken: text('access_token').notNull().unique(),
    refreshToken: text('refresh_token').notNull().unique(),
    refreshCreateDate: timestamp('refresh_create_date', {mode: "date"}).notNull().defaultNow(),
    accessCreateDate: timestamp('access_create_date', {mode: "date"}).notNull().defaultNow(),
    used: boolean('used').default(false),
    user_id: integer('user_id').references(() => users.id)
});
