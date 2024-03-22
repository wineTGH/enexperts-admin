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
