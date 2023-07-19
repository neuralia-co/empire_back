import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "pretty" });

const loadCompanies = async () => {
    const companyInput: Prisma.CompanyCreateManyInput[] = [
        {
            siren: "839872785",
            color: "#284387",
            name: "neuralia.co"
        },
        {
            siren: "919928573",
            color: "#fbc093",
            name: "LJP Invest"
        },
        {
            siren: "919928574",
            color: "#e8d6cb",
            name: "LJP Immo"
        },
        {
            siren: "919928572",
            color: "#96281b",
            name: "Vermeil Developpement"
        },
    ];

    await prisma.company.createMany({
        data: companyInput,
    });
};

const loadInvoices = async () => {
    const invoicesInput: Prisma.InvoiceCreateManyInput[] = [
        {
            title: "Equipement_Decathlon_10_08_22.pdf",
            createdById: 1,
            content: "achat de materiel d'escalade pour projet sponsorisé",
            url:"https://www.fichier-pdf.fr/2013/06/10/https-www-decathlon/preview-https-www-decathlon-1.jpg",
            VAT:0.2,
            pretaxValue:315.25,
            date: new Date
        },
        {
            title: "New_Computer_10_08_22.pdf",
            createdById: 1,
            content: "achat d'un nouvel ordinateur",
            url:"https://opendocs.com/wp-content/uploads/Computer-Sales-Invoice.png",
            VAT:0.2,
            pretaxValue:1608.75,
            date: new Date
        },
        {
            title: "Equipement_Decathlon_12_08_22.pdf",
            createdById: 1,
            content: "deuxieme achat de materiel d'escalade pour projet sponsorisé",
            url:"https://www.fichier-pdf.fr/2013/06/10/https-www-decathlon/preview-https-www-decathlon-1.jpg",
            VAT:0.2,
            pretaxValue:315.25,
            date: new Date
        },
    ];

    await prisma.invoice.createMany({
        data: invoicesInput,
    });
};


const main = async () => {
    await loadCompanies();
    await loadInvoices();

    const Neuralia = await prisma.company.findUniqueOrThrow({
        where: {
            siren: "839872785",
        },
    });
    const Vermeil = await prisma.company.findUniqueOrThrow({
        where: {
            siren: "919928572",
        },
    });
    const LJP1 = await prisma.company.findUniqueOrThrow({
        where: {
            siren: "919928573",
        },
    });
    const LJP2 = await prisma.company.findUniqueOrThrow({
        where: {
            siren: "919928574",
        },
    });
    const userMatthieu = await prisma.user.findUniqueOrThrow({
        where: {
            email: "matthieu@gmail.com",
        },
    });

    const userVincent = await prisma.user.findUniqueOrThrow({
        where: {
            email: "vincent@gmail.com",
        },
    });

    const inv1 = await prisma.invoice.findUniqueOrThrow({ where:{ id:1 } });
    const inv2 = await prisma.invoice.findUniqueOrThrow({ where:{ id:2 } });
    const inv3 = await prisma.invoice.findUniqueOrThrow({ where:{ id:3 } });

    await prisma.invoicesOnCompanies.create({
        data: {
            companyId: Neuralia.id,
            invoiceId: inv1.id,
            debit: true
        },
    });
    await prisma.invoicesOnCompanies.create({
        data: {
            companyId: Neuralia.id,
            invoiceId: inv2.id,
            debit: false
        },
    });
    await prisma.invoicesOnCompanies.create({
        data: {
            companyId: Neuralia.id,
            invoiceId: inv3.id,
            debit: true
        },
    });


    await prisma.usersOnCompanies.create({
        data: {
            companyId: Neuralia.id,
            userId: userMatthieu.id,
        },
    });

    await prisma.usersOnCompanies.create({
        data: {
            companyId: Neuralia.id,
            userId: userVincent.id,
        },
    });

    await prisma.usersOnCompanies.create({
        data: {
            companyId: LJP1.id,
            userId: userVincent.id,
        },
    });

    await prisma.usersOnCompanies.create({
        data: {
            companyId: LJP2.id,
            userId: userVincent.id,
        },
    });

    await prisma.usersOnCompanies.create({
        data: {
            companyId: Vermeil.id,
            userId: userMatthieu.id,
        },
    });
};

main().then();
