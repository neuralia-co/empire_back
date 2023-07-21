"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSchema = exports.OneCompanySchema = void 0;
const zod_1 = require("zod");
exports.OneCompanySchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string()
    })
});
exports.CreateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        color: zod_1.z.string(),
        siren: zod_1.z.string()
    })
});
