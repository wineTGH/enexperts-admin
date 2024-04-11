import { z } from "zod";

export const editUserSchema = z.object({
    id: z.string(),
    username: z.string().min(2).max(50).regex(/^[a-z0-9_]+$/),
    email: z.string().email(),
    
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),

    role: z.enum(["admin", "teacher", "student"]),
})

export const changePasswordSchema = z.object({
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


export type EditUserSchema = typeof editUserSchema;
export type ChangePasswordSchema = typeof changePasswordSchema;