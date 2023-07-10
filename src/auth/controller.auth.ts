import type { SigninSchema, SignupSchema } from "./schema.auth";
import * as AuthService from "./service.auth";
import type { Request, RequestHandler } from "express";
import { AppError } from "../lib/utility-classes";

export const signup: RequestHandler = async (
    req: Request<unknown, unknown, SignupSchema>,
    res,
    next
) => {
    const userData = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    };

    if (await AuthService.findUserByEmail(userData.email)) {
        return next(
            new AppError("validation", "A user already exists with that email")
        );
    }

    const newUser = await AuthService.createUser(userData);
    const token = AuthService.generateJWT(newUser.id);

    res.status(200).json({
        message: "Registered successfully",
        user: newUser,
        token
    });
};

export const signin: RequestHandler = async (
    req: Request<unknown, unknown, SigninSchema>,
    res,
    next
) => {
    const { email, password } = req.body;

    const existing = await AuthService.findUserByEmail(email);

    if (!existing) {
        return next(new AppError("validation", "Account not found."));
    }

    if (!AuthService.comparePasswords(password, existing.password)) {
        return next(new AppError("validation", "Invalid login."));
    }

    const token = AuthService.generateJWT(existing.id);

    res.status(200).json({
        message: "Login successful!",
        user: {
            id: existing.id,
            name: existing.name,
            email: existing.email
        },
        token
    });
};
