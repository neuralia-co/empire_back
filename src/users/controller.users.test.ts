import * as UsersController from "./controller.users";
import type { Request, Response } from "express";
import { AppError } from "lib/utility-classes";
import { beforeEach, describe, expect, it, vi } from "vitest";
import prismaMock from "../lib/__mocks__/prisma";


vi.mock("lib/prisma");

vi.mock("lib/utility-classes", () => ({
    AppError: class {
        constructor(public type: string, public message: string) {}
    }
}));

describe("users.controller", () => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    let request: Request<any, any, any, any>;
    let response: Response;
    const next = vi.fn();
    const users = [{
        id: 1,
        name: "testname",
        email: "testemail",
        password: "passwordHash"
    },{
        id: 2,
        name: "testname2",
        email: "testemail2",
        password: "passwordHash"
    },{
        id: 42,
        name: "testname42",
        email: "testemail42",
        password: "passwordHash"
    }];

    beforeEach(() => {
        vi.restoreAllMocks();
        response = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response;
        request = {} as Request;
        request.decodedToken = { id: 1 };
    });

    describe("getAllUsers", () => {
        it("should return all users", async () => {
            prismaMock.user.findMany.mockResolvedValueOnce(users);

            await UsersController.getAllUsers(request,response,next);
            expect(response.json).toHaveBeenCalledWith(users);
        });

    });

    describe("getOneUser", () => {
        it("should return one user", async () => {
            request = {
                params: {
                    id: 2,
                }
            } as unknown as Request;
            prismaMock.user.findFirst.mockResolvedValueOnce(users[1]);
            await UsersController.getOneUser(request,response,next);
            expect(response.json).toHaveBeenCalledWith(users[1]);
        });
        it("should return an appError if the id is undefined", async () => {
            request = {
                params: {
                    id: 3,
                }
            } as unknown as Request;
            prismaMock.user.findFirst.mockResolvedValueOnce(null);
            await UsersController.getOneUser(request,response,next);
            expect(next).toHaveBeenCalled();
            expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
            expect(next.mock.calls[0][0].type).toBe("validation");
            expect(next.mock.calls[0][0].message).toBeTypeOf("string");
        });
    });

    describe("getMyUser", () => {
        it("should return the user linked to the token id", async () => {
            prismaMock.user.findFirst.mockResolvedValueOnce(users[0]);
            await UsersController.getMyUser(request,response,next);
            expect(response.json).toHaveBeenCalledWith(users[0]);
        });
    });

});
