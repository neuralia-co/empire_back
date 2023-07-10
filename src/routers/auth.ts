import * as AuthController from "../controllers/auth";
import { SigninSchema, SignupSchema } from "../schemas/auth";
import { Router } from "express";
import { validate } from "../lib/middlewares";

const router = Router();

router.post("/signup", validate(SignupSchema), AuthController.signup);
router.post("/signin", validate(SigninSchema), AuthController.signin);

export default router;
