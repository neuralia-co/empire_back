"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getInvoiceById = exports.getAllInvoicesFromCompany = exports.createInvoice = void 0;
const utility_classes_1 = require("../lib/utility-classes");
const InvoicesServices = __importStar(require("./service.invoices"));
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { title, content, url, pretaxValue, VAT, idFrom, idTo, debit, date } = req.body;
    const invoice = yield InvoicesServices.createInvoice(title, req.decodedToken.id, Number(pretaxValue), Number(VAT), content, url, idFrom, idTo, debit, date);
    res.status(200).json({
        message: "Invoice successfully uploaded.",
        invoice
    });
});
exports.createInvoice = createInvoice;
const getAllInvoicesFromCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const companyId = parseInt(id);
    const invoices = yield InvoicesServices.getAllInvoicesFromCompany(companyId);
    res.json(invoices);
});
exports.getAllInvoicesFromCompany = getAllInvoicesFromCompany;
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

    if (!(invoice.ownerId === req.decodedToken.id)) {
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
const getInvoiceById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const invoiceId = parseInt(id);
    const invoice = yield InvoicesServices.getInvoiceById(invoiceId);
    if (!invoice) {
        return next(new utility_classes_1.AppError("validation", "Invoice not found."));
    }
    /*if (!(invoice.ownerId === req.decodedToken.id)) {
        return next(
            new AppError(
                "unauthorized",
                "You are not authorized to see this invoice."
            )
        );
    }*/
    res.json(invoice);
});
exports.getInvoiceById = getInvoiceById;
