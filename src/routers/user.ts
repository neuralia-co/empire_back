import * as usersController from "../controllers/users";
import { Router } from "express";

const router = Router();

router.get("/", usersController.getAllUsers);

export default router;
