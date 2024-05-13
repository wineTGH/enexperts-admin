import { superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { loginSchema } from "./schema";
import { fail, redirect } from "@sveltejs/kit";
import { getUser, isUserExists } from "$lib/server/users";
import { Argon2id } from "oslo/password";
import { lucia } from "$lib/server/auth";

const serverLoginSchema = loginSchema.superRefine(async ({username, password}, ctx) => {
    const {exists, user} = await isUserExists(username);

    if (!exists) {
        ctx.addIssue({
            code: "custom",
            path: ["password"],
            message: "Invalid password or username",
        })
    }

    const isPasswordValid = await new Argon2id().verify(user?.passwordHash || "", password);

    if (!isPasswordValid) {
        ctx.addIssue({
            code: "custom",
            path: ["password"],
            message: "Invalid password or username"
        })
    }
})

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(loginSchema))
    }
}

export const actions: Actions = {
    default: async (event) => {

        const form = await superValidate(event, zod(serverLoginSchema));

        if (!form.valid) { return fail(400, {form}) }

        const user = await getUser(form.data.username);
        
        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: '.',
            ...sessionCookie.attributes
        })

        const fromUrl = event.url.searchParams.get('from')?.slice(1);
        redirect(302, `/${fromUrl || ''}`);
    }
}