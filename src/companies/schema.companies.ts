import { z } from "zod";


export const OneCompanySchema = z.object({
    params: z.object({
        id: z.string()
    })
});
export type OneCompanySchema = z.infer<typeof OneCompanySchema>["params"];
