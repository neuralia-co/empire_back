import prisma from "../lib/prisma";

export const getUserById = async (id: number) => {
    return prisma.user.findFirst({
        where: { id },
        select: {
            email: false,
            name: true,
            password: false,
        }
    });
};


export const getFullUserById = async (id: number) => {
    return prisma.user.findFirst({
        where: { id },
        select: {
            email: true,
            name: true,
            password: false,
        }
    });
};
