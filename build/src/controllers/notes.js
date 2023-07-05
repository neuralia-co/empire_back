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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const models_1 = require("../models");
const middlewares_1 = require("../utils/middlewares");
router.post("/", middlewares_1.tokenExtractor, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findByPk(Number(req.decodedToken.id));
        if (user === null) {
            throw Error("didn't find the user");
        }
        const imp = req.body.important === null || req.body.important === undefined ? false : req.body.important;
        // maybe add , userId: user.id here
        const note = yield models_1.Note.create(Object.assign(Object.assign({ important: imp }, req.body), { date: new Date() }));
        res.json(note);
    }
    catch (error) {
        res.status(400).json({ error });
    }
}));
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield models_1.Note.findAll({
        attributes: { exclude: ["userId"] },
        include: {
            model: models_1.User,
            attributes: ["name"]
        }
    });
    res.json(notes);
}));
router.get("/:id", middlewares_1.noteFinder, (req, res) => {
    if (req.note) {
        res.json(req.note);
    }
    else {
        res.status(404).end();
    }
});
router.delete("/:id", middlewares_1.noteFinder, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.note) {
        yield req.note.destroy();
    }
    res.status(204).end();
}));
router.put("/:id", middlewares_1.noteFinder, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.note) {
        req.note.important = req.body.important;
        yield req.note.save();
        res.json(req.note);
    }
    else {
        res.status(404).end();
    }
}));
exports.default = router;
