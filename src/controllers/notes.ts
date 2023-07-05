import express, { Response } from "express";
const router = express.Router();
import { Note, User } from "../models";
import { tokenExtractor, noteFinder } from "../utils/middlewares";
import { AuthPostRequest, AuthPutRequest, IGetUserAuthInfoRequest } from "../utils/types";

router.post("/", tokenExtractor, async (req: AuthPostRequest, res: Response) => {
    try {
        const user = await User.findByPk(Number(req.decodedToken.id));
        if (user === null){
            throw Error("didn't find the user");
        }
        const imp: boolean = req.body.important === null || req.body.important === undefined ? false : req.body.important;
        // maybe add , userId: user.id here
        const note = await Note.create({ important: imp, ...req.body, date: new Date() });
        res.json(note);
    } catch(error) {
        res.status(400).json({ error });
    }
});


router.get("/", async (_req, res) => {
    const notes = await Note.findAll({
        attributes: { exclude: ["userId"] },
        include: {
            model: User,
            attributes: ["name"]
        }
    });
    res.json(notes);
});


router.get("/:id", noteFinder, (req: IGetUserAuthInfoRequest, res: Response) => {
    if (req.note) {
        res.json(req.note);
    } else {
        res.status(404).end();
    }
});

router.delete("/:id", noteFinder, async (req: IGetUserAuthInfoRequest, res) => {
    if (req.note) {
        await req.note.destroy();
    }
    res.status(204).end();
});

router.put("/:id", noteFinder, async (req: AuthPutRequest, res) => {
    if (req.note) {
        req.note.important = req.body.important;
        await req.note.save();
        res.json(req.note);
    } else {
        res.status(404).end();
    }
});

export default router;