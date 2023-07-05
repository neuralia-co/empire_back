"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.PORT = exports.DATABASE_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const SCALINGO_POSTGRESQL_URL = process.env.NODE_ENV === "test"
//     ? process.env.TEST_MONGODB_URI
//     : process.env.SCALINGO_POSTGRESQL_URL;
exports.DATABASE_URL = process.env.SCALINGO_POSTGRESQL_URL || "";
exports.PORT = process.env.PORT || 3001;
exports.SECRET = "secret";
