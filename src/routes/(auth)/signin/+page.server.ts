import { superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { loginSchema } from "./schema";
import { fail, redirect } from "@sveltejs/kit";
import { getUser, isUserExists } from "$lib/server/users";
import bcrypt from "bcrypt";
import { createTokens } from "$lib/server/tokens";
import { dev } from "$app/environment";

const serverLoginSchema = loginSchema.superRefine(async ({username, password}, ctx) => {
    const {exists, user} = await isUserExists(username);

    if (!exists) {
        ctx.addIssue({
            code: "custom",
            path: ["username"],
            message: "Can't find user with this username",
        })
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, user?.passwordHash || "");

    if (!isPasswordValid) {
        ctx.addIssue({
            code: "custom",
            path: ["password"],
            message: "Wrong password"
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
        const {accessToken, refreshToken} = await createTokens(user);

        event.cookies.set('accessToken', accessToken, {path: '/', secure: !dev, httpOnly: true});
        event.cookies.set('refreshToken', refreshToken, {path: '/', secure: !dev, httpOnly: true});

        event.locals.user = user;

        redirect(303, '/');
    }
}