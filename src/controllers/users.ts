import express from "express";
const router = express.Router();

import { User } from "../models";
import { TypedRequestBody } from "../utils/types";

router.get("/", async (_req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.post("/", async (req: TypedRequestBody<{ username: string, password: string, name: string }>, res)  => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch(error) {
        res.status(400).json({ error });
    }
});

router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).end();
    }
});

export default router;