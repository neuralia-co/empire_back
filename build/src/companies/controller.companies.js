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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyCompanies = exports.getOneCompany = exports.getAllCompanies = exports.create = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const utility_classes_1 = require("../lib/utility-classes");
const companiesService = __importStar(require("./service.companies"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const companyData = {
        siren: req.body.siren,
        color: req.body.color,
        name: req.body.name,
    };
    if (yield companiesService.findCompanyBySiren(companyData.siren)) {
        return next(new utility_classes_1.AppError("validation", "A company already exists with that siren"));
    }
    const newCompany = yield companiesService.createCompany(companyData);
    res.status(200).json({
        message: "Registered successfully",
        company: newCompany
    });
});
exports.create = create;
const getAllCompanies = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getAllCompanies");
    const companies = yield prisma_1.default.company.findMany();
    res.json(companies);
});
exports.getAllCompanies = getAllCompanies;
const getOneCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hello darkness my old friend, I've come to talk with you again");
    console.log(req.params);
    const { id } = req.params;
    const companyId = parseInt(id);
    console.log("companyId: " + companyId);
    const company = yield prisma_1.default.company.findFirst({
        where: { id: companyId },
    });
    const invoices = yield prisma_1.default.invoicesOnCompanies.findMany({
        where: { company: { id: companyId } },
        include: { invoice: true, },
    });
    if (!company) {
        return next(new utility_classes_1.AppError("validation", "Company not found."));
    }
    const invoicesToReturn = invoices || [];
    console.log("invoices:", invoicesToReturn);
    res.json({ company, invoices: invoicesToReturn });
});
exports.getOneCompany = getOneCompany;
const getMyCompanies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("geyMyCompanies");
    const companies = yield prisma_1.default.usersOnCompanies.findMany({
        where: { user: { id: req.decodedToken.id } },
        include: { company: true },
    });
    if (!companies) {
        return next(new utility_classes_1.AppError("validation", "The user isn't linked to any company or the other doesn't exist"));
    }
    res.json(companies);
});
exports.getMyCompanies = getMyCompanies;
