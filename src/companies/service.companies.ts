import type { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

export const findCompanyBySiren = async (siren: string) => {
    return prisma.company.findFirst({ where: { siren } });
};

export const createCompany = async (
    company: Omit<Prisma.CompanyCreateInput, "invoices">
) => {

    console.log("company created with the following data : ", company);

    return prisma.company.create({
        data: company
    });
};
