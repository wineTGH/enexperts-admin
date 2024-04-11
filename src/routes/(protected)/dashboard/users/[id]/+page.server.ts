import { getSavedUser, isUserExists } from "$lib/server/users";
import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { editUserSchema } from "./schema";

const serverEditUserSchema = editUserSchema.superRefine(async ({username, email, id}, ctx) => {
    const usernameResult = await isUserExists(username);
    const emailResult = await isUserExists(email);

    if (emailResult.user?.email === email && emailResult.user?.id !== id) {
        ctx.addIssue({
            path: ["email"],
            code: "custom",
            message: "Email already exists"
        });
    }

    if (usernameResult.user?.username === username && usernameResult.user?.id !== id) {
        ctx.addIssue({
            path: ["username"],
            code: "custom",
            message: "Username already exists"
        });
    }
})

export const load: PageServerLoad = async ({ params }) => {
    const editUser = await getSavedUser(params.id);
    if (!editUser) { error(404, "User not found"); }
    return { editUser, form: await superValidate(editUser, zod(editUserSchema)) };
}

export const actions: Actions = {
    editUser: async (event) => {
        const form = await superValidate(event, zod(serverEditUserSchema));

        if (!form.valid) { return fail(400, { form }); }
    }
}
