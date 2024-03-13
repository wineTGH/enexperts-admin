import { pgTable, serial, text, pgEnum, boolean, timestamp, integer } from "drizzle-orm/pg-core";

export const usersRoles = pgEnum('roles', ['admin', 'teacher', 'student']);

export const users = pgTable("users", {
    id: serial('id').primaryKey(),
    first_name: text('first_name').notNull(),
    last_name: text('last_name').notNull(),
    email: text('email'),
    role: usersRoles('roles'),
    passwordHash: text('password_hash').notNull(),
    tokensPairId: integer("tokens_pair_id").references(() => tokensPairs.id)
});

export const tokensPairs = pgTable("tokens_pairs", {
    id: serial('id').primaryKey(),
    accessToken: text('access_token').notNull().unique(),
    refreshToken: text('refresh_token').notNull().unique(),
    refreshCreateDate: timestamp('refresh_create_date', {mode: "date"}).notNull().defaultNow(),
    accessCreateDate: timestamp('access_create_date', {mode: "date"}).notNull().defaultNow(),
    used: boolean('used').default(false),
});