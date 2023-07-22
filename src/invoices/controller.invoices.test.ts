
import {  describe, expect, it } from "vitest";

describe("prop tests", () => {
    it("1+1", () => {
        expect(1+1).toBe(2);
    });
});

/*
import * as InvoicesController from "./controller.invoices";
import * as InvoicesService from "./service.invoices";
import type { Request, Response } from "express";
import { AppError } from "../lib/utility-classes";*/
import { /*beforeEach,*/ describe, expect, it, vi } from "vitest";

vi.mock("invoices/service.invoices", () => ({
    createInvoice: vi.fn(),
    deleteInvoice: vi.fn(),
    getAllInvoicesFromUser: vi.fn(),
    getInvoiceById: vi.fn()
}));

vi.mock("lib/utility-classes", () => ({
    AppError: class {
        constructor(public type: string, public message: string) {}
    }
}));

describe("blank test", () => {
    it("should pass 1 === 1", () => {
        expect(1).toStrictEqual(1);
    });
});

/*
describe("controller.invoices", () => {
    let request: Request<any, any, any, any>;
    let response: Response;
    const next = vi.fn();

    const date = new Date();
    const invoices = [
        {
            id: 1,
            title: "testInvoice",
            content: "testdescription",
            url: "unittest.com",
            createdAt: date,
            updatedAt: date,
            ownerId: 1,
            processed: false
        },
        {
            id: 2,
            title: "testInvoice2",
            content: "testdescription2",
            url: "unittest.com",
            createdAt: date,
            updatedAt: date,
            ownerId: 2,
            processed: false
        },
    ];

    beforeEach(() => {
        vi.resetAllMocks();
        response = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response;
        request = {} as Request;
        request.decodedToken = { id: 1 };
    });

    describe("createInvoice",() => {
        it("should create an invoice when the values passed are correct", async() => {
            request.body = {
                title: "testInvoice",
                content: "testdescription",
                url: "unittest.com"
            };

            vi.mocked(InvoicesService.createInvoice).mockResolvedValueOnce(invoices[0]);
            await InvoicesController.createInvoice(request, response, next);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                message: "Invoice successfully uploaded.",
                invoice: invoices[0]
            });
            //expect(InvoicesService.createInvoice).toHaveBeenCalledWith(request.body);
        });

    });

    describe("deleteInvoice",() => {
        it("should throw an error if the invoice doesn't exist", async () => {
            request.params = {
                id: 3,
            };

            vi.mocked(InvoicesService.getInvoiceById).mockResolvedValueOnce(null);

            await InvoicesController.deleteInvoice(request,response,next);
            expect(next).toHaveBeenCalled();
            expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
            expect(next.mock.calls[0][0].type).toBe("validation");
            expect(next.mock.calls[0][0].message).toBeTypeOf("string");
        });

        it("should throw an error if the invoice is not the user's", async () => {
            request.params = {
                id: 2,
            };

            vi.mocked(InvoicesService.getInvoiceById).mockResolvedValueOnce(invoices[1]);

            await InvoicesController.deleteInvoice(request,response,next);
            expect(next).toHaveBeenCalled();
            expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
            expect(next.mock.calls[0][0].type).toBe("unauthorized");
            expect(next.mock.calls[0][0].message).toBeTypeOf("string");

        });

        it("should successfully delete one's invoice if it exists", async () => {
            request.params = {
                id: 1,
            };

            vi.mocked(InvoicesService.getInvoiceById).mockResolvedValueOnce(invoices[0]);

            await InvoicesController.deleteInvoice(request,response,next);
            expect(InvoicesService.deleteInvoice).toHaveBeenCalledWith(1);
        });
    });


    describe("getInvoiceById",() => {
        it("should throw an error if the invoice doesn't exist", async () => {
            request.params = {
                id: 3,
            };

            vi.mocked(InvoicesService.getInvoiceById).mockResolvedValueOnce(null);

            await InvoicesController.getInvoiceById(request,response,next);
            expect(next).toHaveBeenCalled();
            expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
            expect(next.mock.calls[0][0].type).toBe("validation");
            expect(next.mock.calls[0][0].message).toBeTypeOf("string");
        });

        it("should throw an error if the invoice is not the user's", async () => {
            request.params = {
                id: 2,
            };

            vi.mocked(InvoicesService.getInvoiceById).mockResolvedValueOnce(invoices[1]);

            await InvoicesController.getInvoiceById(request,response,next);
            expect(next).toHaveBeenCalled();
            expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
            expect(next.mock.calls[0][0].type).toBe("unauthorized");
            expect(next.mock.calls[0][0].message).toBeTypeOf("string");

        });

        it("should show one's invoice if it exists", async () => {
            request.params = {
                id: 1,
            };

            vi.mocked(InvoicesService.getInvoiceById).mockResolvedValueOnce(invoices[0]);

            await InvoicesController.getInvoiceById(request,response,next);
            expect(InvoicesService.getInvoiceById).toHaveBeenCalledWith(1);
            expect(response.json).toHaveBeenCalledWith(invoices[0]);
        });
    });
});
*/
