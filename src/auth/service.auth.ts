import type { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

export const findUserByEmail = async (email: string) => {
    return prisma.user.findFirst({ where: { email } });
};

export const createUser = async (
    user: Omit<Prisma.UserCreateInput, "invoices">
) => {
    user.password = bcrypt.hashSync(user.password, 8);

    return prisma.user.create({
        data: user,
        select: {
            id: true,
            name: true,
            email: true
        }
    });
};

export const generateJWT = (id: number) => {
    if (!process.env.API_SECRET) {
        throw new Error("API Secret not defined. Unable to generate JWT.");
    }

    const expiry = 60*60; // in seconds

    return {
        val: jwt.sign({ id }, process.env.API_SECRET, { expiresIn: expiry }),
        exp: Date.now() + (expiry-10)*1000
    };
};

export const validateJWT = (token: string) => {
    if (!process.env.API_SECRET) {
        throw new Error("API Secret not defined. Unable to validate JWT.");
    }
    const payload = jwt.verify(token, process.env.API_SECRET) as { id: number };
    return payload.id;
};

export const comparePasswords = (input: string, encrypted: string) => {
    return bcrypt.compareSync(input, encrypted);
};
