import { RequestHandler, NextFunction,Request,Response } from "express";
import type { CreateInvoiceSchema, IdInvoiceSchema } from "./schema.invoices";
import { AppError } from "../lib/utility-classes";
import * as InvoicesServices from "./service.invoices";
import { Prisma } from "@prisma/client";

export const createInvoice: RequestHandler = async (
    req: Request<unknown, unknown, CreateInvoiceSchema>,
    res
) => {
    console.log(req.body);
    const { title, content, url, pretaxValue, VAT,idFrom,idTo,debit,date } = req.body;

    try {
        const invoice = await InvoicesServices.createInvoice(title,req.decodedToken.id, Number(pretaxValue), Number(VAT),content, url,idFrom,idTo,debit,date);

        console.log("DONE WITH CREATING THE INVOICWE");

        res.status(200).json({
            message: "Invoice successfully uploaded!",
            invoice
        });

    } catch (e) {

        console.log("ERRROR SA MEEERE",e);
        if (e instanceof Prisma.PrismaClientValidationError) {
            console.log(e.message);
        }
        res.status(400).json({
            message: "invoice couldn't be created"
        });
        //throw e;
    }
    console.log("done with creating");
};

export const getAllInvoicesFromCompany: RequestHandler = async (req,res) => {
    const { id } = req.params;
    const companyId = parseInt(id);
    const invoices = await InvoicesServices.getAllInvoicesFromCompany(companyId);
    res.json( invoices );
};

/*export const deleteInvoice: RequestHandler<IdInvoiceSchema> = async (
    req: Request<IdInvoiceSchema>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const invoiceId = parseInt(id);
    const invoice = await InvoicesServices.getInvoiceById(invoiceId);

    if (!invoice) {
        return next(new AppError("validation", "Invoice not found."));
    }

    if (!(invoice.ownerId === req.decodedToken.id)) {
        return next(
            new AppError(
                "unauthorized",
                "You are not authorized to delete this invoice."
            )
        );
    }

    const deleted = await InvoicesServices.deleteInvoice(invoiceId);

    res.status(200).json({
        message: "Invoice successfully deleted.",
        invoice: deleted
    });

};*/

export const getInvoiceById: RequestHandler<IdInvoiceSchema> = async (
    req: Request<IdInvoiceSchema>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const invoiceId = parseInt(id);
    const invoice = await InvoicesServices.getInvoiceById(invoiceId);

    if (!invoice) {
        return next(new AppError("validation", "Invoice not found."));
    }

    /*if (!(invoice.ownerId === req.decodedToken.id)) {
        return next(
            new AppError(
                "unauthorized",
                "You are not authorized to see this invoice."
            )
        );
    }*/

    res.json(invoice);

};
