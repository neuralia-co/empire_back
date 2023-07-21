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
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController = __importStar(require("./controller.auth"));
const AuthService = __importStar(require("./service.auth"));
const utility_classes_1 = require("../lib/utility-classes");
const vitest_1 = require("vitest");
vitest_1.vi.mock("auth/service.auth", () => ({
    findUserByEmail: vitest_1.vi.fn(),
    comparePasswords: vitest_1.vi.fn(),
    generateJWT: vitest_1.vi.fn(),
    createUser: vitest_1.vi.fn()
}));
vitest_1.vi.mock("lib/utility-classes", () => ({
    AppError: class {
        constructor(type, message) {
            this.type = type;
            this.message = message;
        }
    }
}));
(0, vitest_1.describe)("controller.auth", () => {
    let request;
    let response;
    const next = vitest_1.vi.fn();
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.resetAllMocks();
        response = {
            status: vitest_1.vi.fn().mockReturnThis(),
            json: vitest_1.vi.fn()
        };
        request = {
            body: {
                email: "matthieu@gmail.com",
                password: "motdepasse",
                name: "Matthieu Porte"
            }
        };
    });
    (0, vitest_1.describe)("signup", () => {
        (0, vitest_1.it)("should throw a validation error if a user already exists with username", () => __awaiter(void 0, void 0, void 0, function* () {
            vitest_1.vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce({
                id: 1,
                email: "matthieu@gmail.com",
                password: "motdepasse",
                name: "Matthieu Porte"
            });
            yield AuthController.signup(request, response, next);
            (0, vitest_1.expect)(AuthService.findUserByEmail).toHaveBeenCalledWith("matthieu@gmail.com");
            (0, vitest_1.expect)(next).toHaveBeenCalled();
            (0, vitest_1.expect)(next.mock.calls[0][0]).toBeInstanceOf(utility_classes_1.AppError);
            (0, vitest_1.expect)(next.mock.calls[0][0].message).toBeTypeOf("string");
            (0, vitest_1.expect)(next.mock.calls[0][0].type).toBe("validation");
        }));
        (0, vitest_1.it)("should create a new user if username not taken", () => __awaiter(void 0, void 0, void 0, function* () {
            vitest_1.vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce(null);
            vitest_1.vi.mocked(AuthService.createUser).mockResolvedValueOnce({
                id: 1,
                email: "matthieu@gmail.com",
                name: "Matthieu Porte"
            });
            vitest_1.vi.mocked(AuthService.generateJWT).mockReturnValueOnce({ val: "testtoken", exp: 99999999999999 });
            yield AuthController.signup(request, response, next);
            (0, vitest_1.expect)(AuthService.createUser).toHaveBeenCalledWith(request.body);
        }));
        (0, vitest_1.it)("should create a session token for the new user", () => __awaiter(void 0, void 0, void 0, function* () {
            vitest_1.vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce(null);
            vitest_1.vi.mocked(AuthService.createUser).mockResolvedValueOnce({
                id: 1,
                email: "matthieu@gmail.com",
                name: "Matthieu Porte"
            });
            vitest_1.vi.mocked(AuthService.generateJWT).mockReturnValueOnce({ val: "testtoken", exp: 99999999999999 });
            yield AuthController.signup(request, response, next);
            (0, vitest_1.expect)(AuthService.generateJWT).toHaveBeenCalledWith(1);
        }));
        (0, vitest_1.it)("should respond to the request with a message, the user, and the token", () => __awaiter(void 0, void 0, void 0, function* () {
            vitest_1.vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce(null);
            vitest_1.vi.mocked(AuthService.createUser).mockResolvedValueOnce({
                id: 1,
                email: "matthieu@gmail.com",
                name: "Matthieu Porte"
            });
            vitest_1.vi.mocked(AuthService.generateJWT).mockReturnValueOnce({ val: "testtoken", exp: 99999999999999 });
            yield AuthController.signup(request, response, next);
            (0, vitest_1.expect)(response.status).toHaveBeenCalledWith(200);
            (0, vitest_1.expect)(response.json).toHaveBeenCalledWith({
                message: "Registered successfully",
                user: {
                    id: 1,
                    email: "matthieu@gmail.com",
                    name: "Matthieu Porte"
                },
                token: "testtoken"
            });
        }));
    });
    (0, vitest_1.describe)("signin", () => {
        (0, vitest_1.it)("should throw a validation error if no user exists with username", () => __awaiter(void 0, void 0, void 0, function* () {
            vitest_1.vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce(null);
            yield AuthController.signin(request, response, next);
            (0, vitest_1.expect)(next).toHaveBeenCalled();
            (0, vitest_1.expect)(next.mock.calls[0][0]).toBeInstanceOf(utility_classes_1.AppError);
            (0, vitest_1.expect)(next.mock.calls[0][0].type).toBe("validation");
            (0, vitest_1.expect)(next.mock.calls[0][0].message).toBeTypeOf("string");
        }));
        (0, vitest_1.it)("should throw a validation error if the password is incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
            vitest_1.vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce({
                id: 1,
                email: "matthieu@gmail.com",
                name: "Matthieu Porte",
                password: "hashedpass"
            });
            vitest_1.vi.mocked(AuthService.comparePasswords).mockReturnValueOnce(false);
            yield AuthController.signin(request, response, next);
            (0, vitest_1.expect)(AuthService.comparePasswords).toHaveBeenCalledWith("motdepasse", "hashedpass");
            (0, vitest_1.expect)(next).toHaveBeenCalled();
            (0, vitest_1.expect)(next.mock.calls[0][0]).toBeInstanceOf(utility_classes_1.AppError);
            (0, vitest_1.expect)(next.mock.calls[0][0].type).toBe("validation");
            (0, vitest_1.expect)(next.mock.calls[0][0].message).toBeTypeOf("string");
        }));
        (0, vitest_1.it)("should create a session token for the successfully logged-in user", () => __awaiter(void 0, void 0, void 0, function* () {
            vitest_1.vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce({
                id: 1,
                email: "matthieu@gmail.com",
                name: "Matthieu Porte",
                password: "hashedpass"
            });
            vitest_1.vi.mocked(AuthService.comparePasswords).mockReturnValueOnce(true);
            vitest_1.vi.mocked(AuthService.generateJWT).mockReturnValue({ val: "testtoken", exp: 99999999999999 });
            yield AuthController.signin(request, response, next);
            (0, vitest_1.expect)(AuthService.generateJWT).toHaveBeenCalledWith(1);
        }));
        (0, vitest_1.it)("should respond to the request with a message, the username, and the token", () => __awaiter(void 0, void 0, void 0, function* () {
            vitest_1.vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce({
                id: 1,
                email: "matthieu@gmail.com",
                name: "Matthieu Porte",
                password: "hashedpass"
            });
            vitest_1.vi.mocked(AuthService.comparePasswords).mockReturnValueOnce(true);
            vitest_1.vi.mocked(AuthService.generateJWT).mockReturnValue({ val: "testtoken", exp: 99999999999999 });
            yield AuthController.signin(request, response, next);
            (0, vitest_1.expect)(response.status).toHaveBeenCalledWith(200);
            (0, vitest_1.expect)(response.json).toHaveBeenCalledWith({
                message: "Login successful!",
                user: {
                    name: "Matthieu Porte",
                    email: "matthieu@gmail.com",
                    id: 1
                },
                token: "testtoken"
            });
        }));
    });
});
