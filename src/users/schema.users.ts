import { z } from "zod";


export const OneUserSchema = z.object({
    params: z.object({
        id: z.string()
    })
});
export type OneUserSchema = z.infer<typeof OneUserSchema>["params"];
