"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.validateJWT = exports.generateJWT = exports.createUser = exports.findUserByEmail = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.user.findFirst({ where: { email } });
});
exports.findUserByEmail = findUserByEmail;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user.password = bcrypt_1.default.hashSync(user.password, 8);
    return prisma_1.default.user.create({
        data: user,
        select: {
            id: true,
            name: true,
            email: true
        }
    });
});
exports.createUser = createUser;
const generateJWT = (id) => {
    if (!process.env.API_SECRET) {
        throw new Error("API Secret not defined. Unable to generate JWT.");
    }
    const expiry = 60 * 60; // in seconds
    return {
        val: jsonwebtoken_1.default.sign({ id }, process.env.API_SECRET, { expiresIn: expiry }),
        exp: Date.now() + (expiry - 10) * 1000
    };
};
exports.generateJWT = generateJWT;
const validateJWT = (token) => {
    if (!process.env.API_SECRET) {
        throw new Error("API Secret not defined. Unable to validate JWT.");
    }
    const payload = jsonwebtoken_1.default.verify(token, process.env.API_SECRET);
    return payload.id;
};
exports.validateJWT = validateJWT;
const comparePasswords = (input, encrypted) => {
    return bcrypt_1.default.compareSync(input, encrypted);
};
exports.comparePasswords = comparePasswords;
