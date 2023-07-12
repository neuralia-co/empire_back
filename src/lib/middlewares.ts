import { NextFunction, Response, Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { AppError } from "./utility-classes";
import { validateJWT } from "../auth/service.auth";
import type { AnyZodObject } from "zod";
import { ZodError } from "zod";

declare module "express-serve-static-core" {
    interface Request {
        decodedToken: JwtPayload,
        headers:{authorization: string}
    }
}

export const errorHandler = (
    error: Error,
    _: Request,
    response: Response
) => {
    response
        .status("statusCode" in error ? (error.statusCode as number) : 500)
        .json({
            message:
                error instanceof AppError
                    ? error.message
                    : "Oops! Something wonky happened..."
        });
};


export const authorization = (
    request: Request<unknown>,
    response: Response,
    next: NextFunction
) => {
    if (request.method === "OPTIONS")
        return response.send({ message: "Preflight check successful." });

    if (!request.headers.authorization) {
        return next(
            new AppError("unauthorized", "`Authorization` header is required.")
        );
    }

    if (!request.headers.authorization.startsWith("Bearer ")) {
        return next(new AppError("unauthorized", "Invalid access token."));
    }

    const token = request.headers.authorization.split(" ")[1].trim();

    //console.log(Date.now(),token);

    if (!token) {
        return next(new AppError("unauthorized", "Invalid access token."));
    }

    try {
        request.decodedToken = { id: validateJWT(token) };//<JwtPayload>jwt.verify(token, SECRET);
        next();
    } catch (e) {
        //console.log(e);
        return next(new AppError("validation", "Invalid access token."));
    }
};

export const validate =
    (schema: AnyZodObject) =>
        async (req: Request<unknown>, _res: Response, next: NextFunction) => {
            try {
                await schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params
                });
                return next();
            } catch (error) {
                if (error instanceof ZodError) {
                    const invalids = error.issues.map(issue => issue.path.pop());
                    next(
                        new AppError(
                            "validation",
                            `Invalid or missing input${
                                invalids.length > 1 ? "s" : ""
                            } provided for: ${invalids.join(", ")}`
                        )
                    );
                } else {
                    next(new AppError("validation", "Invalid input"));
                }
            }
        };

