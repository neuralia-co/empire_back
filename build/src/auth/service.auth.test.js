"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const AuthService = __importStar(require("./service.auth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("lib/__mocks__/prisma"));
const vitest_1 = require("vitest");
vitest_1.vi.mock("lib/prisma");
vitest_1.vi.mock("jsonwebtoken", () => ({
    default: {
        sign: vitest_1.vi.fn(),
        verify: vitest_1.vi.fn(() => ({ id: 1 }))
    }
}));
vitest_1.vi.mock("bcrypt", () => ({
    default: {
        hashSync: () => "hashedpass"
    }
}));
(0, vitest_1.describe)("auth.service", () => {
    const env = process.env;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.restoreAllMocks();
        process.env = Object.assign({}, env);
    });
    (0, vitest_1.describe)("createUser", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, vitest_1.it)("should create and return the user", () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.user.create.mockResolvedValueOnce({
                id: 1,
                name: "testname",
                email: "testemail"
            });
            const newUser = yield AuthService.createUser({
                name: "testname",
                email: "testemail",
                password: "testpass"
            });
            (0, vitest_1.expect)(newUser).toHaveProperty("id");
            (0, vitest_1.expect)(newUser).toHaveProperty("name");
            (0, vitest_1.expect)(newUser).toHaveProperty("email");
            (0, vitest_1.expect)(newUser).toStrictEqual({
                id: 1,
                name: "testname",
                email: "testemail"
            });
        }));
        (0, vitest_1.it)("should encrypt the password", () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.user.create.mockResolvedValueOnce({
                id: 1,
                name: "testname",
                email: "testemail"
            });
            yield AuthService.createUser({
                name: "testname",
                email: "testemail",
                password: "testpass"
            });
            (0, vitest_1.expect)(prisma_1.default.user.create).toHaveBeenCalledWith({
                data: { name: "testname", email: "testemail", password: "hashedpass" },
                select: { id: true, name: true, email: true }
            });
        }));
    }));
    (0, vitest_1.describe)("generateJWT", () => {
        (0, vitest_1.it)("should generate a JWT", () => {
            process.env.API_SECRET = "secret";
            AuthService.generateJWT(1);
            (0, vitest_1.expect)(jsonwebtoken_1.default.sign).toHaveBeenCalled();
            (0, vitest_1.expect)(jsonwebtoken_1.default.sign).toHaveBeenCalledWith({ id: 1 }, "secret", {
                expiresIn: 5 * 60 * 60
            });
        });
        (0, vitest_1.it)("should throw an error if there is no API_SECRET env var", () => {
            (0, vitest_1.expect)(() => AuthService.generateJWT(1)).toThrow();
        });
    });
    (0, vitest_1.describe)("validateJWT", () => {
        (0, vitest_1.it)("should return the token payload", () => {
            process.env.API_SECRET = "secret";
            const payload = AuthService.validateJWT("token");
            (0, vitest_1.expect)(payload).toBe(1);
            (0, vitest_1.expect)(jsonwebtoken_1.default.verify).toHaveBeenCalled();
            (0, vitest_1.expect)(jsonwebtoken_1.default.verify).toHaveBeenCalledWith("token", "secret");
        });
        (0, vitest_1.it)("should throw an error if there is no API_SECRET env var", () => {
            (0, vitest_1.expect)(() => AuthService.validateJWT("")).toThrow();
        });
    });
});
