import type { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

export const findCompanyBySiren = async (siren: string) => {
    return prisma.company.findFirst({ where: { siren } });
};

export const createCompany = async (
    company: Omit<Prisma.CompanyCreateInput, "invoices">
) => {

    return prisma.company.create({
        data: company
    });
};
