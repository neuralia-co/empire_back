import { z } from "zod";

// Signup Schema & Type
export const SignupSchema = z.object({
    body: z.object({
        email: z.string(),
        name: z.string(),
        password: z.string()
    })
});
export type SignupSchema = z.infer<typeof SignupSchema>["body"];

// Signin Schema & Type
export const SigninSchema = z.object({
    body: z.object({
        email: z.string(),
        password: z.string()
    })
});
export type SigninSchema = z.infer<typeof SigninSchema>["body"];
