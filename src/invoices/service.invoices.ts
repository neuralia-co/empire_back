import prisma from "../lib/prisma";

export const createInvoice = async (
    title: string,
    ownerId: number,
    content: string | undefined,
    url: string | undefined
) => {
    return prisma.invoice.create({
        data: {
            title,
            owner: {
                connect: {
                    id: ownerId,
                }
            },
            content,
            url,
        }
    });
};

export const getInvoiceById = async (id: number) => {
    return prisma.invoice.findFirst({
        where: { id }
    });
};

export const getAllInvoicesFromUser = async (id: number) => {
    return prisma.invoice.findMany({
        where: { ownerId: id }
    });
};

export const deleteInvoice = async (id: number) => {
    return prisma.invoice.delete({
        where: { id }
    });
};
