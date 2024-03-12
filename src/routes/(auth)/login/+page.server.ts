import { superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { loginSchema } from "./schema";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(loginSchema))
    }
}

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(loginSchema));

        if (!form.valid) { return fail(400, {form}) }

        return { form }
    }
}