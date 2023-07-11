import { NextFunction, RequestHandler, Request, Response } from "express";
import prisma from "../lib/prisma";
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
    const user = await prisma.user.findFirst({
        where: { id: parseInt(id) },
        select: {
            email: false,
            name: true,
            password: false,
        }
    });

    if (!user) {
        return next(new AppError("validation", "User not found."));
    }

    res.json(user);
};

export const getMyUser: RequestHandler = async (
    req: Request<unknown, unknown>,
    res: Response,
    next: NextFunction
) => {
    const user = await prisma.user.findFirst({
        where: { id: req.decodedToken.id },
        select: {
            email: true,
            name: true,
            password: false,
        }
    });

    if (!user) {
        return next(new AppError("validation", "The token used isn't linked to any user"));
    }

    res.json(user);
};

