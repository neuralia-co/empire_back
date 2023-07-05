import jwt from "jsonwebtoken";
import express from "express";
const router = express.Router();

import { SECRET } from "../utils/config";
import { User } from "../models";
import { TypedRequestBody } from "../utils/types";

router.post("/", async (req: TypedRequestBody<{ username: string, password: string }>, response) => {
    const body = req.body;

    const user = await User.findOne({
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

    const token = jwt.sign(userForToken, SECRET);

    response
        .status(200)
        .send({ token, username: user.username, name: user.name });

    return null;
});

export default router;