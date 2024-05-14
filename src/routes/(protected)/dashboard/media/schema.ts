import { z } from "zod";

const MAX_UPLOAD_SIZE = 100 * 1024 * 1024 * 8
export const imageMimeTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/webp', 'image/avif']
export const videoMimeTypes = ['video/mp4', 'video/webm']

export const mediaUploadSchema = z.object({
    media: z.instanceof(File).refine(
        (file) => { 
            return imageMimeTypes.includes(file.type) || videoMimeTypes.includes(file.type) 
        }, 'Your file should be a image or video file!')
        .refine((value) => {
            return value.size <= MAX_UPLOAD_SIZE
        }, 'Max 100 Mb upload size.')
})