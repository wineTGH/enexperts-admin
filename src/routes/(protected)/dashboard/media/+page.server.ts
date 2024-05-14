import { fail, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad, Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { mediaUploadSchema } from './schema';
import { UPLOAD_DIR } from '$env/static/private';

import fs from "node:fs";
import path from "node:path";

export const load = (async () => {
    return {
        form: await superValidate(zod(mediaUploadSchema))
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    uploadMedia: async (event) => {
        const form = await superValidate(event, zod(mediaUploadSchema));
        console.log(form);

        if (!form.valid) { return fail(400, form); }

        const mediaFile = form.data.media;
        const extPat = /\.[0-9a-z]+$/i;
        const mediaName = mediaFile.name.replace(extPat, '') + crypto.randomUUID() + (mediaFile.name.match(extPat)?.[0] || "")

        const uploadMediaDir = path.join(UPLOAD_DIR, mediaName[0], mediaName[1]);

        if (!fs.existsSync(uploadMediaDir)) { fs.mkdirSync(uploadMediaDir, {recursive: true}); }

        fs.writeFileSync(`${uploadMediaDir}/${mediaName}`, Buffer.from(await mediaFile.arrayBuffer()));
    }
}