import * as companiesController from "./controller.companies";
import { Router } from "express";

const router = Router();

router.get("/", companiesController.getAllCompanies);
router.get("/:id", companiesController.getOneCompany);
router.get("/mine", companiesController.getMyCompanies);

export default router;
