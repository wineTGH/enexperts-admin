import { dev } from "$app/environment";
import { isValidAccessToken, isValidRefreshToken, updateTokens } from "$lib/server/tokens";
import { type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export const user: Handle = async ({ event, resolve }) => {
    const accessToken = event.cookies.get('accessToken');
    if (!event.locals.user && accessToken) {
        const valid = await isValidAccessToken(accessToken);
        event.locals.user = valid;
    }
    
    return resolve(event);
}

export const auth: Handle = async ({event, resolve}) => {
    const accessToken = event.cookies.get('accessToken');
    const refreshToken = event.cookies.get('refreshToken');

    if (!refreshToken || refreshToken == "undefined") { return resolve(event); } 

    let isValid = await isValidAccessToken(accessToken);

    if (isValid) { return resolve(event); }
    
    isValid = await isValidRefreshToken(refreshToken);

    if (!isValid) {
        event.cookies.delete('refreshToken', {path: '/'});
        event.cookies.delete('accessToken', {path: '/'});
        event.locals.user = null;

        return resolve(event);
    }

    const newTokens = await updateTokens(refreshToken);

    event.cookies.set('accessToken', newTokens.accessToken, {path: '/', secure: !dev, httpOnly: true});
    event.cookies.set('refreshToken', newTokens.refreshToken, {path: '/', secure: !dev, httpOnly: true});
    
    return resolve(event);
}

export const routes: Handle = async ({event, resolve}) => {
    //TODO: check if user allowed to visit protected route
    
    return resolve(event);
}

export const handle = sequence(auth, user, routes);