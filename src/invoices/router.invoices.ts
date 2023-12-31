import * as InvoicesController from "./controller.invoices";
import { CreateInvoiceSchema } from "./schema.invoices";
import { Router } from "express";
import { validate } from "../lib/middlewares";

const router = Router();

router.post("/", validate(CreateInvoiceSchema), InvoicesController.createInvoice);
//router.delete("/:id", validate(IdInvoiceSchema), InvoicesController.deleteInvoice);
//router.get("/",InvoicesController.getAllInvoicesFromCompany);
router.get("/:id", InvoicesController.getInvoiceById);

export default router;
