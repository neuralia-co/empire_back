import * as usersController from "./controller.users";
import { Router } from "express";

const router = Router();

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getOneUser);
router.get("/me", usersController.getMyUser);

export default router;
