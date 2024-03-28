import { getSavedUser } from "$lib/server/users";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const editUser = await getSavedUser(params.id);
    if (!editUser) { error(404, "User not found"); }
    return { editUser };
}
