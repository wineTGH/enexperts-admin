import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),

    password: z.string().min(8).max(64),
    repeatPassword: z.string().min(8).max(64),
}).superRefine(({password, repeatPassword}, ctx) => {
    if (password !== repeatPassword) {
        ctx.addIssue({
            code: "custom",
            path: ["repeatPassword"],
            message: "Passwords don't match"
        })
    }
})

export type RegisterSchema = typeof registerSchema;