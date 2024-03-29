import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "./db";
import { sessionsTable, usersTable } from "./db/schema";
import { dev } from "$app/environment";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionsTable, usersTable);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !dev
        }
    },

    getUserAttributes: (attributes) => {
        return {
            username: attributes.username,
            email: attributes.email,
            firstName: attributes.firstName,
            lastName: attributes.lastName,
            role: attributes.role
        };
    }
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "student" | "teacher" | "admin";
}
