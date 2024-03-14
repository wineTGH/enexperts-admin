import { eq, or } from "drizzle-orm";
import { db } from "$lib/server/db/index.js";
import { users } from "$lib/server/db/schema.js";
import type { NewUser } from "./db/types";


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

export async function createNewUser(user: NewUser) {
    return db.insert(users).values(user);
}