import prisma from "../lib/prisma";

export const createInvoice = async (
    title: string,
    ownerId: number,
    pretaxValue: number,
    VAT: number,
    content: string | undefined,
    url: string
) => {
    return prisma.invoice.create({
        data: {
            title,
            createdBy: {
                connect: {
                    id: ownerId,
                }
            },
            content,
            url,
            pretaxValue,
            VAT,
        }
    });
};

export const getInvoiceById = async (id: number) => {
    return prisma.invoice.findFirst({
        where: { id }
    });
};

export const getAllInvoicesFromCompany = async (id: number) => {
    return prisma.invoicesOnCompanies.findMany({
        where: { company: { id: id } },
        include: { invoice: true },
    });
};

export const deleteInvoice = async (id: number) => {
    return prisma.invoice.delete({
        where: { id }
    });
};
