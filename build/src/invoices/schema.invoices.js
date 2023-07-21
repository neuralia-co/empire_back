"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdInvoiceSchema = exports.CreateInvoiceSchema = void 0;
const zod_1 = require("zod");
// Create Invoice Schema & Type
exports.CreateInvoiceSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        pretaxValue: zod_1.z.string(),
        VAT: zod_1.z.string(),
        content: zod_1.z.string().optional(),
        url: zod_1.z.string(),
        idFrom: zod_1.z.number(),
        idTo: zod_1.z.number(),
        debit: zod_1.z.boolean(),
        date: zod_1.z.string()
    })
});
// Delete Invoice Schema
exports.IdInvoiceSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string()
    })
});
