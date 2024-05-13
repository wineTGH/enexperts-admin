import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { getSavedUsers } from '$lib/server/users';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { z } from "zod";
import { zod } from "sveltekit-superforms/adapters";
import { fail, message, superValidate } from 'sveltekit-superforms';

const deleteUserSchema = z.object({
    id: z.string().refine(async (value) => {
        const users = await db.select()
            .from(usersTable)
            .where(
                eq(usersTable.id, value)
            )
        
        return users.length > 0;
    })
});

export const load = (async () => {
    const users = await getSavedUsers();
    return {users};

}) satisfies PageServerLoad;

export const actions: Actions = {
    deleteUser: async (event) => {
        const form = await superValidate(event, zod(deleteUserSchema));
        console.log(form);

        if (!form.valid) { return fail(400) }

        await db.delete(usersTable).where(eq(usersTable.id, form.data.id));

        return message(form, 'User deleted');
    }
};
