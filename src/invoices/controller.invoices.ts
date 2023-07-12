import { RequestHandler, NextFunction,Request,Response } from "express";
import type { CreateInvoiceSchema, IdInvoiceSchema } from "./schema.invoices";
import { AppError } from "../lib/utility-classes";
import * as InvoicesServices from "./service.invoices";

export const createInvoice: RequestHandler = async (
    req: Request<unknown, unknown, CreateInvoiceSchema>,
    res
) => {
    const { title, content, url } = req.body;

    const invoice = await InvoicesServices.createInvoice(title,req.decodedToken.id,content, url);

    res.status(200).json({
        message: "Invoice successfully uploaded.",
        invoice
    });

};

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export const getAllInvoicesFromUser: RequestHandler = async (req,res) => {
    const invoices = await InvoicesServices.getAllInvoicesFromUser(req.decodedToken.id);

    await delay(500);

    res.json( invoices );
};

export const deleteInvoice: RequestHandler<IdInvoiceSchema> = async (
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

};

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

    if (!(invoice.ownerId === req.decodedToken.id)) {
        return next(
            new AppError(
                "unauthorized",
                "You are not authorized to see this invoice."
            )
        );
    }

    res.json(invoice);

};
