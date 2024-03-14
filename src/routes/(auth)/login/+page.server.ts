import { superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { loginSchema } from "./schema";
import { fail } from "@sveltejs/kit";
import { isUserExists } from "$lib/server/users";
import bcrypt from "bcrypt";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(loginSchema))
    }
}

export const actions: Actions = {
    default: async (event) => {
        const schema = loginSchema.superRefine(async ({username, password}, ctx) => {
            const {exists, user} = await isUserExists(username);

            if (!exists) {
                ctx.addIssue({
                    code: "custom",
                    path: ["username"],
                    message: "Can't find user with this username",
                })
                return false;
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

        const form = await superValidate(event, zod(schema));

        if (!form.valid) { return fail(400, {form}) }

        return { form }
    }
}