import { eq, or } from "drizzle-orm";
import { db } from "$lib/server/db/index.js";
import { usersTable } from "$lib/server/db/schema.js";
import type { NewUser, User } from "./db/types";

export async function isUserExists(username: string = "", email: string = "") {
    const result = await db.selectDistinct().from(usersTable).where(
        or(
            eq(usersTable.username, username),
            eq(usersTable.email, email)
        )
    );
    const user = result.length > 0 ? result[0] : null;
    return {exists: result.length > 0, user: user};
}

export async function getUser(username: string) {
    return (await db.select().from(usersTable).where(eq(usersTable.username, username)))[0];
}

export async function createNewUser(user: NewUser): Promise<User> {
    return (await db.insert(usersTable).values(user).returning())[0];
}

export async function getSavedUsers(page: number, limit: number = 15): Promise<import("lucia").User[]> {
    return await db.select({
        id: usersTable.id,
        username: usersTable.username,
        email: usersTable.email,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        role: usersTable.role
    })
    .from(usersTable)
    .limit(limit)
    .offset(limit * page);
}

export async function getSavedUser(id: string): Promise<import("lucia").User | null> {
    const user = (await db.select({
        id: usersTable.id,
        username: usersTable.username,
        email: usersTable.email,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        role: usersTable.role
    }).from(usersTable).where(eq(usersTable.id, id)))[0];

    return user || null;
}