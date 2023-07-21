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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInvoice = exports.getAllInvoicesFromCompany = exports.getInvoiceById = exports.createInvoice = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createInvoice = (title, ownerId, pretaxValue, VAT, content, url, idFrom, idTo, debit, date) => __awaiter(void 0, void 0, void 0, function* () {
    const newInvoice = yield prisma_1.default.invoice.create({
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
            date: new Date(Date.parse(date))
        }
    });
    yield prisma_1.default.invoicesOnCompanies.create({
        data: {
            companyId: idFrom,
            invoiceId: newInvoice.id,
            debit: debit
        },
    });
    yield prisma_1.default.invoicesOnCompanies.create({
        data: {
            companyId: idTo,
            invoiceId: newInvoice.id,
            debit: !debit
        },
    });
});
exports.createInvoice = createInvoice;
const getInvoiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.invoicesOnCompanies.findMany({
        where: { invoice: { id: id } },
        include: { invoice: true, company: true },
    });
});
exports.getInvoiceById = getInvoiceById;
const getAllInvoicesFromCompany = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.invoicesOnCompanies.findMany({
        where: { company: { id: id } },
        include: { invoice: true },
    });
});
exports.getAllInvoicesFromCompany = getAllInvoicesFromCompany;
const deleteInvoice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.invoice.delete({
        where: { id }
    });
});
exports.deleteInvoice = deleteInvoice;
