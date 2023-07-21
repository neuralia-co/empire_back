"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.authorization = exports.errorHandler = void 0;
const utility_classes_1 = require("./utility-classes");
const service_auth_1 = require("../auth/service.auth");
const zod_1 = require("zod");
const errorHandler = (error, _, response) => {
    response
        .status("statusCode" in error ? error.statusCode : 500)
        .json({
        message: error instanceof utility_classes_1.AppError
            ? error.message
            : "Oops! Something wonky happened..."
    });
};
exports.errorHandler = errorHandler;
const authorization = (request, response, next) => {
    if (request.method === "OPTIONS")
        return response.send({ message: "Preflight check successful." });
    if (!request.headers.authorization) {
        return next(new utility_classes_1.AppError("unauthorized", "`Authorization` header is required."));
    }
    if (!request.headers.authorization.startsWith("Bearer ")) {
        return next(new utility_classes_1.AppError("unauthorized", "Invalid access token."));
    }
    const token = request.headers.authorization.split(" ")[1].trim();
    //console.log(Date.now(),token);
    if (!token) {
        return next(new utility_classes_1.AppError("unauthorized", "Invalid access token."));
    }
    try {
        request.decodedToken = { id: (0, service_auth_1.validateJWT)(token) }; //<JwtPayload>jwt.verify(token, SECRET);
        next();
    }
    catch (e) {
        //console.log(e);
        return next(new utility_classes_1.AppError("validation", "Invalid access token."));
    }
};
exports.authorization = authorization;
const validate = (schema) => (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        });
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const invalids = error.issues.map(issue => issue.path.pop());
            next(new utility_classes_1.AppError("validation", `Invalid or missing input${invalids.length > 1 ? "s" : ""} provided for: ${invalids.join(", ")}`));
        }
        else {
            next(new utility_classes_1.AppError("validation", "Invalid input"));
        }
    }
});
exports.validate = validate;
