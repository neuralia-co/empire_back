import { z } from "zod";


// Create Invoice Schema & Type
export const CreateInvoiceSchema = z.object({
    body: z.object({
        title: z.string(),
        pretaxValue: z.string(),
        VAT: z.string(),
        content: z.string().optional(),
        url: z.string(),
        idFrom: z.number(),
        idTo: z.number(),
        debit: z.boolean(),
        date: z.string()
    })
});
export type CreateInvoiceSchema = z.infer<typeof CreateInvoiceSchema>["body"];

// Delete Invoice Schema
export const IdInvoiceSchema = z.object({
    params: z.object({
        id: z.string()
    })
});
export type IdInvoiceSchema = z.infer<typeof IdInvoiceSchema>["params"];
