"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_classes_1 = require("./utility-classes");
const vitest_1 = require("vitest");
(0, vitest_1.describe)("utility-classes", () => {
    (0, vitest_1.describe)("AppError", () => {
        (0, vitest_1.it)("should set the status code based on the type of error", () => {
            const error1 = new utility_classes_1.AppError("validation", "validation-error");
            const error2 = new utility_classes_1.AppError("unauthorized", "auth-error");
            const error3 = new utility_classes_1.AppError("server", "server-error");
            (0, vitest_1.expect)(error1.statusCode).toBe(400);
            (0, vitest_1.expect)(error2.statusCode).toBe(401);
            (0, vitest_1.expect)(error3.statusCode).toBe(500);
        });
        (0, vitest_1.it)("should set the error message", () => {
            const error = new utility_classes_1.AppError("validation", "validation-error");
            (0, vitest_1.expect)(error.message).toBe("validation-error");
        });
    });
});
