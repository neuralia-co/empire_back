import { NextFunction, RequestHandler, Request, Response } from "express";
import prisma from "../lib/prisma";
import { OneCompanySchema } from "./schema.companies";
import { AppError } from "../lib/utility-classes";
import { CreateSchema } from "../companies/schema.companies";
import * as companiesService from "./service.companies";


export const create: RequestHandler = async (
    req: Request<unknown, unknown, CreateSchema>,
    res,
    next
) => {
    const companyData = {
        siren: req.body.siren,
        color: req.body.color,
        name: req.body.name,
    };

    if (await companiesService.findCompanyBySiren(companyData.siren)) {
        return next(
            new AppError("validation", "A company already exists with that siren")
        );
    }

    const newCompany = await companiesService.createCompany(companyData);

    res.status(200).json({
        message: "Registered successfully",
        company: newCompany
    });
};

export const getAllCompanies: RequestHandler = async (_req,res) => {
    console.log("getAllCompanies");
    const companies = await prisma.company.findMany();
    res.json(companies);
};

export const getOneCompany: RequestHandler<OneCompanySchema> = async (
    req: Request<OneCompanySchema>,
    res: Response,
    next: NextFunction
) => {
    console.log("Hello darkness my old friend, I've come to talk with you again");
    console.log(req.params);
    const { id } = req.params;
    const companyId = parseInt(id);
    console.log("companyId: " + companyId);
    const company = await prisma.company.findFirst({
        where: { id: companyId },
    });

    const invoices = await prisma.invoicesOnCompanies.findMany({
        where: { company: { id: companyId } },
        include: { invoice: true,  },
    });

    if (!company) {
        return next(new AppError("validation", "Company not found."));
    }

    const invoicesToReturn = invoices || [];
    console.log("invoices:",invoicesToReturn);

    res.json({ company,invoices: invoicesToReturn });
};

export const getMyCompanies: RequestHandler = async (
    req: Request<unknown, unknown>,
    res: Response,
    next: NextFunction
) => {
    console.log("geyMyCompanies");
    const companies = await prisma.usersOnCompanies.findMany({
        where: { user: { id: req.decodedToken.id } },
        include: { company: true },
    });


    if (!companies) {
        return next(new AppError("validation", "The user isn't linked to any company or the other doesn't exist"));
    }

    res.json(companies);
};

