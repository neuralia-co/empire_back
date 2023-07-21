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
exports.getMyUser = exports.getOneUser = exports.getAllUsers = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const utility_classes_1 = require("../lib/utility-classes");
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_1.default.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            password: false,
        },
    });
    res.json(users);
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield prisma_1.default.user.findFirst({
        where: { id: parseInt(id) },
        select: {
            email: false,
            name: true,
            password: false,
        }
    });
    if (!user) {
        return next(new utility_classes_1.AppError("validation", "User not found."));
    }
    res.json(user);
});
exports.getOneUser = getOneUser;
const getMyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: { id: req.decodedToken.id },
        select: {
            email: true,
            name: true,
            password: false,
        }
    });
    if (!user) {
        return next(new utility_classes_1.AppError("validation", "The token used isn't linked to any user"));
    }
    res.json(user);
});
exports.getMyUser = getMyUser;
