import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    if (event.locals.user && event.locals.user?.role == "admin") {
        redirect(302, "/dashboard");
    }
};