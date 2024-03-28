import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(2).max(50).regex(/^[a-z0-9_]+$/),
    password: z.string().min(8).max(64)
});

export type LoginSchema = typeof loginSchema;