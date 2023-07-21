"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.PORT = exports.SSL_ON = exports.DATABASE_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
exports.DATABASE_URI = process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
    ? process.env.LOCAL_URI || ""
    : process.env.SCALINGO_POSTGRESQL_URI || "";
exports.SSL_ON = process.env.DB_ENABLE_SSL === "true";
exports.PORT = process.env.PORT || 3001;
exports.SECRET = process.env.SECRET || "";
