import * as companiesController from "./controller.companies";
import { Router } from "express";
import { validate } from "../lib/middlewares";
import { CreateSchema, OneCompanySchema } from "../companies/schema.companies";

const router = Router();

router.get("/", companiesController.getAllCompanies);
router.get("/:id", validate(OneCompanySchema), companiesController.getOneCompany);
router.post("/create", validate(CreateSchema), companiesController.create);
router.get("/mine", companiesController.getMyCompanies);

export default router;
