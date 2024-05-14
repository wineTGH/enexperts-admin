import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad, Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { mediaUploadSchema } from './schema';
import { UPLOAD_DIR } from '$env/static/private';

import fs from "node:fs";
import path from "node:path";
import { db } from '$lib/server/db';
import { mediaTable } from '$lib/server/db/schema';
import { generateId } from 'lucia';
import { eq } from 'drizzle-orm';

export const load = (async () => {
    return {
        form: await superValidate(zod(mediaUploadSchema))
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    uploadMedia: async (event) => {
        const form = await superValidate(event, zod(mediaUploadSchema));

        if (!form.valid) { return fail(400, form); }

        const mediaFile = form.data.media;
        const extPat = /\.[0-9a-z]+$/i;
        const mediaName = mediaFile.name.replace(extPat, '') + crypto.randomUUID() + (mediaFile.name.match(extPat)?.[0] || "");

        const uploadMediaDir = path.join(UPLOAD_DIR, mediaName[0], mediaName[1]);
        if (!fs.existsSync(uploadMediaDir)) { fs.mkdirSync(uploadMediaDir, {recursive: true}); }
        
        const uploadMediaPath = `${uploadMediaDir}/${mediaName}`;
        
        const mediaRecordId = generateId(15);
        try {
            await db.insert(mediaTable).values({
                id: mediaRecordId,
                path: uploadMediaPath.replace('static', ''),
                userId: event.locals.user?.id || "",
                type: mediaFile.type,
                uploaded_at: new Date()
            });
            
        } catch (e) {
            console.error(e);
            return message(form, "Something gone wrong while uploading file", {status: 500});
        }
        
        try {
            fs.writeFileSync(uploadMediaPath, Buffer.from(await mediaFile.arrayBuffer()));
        } catch (e) {
            console.error(e);
            await db.delete(mediaTable).where(eq(mediaTable.id, mediaRecordId));

            return message(form, "Something gone wrong while uploading file", {status: 500});
        }

        return message(form, "File uploaded successfully!");
    }
}