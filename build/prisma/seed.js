"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({ errorFormat: "pretty" });
const loadCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    const companyInput = [
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
    yield prisma.company.createMany({
        data: companyInput,
    });
});
const loadInvoices = () => __awaiter(void 0, void 0, void 0, function* () {
    const invoicesInput = [
        {
            title: "Equipement_Decathlon_10_08_22.pdf",
            createdById: 1,
            content: "achat de materiel d'escalade pour projet sponsorisé",
            url: "https://www.fichier-pdf.fr/2013/06/10/https-www-decathlon/preview-https-www-decathlon-1.jpg",
            VAT: 0.2,
            pretaxValue: 315.25,
            date: new Date
        },
        {
            title: "New_Computer_10_08_22.pdf",
            createdById: 1,
            content: "achat d'un nouvel ordinateur",
            url: "https://opendocs.com/wp-content/uploads/Computer-Sales-Invoice.png",
            VAT: 0.2,
            pretaxValue: 1608.75,
            date: new Date
        },
        {
            title: "Equipement_Decathlon_12_08_22.pdf",
            createdById: 1,
            content: "deuxieme achat de materiel d'escalade pour projet sponsorisé",
            url: "https://www.fichier-pdf.fr/2013/06/10/https-www-decathlon/preview-https-www-decathlon-1.jpg",
            VAT: 0.2,
            pretaxValue: 315.25,
            date: new Date
        },
    ];
    yield prisma.invoice.createMany({
        data: invoicesInput,
    });
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield loadCompanies();
    yield loadInvoices();
    const Neuralia = yield prisma.company.findUniqueOrThrow({
        where: {
            siren: "839872785",
        },
    });
    const Vermeil = yield prisma.company.findUniqueOrThrow({
        where: {
            siren: "919928572",
        },
    });
    const LJP1 = yield prisma.company.findUniqueOrThrow({
        where: {
            siren: "919928573",
        },
    });
    const LJP2 = yield prisma.company.findUniqueOrThrow({
        where: {
            siren: "919928574",
        },
    });
    const userMatthieu = yield prisma.user.findUniqueOrThrow({
        where: {
            email: "matthieu@gmail.com",
        },
    });
    const userVincent = yield prisma.user.findUniqueOrThrow({
        where: {
            email: "vincent@gmail.com",
        },
    });
    const inv1 = yield prisma.invoice.findUniqueOrThrow({ where: { id: 1 } });
    const inv2 = yield prisma.invoice.findUniqueOrThrow({ where: { id: 2 } });
    const inv3 = yield prisma.invoice.findUniqueOrThrow({ where: { id: 3 } });
    yield prisma.invoicesOnCompanies.create({
        data: {
            companyId: Neuralia.id,
            invoiceId: inv1.id,
            debit: true
        },
    });
    yield prisma.invoicesOnCompanies.create({
        data: {
            companyId: Neuralia.id,
            invoiceId: inv2.id,
            debit: false
        },
    });
    yield prisma.invoicesOnCompanies.create({
        data: {
            companyId: Neuralia.id,
            invoiceId: inv3.id,
            debit: true
        },
    });
    yield prisma.usersOnCompanies.create({
        data: {
            companyId: Neuralia.id,
            userId: userMatthieu.id,
        },
    });
    yield prisma.usersOnCompanies.create({
        data: {
            companyId: Neuralia.id,
            userId: userVincent.id,
        },
    });
    yield prisma.usersOnCompanies.create({
        data: {
            companyId: LJP1.id,
            userId: userVincent.id,
        },
    });
    yield prisma.usersOnCompanies.create({
        data: {
            companyId: LJP2.id,
            userId: userVincent.id,
        },
    });
    yield prisma.usersOnCompanies.create({
        data: {
            companyId: Vermeil.id,
            userId: userMatthieu.id,
        },
    });
});
main().then();
