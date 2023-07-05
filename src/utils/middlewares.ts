import { IGetUserAuthInfoRequest } from "./types";
import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET } from "./config";
import { Note } from "../models";

declare module "express-serve-static-core" {
    interface Request {
        note: Note | null,
        decodedToken: JwtPayload,
        headers:{authorization: string}
    }
}

export const tokenExtractor = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const authorization = req.headers["authorization"];
    console.log("auth: " + authorization);
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        try {
            console.log(req);
            req.decodedToken = <JwtPayload>jwt.verify(authorization.substring(7), SECRET);
            console.log(req.decodedToken);
            next();
        } catch(error){
            console.error(error);
            res.status(401).json({ error: "token invalid" });
        }
    }  else {
        res.status(401).json({ error: "token missing" });
    }
};

export const noteFinder = async (req: IGetUserAuthInfoRequest, _res: Response, next: NextFunction) => {
    console.log(req.note);
    console.log(req.params);
    console.log(req.headers);
    req.note = await Note.findByPk(req.params.id);
    console.log(req.note);
    next();
};