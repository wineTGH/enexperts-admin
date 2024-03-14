import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { registerSchema } from "./schema";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { createNewUser, isUserExists } from "$lib/server/users.js";
import type { NewUser } from "$lib/server/db/types";
import bcrypt from "bcrypt";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(registerSchema))
    }
}

export const actions: Actions = {
    default: async (event) => {
        const schema = registerSchema.superRefine(async ({username, email}, ctx) => {
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

        const form = await superValidate(event, zod(schema));

        if (!form.valid) { return fail(400, {form}) }

        const newUser: NewUser = {
            username: form.data.username,
            firstName: form.data.firstName,
            lastName: form.data.lastName,
            email: form.data.email,
            passwordHash: await bcrypt.hash(form.data.password, 10)
        };

        console.log(newUser);

        const resp = await createNewUser(newUser);
        console.log(resp);
        return { form }
    }
}