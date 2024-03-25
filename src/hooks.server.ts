import { lucia } from "$lib/server/auth";
import { type Handle, error } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export const auth: Handle = async ({event, resolve}) => {
    const sessionId = event.cookies.get(lucia.sessionCookieName);
    if (!sessionId) {
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.id);

        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: '.',
            ...sessionCookie.attributes
        });
    }

    if (!session) {
        const sessionCookie = lucia.createBlankSessionCookie();
    
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: '.',
            ...sessionCookie.attributes
        });
    }

    event.locals.user = user;
    event.locals.session = session;
    
    return resolve(event);
}

export const routes: Handle = async ({event, resolve}) => {
    if (event.route.id?.includes('(protected)')) {
        if (!event.locals.user?.role.match('admin')) {
            error(403, {
                message: "You don't have permission to access this page"
            });
        }
    }

    return resolve(event);
}

export const handle = sequence(auth, routes);