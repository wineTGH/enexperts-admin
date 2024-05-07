import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { registerSchema } from "./schema";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { createNewUser, isUserExists } from "$lib/server/users.js";
import type { NewUser } from "$lib/server/db/types";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { lucia } from "$lib/server/auth";

const serverRegisterSchema = registerSchema.superRefine(async ({username, email}, ctx) => {
    const {exists, user} = await isUserExists(username, email);
    if (!exists) { return true }

    if (user?.email === email) {
        ctx.addIssue({
            code: "custom",
            path: ["email"],
            message: "Email already in use"
        })
    }
    if (user?.username === username) {
        ctx.addIssue({
            code: "custom",
            path: ["username"],
            message: "Username already in use"
        })
    }
})


export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(registerSchema))
    }
}

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(serverRegisterSchema));

        if (!form.valid) { return fail(400, {form}) }

        const userId = generateId(15);
        const hashedPassword = await new Argon2id().hash(form.data.password);

        const newUser: NewUser = {
            id: userId,
            username: form.data.username,
            firstName: form.data.firstName,
            lastName: form.data.lastName,
            email: form.data.email,
            passwordHash: hashedPassword
        };

        await createNewUser(newUser);

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: '.',
            ...sessionCookie.attributes
        });

        redirect(302, '/');
    }
}
