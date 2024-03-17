import { eq, or } from "drizzle-orm";
import { db } from "$lib/server/db/index.js";
import { users } from "$lib/server/db/schema.js";
import type { NewUser, User } from "./db/types";


export async function isUserExists(username: string = "", email: string = "") {
    const result = await db.selectDistinct().from(users).where(
        or(
            eq(users.username, username),
            eq(users.email, email)
        )
    );
    const user = result.length > 0 ? result[0] : null;
    return {exists: result.length > 0, user: user};
}

export async function getUser(username: string) {
    return (await db.select().from(users).where(eq(users.username, username)))[0];
}

export async function createNewUser(user: NewUser): Promise<User | null> {
    return (await db.insert(users).values(user).returning())[0] || null;
}