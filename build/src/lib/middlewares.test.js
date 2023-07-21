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
const middlewares_1 = require("./middlewares");
const utility_classes_1 = require("./utility-classes");
const AuthService = __importStar(require("auth/service.auth"));
const vitest_1 = require("vitest");
const zod_1 = require("zod");
vitest_1.vi.mock("lib/utility-classes", () => ({
    AppError: class {
        constructor(type, message) {
            this.type = type;
            this.message = message;
        }
    }
}));
vitest_1.vi.mock("auth/service.auth", () => ({
    validateJWT: vitest_1.vi.fn()
}));
(0, vitest_1.describe)("middlewares", () => {
    (0, vitest_1.describe)("authorization", () => {
        let request;
        let response;
        const next = vitest_1.vi.fn();
        (0, vitest_1.beforeEach)(() => {
            vitest_1.vi.restoreAllMocks();
            response = {
                status: vitest_1.vi.fn().mockReturnThis(),
                json: vitest_1.vi.fn(),
                send: vitest_1.vi.fn()
            };
            request = {};
        });
        (0, vitest_1.it)("should immediately respond to the request if the method is OPTIONS", () => __awaiter(void 0, void 0, void 0, function* () {
            request.method = "OPTIONS";
            yield (0, middlewares_1.authorization)(request, response, next);
            (0, vitest_1.expect)(response.send).toHaveBeenCalledWith({
                message: "Preflight check successful."
            });
        }));
        (0, vitest_1.it)("should throw an error if Bearer indicator not passed", () => __awaiter(void 0, void 0, void 0, function* () {
            request["headers"] = {
                authorization: "Beaer token"
            };
            yield (0, middlewares_1.authorization)(request, response, next);
            (0, vitest_1.expect)(next).toHaveBeenCalled();
            (0, vitest_1.expect)(next.mock.calls[0][0]).toBeInstanceOf(utility_classes_1.AppError);
            (0, vitest_1.expect)(next.mock.calls[0][0].message).toBe("Invalid access token.");
            (0, vitest_1.expect)(next.mock.calls[0][0].type).toBe("unauthorized");
        }));
        (0, vitest_1.it)("should throw an error if missing token", () => __awaiter(void 0, void 0, void 0, function* () {
            request["headers"] = {
                authorization: "Bearer"
            };
            yield (0, middlewares_1.authorization)(request, response, next);
            (0, vitest_1.expect)(next).toHaveBeenCalled();
            (0, vitest_1.expect)(next.mock.calls[0][0]).toBeInstanceOf(utility_classes_1.AppError);
            (0, vitest_1.expect)(next.mock.calls[0][0].message).toBe("Invalid access token.");
            (0, vitest_1.expect)(next.mock.calls[0][0].type).toBe("unauthorized");
        }));
        (0, vitest_1.it)("should throw an error if blank token", () => __awaiter(void 0, void 0, void 0, function* () {
            request["headers"] = {
                authorization: "Bearer "
            };
            yield (0, middlewares_1.authorization)(request, response, next);
            (0, vitest_1.expect)(next).toHaveBeenCalled();
            (0, vitest_1.expect)(next.mock.calls[0][0]).toBeInstanceOf(utility_classes_1.AppError);
            (0, vitest_1.expect)(next.mock.calls[0][0].message).toBe("Invalid access token.");
            (0, vitest_1.expect)(next.mock.calls[0][0].type).toBe("unauthorized");
        }));
        (0, vitest_1.it)("should set session token if success", () => __awaiter(void 0, void 0, void 0, function* () {
            request["headers"] = {
                authorization: "Bearer token"
            };
            vitest_1.vi.mocked(AuthService.validateJWT).mockReturnValue(999);
            yield (0, middlewares_1.authorization)(request, response, next);
            (0, vitest_1.expect)(AuthService.validateJWT).toHaveBeenCalledWith("token");
            (0, vitest_1.expect)(request.decodedToken.id).toBe(999);
            (0, vitest_1.expect)(next).toHaveBeenCalledWith();
        }));
        (0, vitest_1.it)("should throw an error if there is a problem validating the token", () => __awaiter(void 0, void 0, void 0, function* () {
            request["headers"] = {
                authorization: "Bearer token"
            };
            vitest_1.vi.mocked(AuthService.validateJWT).mockImplementation(() => {
                throw new Error("some error");
            });
            yield (0, middlewares_1.authorization)(request, response, next);
            (0, vitest_1.expect)(next).toHaveBeenCalled();
            (0, vitest_1.expect)(next.mock.calls[0][0]).toBeInstanceOf(utility_classes_1.AppError);
            (0, vitest_1.expect)(next.mock.calls[0][0].message).toBe("Invalid access token.");
            (0, vitest_1.expect)(next.mock.calls[0][0].type).toBe("validation");
        }));
    });
    (0, vitest_1.describe)("errorHandler", () => {
        let request;
        let response;
        (0, vitest_1.beforeEach)(() => {
            vitest_1.vi.restoreAllMocks();
            response = {
                status: vitest_1.vi.fn().mockReturnThis(),
                json: vitest_1.vi.fn()
            };
            request = {};
        });
        (0, vitest_1.it)("should return a 500 status code when given an error with no status code", () => {
            const error = new Error("test");
            (0, middlewares_1.errorHandler)(error, request, response);
            (0, vitest_1.expect)(response.status).toHaveBeenCalledWith(500);
        });
        (0, vitest_1.it)("should return a static error message when an unhandled error is thrown", () => {
            const error = new Error("test");
            (0, middlewares_1.errorHandler)(error, request, response);
            (0, vitest_1.expect)(response.json).toHaveBeenCalledWith({
                message: "Oops! Something wonky happened..."
            });
        });
        (0, vitest_1.it)("should return an error with the provided statusCode", () => {
            const error = new utility_classes_1.AppError("server", "server-error");
            (0, middlewares_1.errorHandler)(error, request, response);
            (0, vitest_1.expect)(response.status).toHaveBeenCalledWith(500);
        });
    });
    (0, vitest_1.describe)("validate", () => {
        let request;
        let response;
        const next = vitest_1.vi.fn();
        (0, vitest_1.beforeEach)(() => {
            vitest_1.vi.restoreAllMocks();
            response = {
                status: vitest_1.vi.fn().mockReturnThis(),
                json: vitest_1.vi.fn()
            };
            request = {};
        });
        (0, vitest_1.it)("should throw an error when given an invalid request", () => __awaiter(void 0, void 0, void 0, function* () {
            request.body = {};
            const schema = zod_1.z.object({
                body: zod_1.z.object({
                    username: zod_1.z.string(),
                    password: zod_1.z.string()
                })
            });
            yield (0, middlewares_1.validate)(schema)(request, response, next);
            (0, vitest_1.expect)(next).toHaveBeenCalled();
            (0, vitest_1.expect)(next.mock.calls[0][0]).toBeInstanceOf(utility_classes_1.AppError);
            (0, vitest_1.expect)(next.mock.calls[0][0].message).toBe("Invalid or missing inputs provided for: username, password");
            (0, vitest_1.expect)(next.mock.calls[0][0].type).toBe("validation");
        }));
        (0, vitest_1.it)("should succeed with a valid request", () => __awaiter(void 0, void 0, void 0, function* () {
            request.body = { username: "testusername" };
            const schema = zod_1.z.object({
                body: zod_1.z.object({
                    username: zod_1.z.string()
                })
            });
            yield (0, middlewares_1.validate)(schema)(request, response, next);
            (0, vitest_1.expect)(next).toHaveBeenCalledWith();
        }));
    });
});
