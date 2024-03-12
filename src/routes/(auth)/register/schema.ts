import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    
    first_name: z.string().min(2).max(50),
    last_name: z.string().min(2).max(50),

    password: z.string().min(8).max(64),
    repeat_password: z.string().min(8).max(64),
})

export type RegisterSchema = typeof registerSchema;