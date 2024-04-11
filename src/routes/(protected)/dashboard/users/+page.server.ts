import { getSavedUsers } from '$lib/server/users';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const users = await getSavedUsers();
    return {users};
}) satisfies PageServerLoad;