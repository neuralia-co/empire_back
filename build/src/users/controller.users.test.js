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
const UsersController = __importStar(require("./controller.users"));
const utility_classes_1 = require("lib/utility-classes");
const vitest_1 = require("vitest");
const prisma_1 = __importDefault(require("../lib/__mocks__/prisma"));
vitest_1.vi.mock("lib/prisma");
vitest_1.vi.mock("lib/utility-classes", () => ({
    AppError: class {
        constructor(type, message) {
            this.type = type;
            this.message = message;
        }
    }
}));
(0, vitest_1.describe)("users.controller", () => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    let request;
    let response;
    const next = vitest_1.vi.fn();
    const users = [{
            id: 1,
            name: "testname",
            email: "testemail",
            password: "passwordHash"
        }, {
            id: 2,
            name: "testname2",
            email: "testemail2",
            password: "passwordHash"
        }, {
            id: 42,
            name: "testname42",
            email: "testemail42",
            password: "passwordHash"
        }];
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.restoreAllMocks();
        response = {
            status: vitest_1.vi.fn().mockReturnThis(),
            json: vitest_1.vi.fn()
        };
        request = {};
        request.decodedToken = { id: 1 };
    });
    (0, vitest_1.describe)("getAllUsers", () => {
        (0, vitest_1.it)("should return all users", () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.user.findMany.mockResolvedValueOnce(users);
            yield UsersController.getAllUsers(request, response, next);
            (0, vitest_1.expect)(response.json).toHaveBeenCalledWith(users);
        }));
    });
    (0, vitest_1.describe)("getOneUser", () => {
        (0, vitest_1.it)("should return one user", () => __awaiter(void 0, void 0, void 0, function* () {
            request = {
                params: {
                    id: 2,
                }
            };
            prisma_1.default.user.findFirst.mockResolvedValueOnce(users[1]);
            yield UsersController.getOneUser(request, response, next);
            (0, vitest_1.expect)(response.json).toHaveBeenCalledWith(users[1]);
        }));
        (0, vitest_1.it)("should return an appError if the id is undefined", () => __awaiter(void 0, void 0, void 0, function* () {
            request = {
                params: {
                    id: 3,
                }
            };
            prisma_1.default.user.findFirst.mockResolvedValueOnce(null);
            yield UsersController.getOneUser(request, response, next);
            (0, vitest_1.expect)(next).toHaveBeenCalled();
            (0, vitest_1.expect)(next.mock.calls[0][0]).toBeInstanceOf(utility_classes_1.AppError);
            (0, vitest_1.expect)(next.mock.calls[0][0].type).toBe("validation");
            (0, vitest_1.expect)(next.mock.calls[0][0].message).toBeTypeOf("string");
        }));
    });
    (0, vitest_1.describe)("getMyUser", () => {
        (0, vitest_1.it)("should return the user linked to the token id", () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.user.findFirst.mockResolvedValueOnce(users[0]);
            yield UsersController.getMyUser(request, response, next);
            (0, vitest_1.expect)(response.json).toHaveBeenCalledWith(users[0]);
        }));
    });
});
