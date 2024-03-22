import { lucia } from "$lib/server/auth";
import { fail, type Actions, redirect } from "@sveltejs/kit";

export const actions: Actions = {
    default: async (event) => {
        if (!event.locals.session) { return fail(401); }

        await lucia.invalidateSession(event.locals.session.id);

        const sessionCookie = lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: '.',
            ...sessionCookie.attributes
        });

        redirect(303, '/signin');
    }
}