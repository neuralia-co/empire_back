/*import * as InvoicesController from "./controller.invoices";
import * as InvoicesService from "./service.invoices";
import type { Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";*/

/*import { afterAll, afterEach, beforeAll } from "vitest";
import prisma from "../lib/__mocks__/prisma";
import { z } from "zod";
import * as AuthService from "../auth/service.auth";
import * as AuthController from "../auth/controller.auth";
import { createInvoice } from "./controller.invoices";*/

/*vi.mock("../lib/prisma");

vi.mock("./service.invoices", () => ({
    createInvoice: vi.fn(),
    getInvoiceById: vi.fn(),
    getAllInvoicesFromCompany: vi.fn(),
    updateInvoice: vi.fn()
}));

// create invoice
describe("invoice creation", () => {
    let request: Request;
    let response: Response;
    const next = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
        /!*response = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response;*!/
        request = {
            body: {
                title: "test title",
                content:"content",
                url: "https://test.com",
                pretaxValue: "234",
                VAT: "20",
                idFrom: 1,
                idTo: 2,
                debit: true,
                date: "04 Dec 1995 00:12:00 GMT",
            }
        } as Request;
    });


    it("should create and return a new invoice with its data", async () => {
        vi.mocked(InvoicesService.createInvoice).mockResolvedValueOnce({
            id:1,
            title: "test title",
            url: "https://test.com",
            pretaxValue: 234,
            VAT: 20,
            createdAt:new Date(Date.parse("04 Dec 1995 00:12:00 GMT")),
            date: new Date(Date.parse("04 Dec 1995 00:12:00 GMT")),
            createdById: 1,
            content: null,
            updatedAt:null,
            updatedById: null
        });

        InvoicesController.createInvoice(request, response, next);

        //expect(created_invoice).toBe(true);
        expect(response.status).toBe(200);
    });
});*/

/*describe("get invoice by id", () => {

});*/

// update invoice


// delete invoice
