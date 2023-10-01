import { RequestHandler, NextFunction,Request,Response } from "express";
import type { CreateInvoiceSchema, IdInvoiceSchema, UpdateInvoiceSchema } from "./schema.invoices";
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

        console.log("newly created invoice : " + JSON.stringify(invoice));

        res.status(200).json({
            message: "Invoice successfully uploaded!",
            invoice
        });

    } catch (e) {
        if (e instanceof Prisma.PrismaClientValidationError) {
            console.log(e.message);
        }
        console.log("Erreur lors de la creation de la facture : \n",e);
        res.status(400).json({
            message: "invoice couldn't be created"
        });
        //throw e;
    }
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

    if (!(invoice.createdById === req.decodedToken.id)) {
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

    console.log("Facture n" + id + " :\n" + JSON.stringify(invoice));

    if (!invoice) {
        return next(new AppError("validation", "Invoice not found."));
    }

    res.json(invoice);

};

export const updateInvoiceById: RequestHandler<UpdateInvoiceSchema> = async (
    req: Request<UpdateInvoiceSchema>,
    res: Response,
    next: NextFunction
) => {
    const { title, url, pretaxValue, VAT,date,id } = req.body;
    const invoiceId = parseInt(id);
    const invoice = await InvoicesServices.getInvoiceById(invoiceId);

    console.log("Updated invoice : \n" + JSON.stringify(invoice));

    if (!invoice) {
        return next(new AppError("validation", "Invoice not found."));
    }

    /*if (!(invoice.invoice.createdById === req.decodedToken.id)) {
        return next(
            new AppError(
                "unauthorized",
                "You are not authorized to delete this invoice."
            )
        );
    }*/

    try {
        const updated = await InvoicesServices.updateInvoice(invoiceId,title,Number(pretaxValue),Number(VAT),url,date);

        console.log("recently updated invoice : " + JSON.stringify(updated));

        res.status(200).json({
            message: "Invoice successfully updated.",
            invoice: updated
        });

    } catch (e) {
        if (e instanceof Prisma.PrismaClientValidationError) {
            console.log(e.message);
        }
        console.log("Erreur lors de l'update de la facture : \n",e);
        res.status(400).json({
            message: "invoice couldn't be updated"
        });
        //throw e;
    }
};
