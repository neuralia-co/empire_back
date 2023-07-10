import * as usersController from "./controller.users";
import { Router } from "express";

const router = Router();

router.get("/", usersController.getAllUsers);

export default router;
