"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninSchema = exports.SignupSchema = void 0;
const zod_1 = require("zod");
// Signup Schema & Type
exports.SignupSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        name: zod_1.z.string(),
        password: zod_1.z.string()
    })
});
// Signin Schema & Type
exports.SigninSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string()
    })
});
