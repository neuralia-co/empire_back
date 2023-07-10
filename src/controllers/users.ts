import express, { RequestHandler } from "express";
const router = express.Router();
import prisma from "../lib/prisma";


export const getAllUsers: RequestHandler = async (_req,res) => {
    const users = await prisma.user.findMany({
        select: {
            email: true,
            name: true,
            password: false,
        },
    });
    res.json(users);
};

export default router;
