import * as AuthController from "./controller.auth";
import { SigninSchema, SignupSchema } from "./schema.auth";
import { Router } from "express";
import { validate } from "../lib/middlewares";

const router = Router();

router.post("/signup", validate(SignupSchema), AuthController.signup);
router.post("/signin", validate(SigninSchema), AuthController.signin);

export default router;
