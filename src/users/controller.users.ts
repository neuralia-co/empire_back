import express, { NextFunction, RequestHandler, Request, Response } from "express";
const router = express.Router();
import prisma from "../lib/prisma";
import * as UserService from "./service.users";
import { OneUserSchema } from "./schema.users";
import { AppError } from "../lib/utility-classes";


export const getAllUsers: RequestHandler = async (_req,res) => {
    const users = await prisma.user.findMany({
        select: {
            id:true,
            email: true,
            name: true,
            password: false,
        },
    });
    res.json(users);
};

export const getOneUser: RequestHandler<OneUserSchema> = async (
    req: Request<OneUserSchema>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const userId = parseInt(id);
    const user = await UserService.getUserById(userId);

    if (!user) {
        return next(new AppError("validation", "User not found."));
    }

    res.json(user);
};

export const getMyUser: RequestHandler = async (
    req: Request<unknown, unknown>,
    res: Response
) => {
    const user = await UserService.getFullUserById(req.decodedToken.id);
    res.json(user);
};

export default router;
