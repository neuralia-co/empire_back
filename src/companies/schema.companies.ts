import { z } from "zod";


export const OneCompanySchema = z.object({
    params: z.object({
        id: z.string()
    })
});
export type OneCompanySchema = z.infer<typeof OneCompanySchema>["params"];


export const CreateSchema = z.object({
    body: z.object({
        name: z.string(),
        color: z.string(),
        siren: z.string()
    })
});
export type CreateSchema = z.infer<typeof CreateSchema>["body"];
