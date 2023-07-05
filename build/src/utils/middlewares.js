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
exports.noteFinder = exports.tokenExtractor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const models_1 = require("../models");
const tokenExtractor = (req, res, next) => {
    const authorization = req.headers["authorization"];
    console.log("auth: " + authorization);
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        try {
            console.log(req);
            req.decodedToken = jsonwebtoken_1.default.verify(authorization.substring(7), config_1.SECRET);
            console.log(req.decodedToken);
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ error: "token invalid" });
        }
    }
    else {
        res.status(401).json({ error: "token missing" });
    }
};
exports.tokenExtractor = tokenExtractor;
const noteFinder = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.note);
    console.log(req.params);
    console.log(req.headers);
    req.note = yield models_1.Note.findByPk(req.params.id);
    console.log(req.note);
    next();
});
exports.noteFinder = noteFinder;
