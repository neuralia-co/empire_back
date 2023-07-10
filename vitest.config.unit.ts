import { defineConfig } from "vitest/config";

export default defineConfig({
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
