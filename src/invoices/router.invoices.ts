import * as InvoicesController from "./controller.invoices";
import { CreateInvoiceSchema,UpdateInvoiceSchema  } from "./schema.invoices";
import { Router } from "express";
import { validate } from "../lib/middlewares";

const router = Router();

router.get("/:id", InvoicesController.getInvoiceById);
router.post("/", validate(CreateInvoiceSchema), InvoicesController.createInvoice);
router.put("/:id", validate(UpdateInvoiceSchema), InvoicesController.updateInvoiceById);
//router.delete("/:id", validate(IdInvoiceSchema), InvoicesController.deleteInvoice);
//router.get("/",InvoicesController.getAllInvoicesFromCompany);
export default router;
