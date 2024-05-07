import { getSavedUser, isUserExists } from "$lib/server/users";
import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { editUserSchema } from "./schema";
import { db } from "$lib/server/db";
import { usersTable } from "$lib/server/db/schema";
import { and, eq, ne, or } from "drizzle-orm";
import { lucia } from "$lib/server/auth";


export const load: PageServerLoad = async ({ params }) => {
    const editUser = await getSavedUser(params.id);
    if (!editUser) { error(404, "User not found"); }
    return { editUser, form: await superValidate(editUser, zod(editUserSchema)) };
}

export const actions: Actions = {
    editUser: async (event) => {
        const form = await superValidate(event, zod(editUserSchema));

        if (form.data.id !== event.params.id && event.locals.session?.id) {
            await lucia.invalidateSession(event.locals.session.id);
    
            const sessionCookie = lucia.createBlankSessionCookie();
            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: '.',
                ...sessionCookie.attributes
            });
    
            return message(form, "What are you trying to do? 🤨📸", {status: 418});
        }

        const existingUsers = await db.select().from(usersTable).where(
            and(
                ne(usersTable.id, event.params.id),
                or(eq(usersTable.username, form.data.username), eq(usersTable.email, form.data.email))
            )
        );

        existingUsers.forEach((user) => {
            if (user.username === form.data.username) { form.errors.username = ["Username already exists"]; }
            if (user.email === form.data.email) { form.errors.email = ["Email already exists"]; }
        });

        if (!form.valid) { return fail(400, { form }); }

        await db.update(usersTable).set(form.data).where(eq(usersTable.id, event.params.id));

        return message(form, "User updated");
    }
}
