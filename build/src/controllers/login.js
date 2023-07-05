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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const config_1 = require("../utils/config");
const models_1 = require("../models");
router.post("/", (req, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = yield models_1.User.findOne({
        where: {
            username: body.username
        }
    });
    const passwordCorrect = body.password === "motdepasse";
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: "invalid username or password"
        });
    }
    const userForToken = {
        username: user.username,
        id: user.id,
    };
    const token = jsonwebtoken_1.default.sign(userForToken, config_1.SECRET);
    response
        .status(200)
        .send({ token, username: user.username, name: user.name });
    return null;
}));
exports.default = router;
