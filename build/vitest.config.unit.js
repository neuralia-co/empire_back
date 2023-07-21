"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        include: ["src/**/*.test.ts"]
    },
    resolve: {
        alias: {
            auth: "/src/auth",
            invoices: "/src/invoices",
            users: "/src/users",
            lib: "/src/lib"
        }
    }
});
