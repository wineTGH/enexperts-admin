import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { registerSchema } from "./schema";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(registerSchema))
    }
}

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(registerSchema));

        if (!form.valid) { return fail(400, {form}) }

        return { form }
    }
}