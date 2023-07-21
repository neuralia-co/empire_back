"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(type, message) {
        super(message);
        this.statusCode = 400;
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.statusCode = AppError.typeToCode[type];
        Error.captureStackTrace(this);
    }
}
exports.AppError = AppError;
AppError.typeToCode = {
    validation: 400,
    unauthorized: 401,
    server: 500
};
