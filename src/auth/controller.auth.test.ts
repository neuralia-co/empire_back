import * as AuthController from "./controller.auth";
import * as AuthService from "./service.auth";
import type { Request, Response } from "express";
import { AppError } from "../lib/utility-classes";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("auth/service.auth", () => ({
    findUserByEmail: vi.fn(),
    comparePasswords: vi.fn(),
    generateJWT: vi.fn(),
    createUser: vi.fn()
}));

vi.mock("lib/utility-classes", () => ({
    AppError: class {
        constructor(public type: string, public message: string) {}
    }
}));

describe("controller.auth", () => {
    let request: Request;
    let response: Response;
    const next = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
        response = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response;
        request = {
            body: {
                email: "matthieu@gmail.com",
                password: "motdepasse",
                name: "Matthieu Porte"
            }
        } as Request;
    });

    describe("signup", () => {
        it("should throw a validation error if a user already exists with username", async () => {
            vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce({
                id: 1,
                email: "matthieu@gmail.com",
                password: "motdepasse",
                name: "Matthieu Porte"
            });

            await AuthController.signup(request, response, next);

            expect(AuthService.findUserByEmail).toHaveBeenCalledWith(
                "matthieu@gmail.com"
            );
            expect(next).toHaveBeenCalled();
            expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
            expect(next.mock.calls[0][0].message).toBeTypeOf("string");
            expect(next.mock.calls[0][0].type).toBe("validation");
        });

        it("should create a new user if username not taken", async () => {
            vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce(null);
            vi.mocked(AuthService.createUser).mockResolvedValueOnce({
                id: 1,
                email: "matthieu@gmail.com",
                name: "Matthieu Porte"
            });
            vi.mocked(AuthService.generateJWT).mockReturnValueOnce({ val:"testtoken",exp:99999999999999 });
            await AuthController.signup(request, response, next);

            expect(AuthService.createUser).toHaveBeenCalledWith(request.body);
        });

        it("should create a session token for the new user", async () => {
            vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce(null);
            vi.mocked(AuthService.createUser).mockResolvedValueOnce({
                id: 1,
                email: "matthieu@gmail.com",
                name: "Matthieu Porte"
            });
            vi.mocked(AuthService.generateJWT).mockReturnValueOnce({ val:"testtoken",exp:99999999999999 });
            await AuthController.signup(request, response, next);

            expect(AuthService.generateJWT).toHaveBeenCalledWith(1);
        });

        /*it("should respond to the request with a message, the user, and the token", async () => {
            vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce(null);
            vi.mocked(AuthService.createUser).mockResolvedValueOnce({
                id: 1,
                email: "matthieu@gmail.com",
                name: "Matthieu Porte"
            });
            vi.mocked(AuthService.generateJWT).mockReturnValueOnce({ val:"testtoken",exp:99999999999999 });
            await AuthController.signup(request, response, next);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                message: "Registered successfully",
                user: {
                    id: 1,
                    email: "matthieu@gmail.com",
                    name: "Matthieu Porte"
                },
                token: {
                    val:"testtoken",
                    exp: 99999999999999
                }
            });
        });*/
    });

    describe("signin", () => {
        it("should throw a validation error if no user exists with username", async () => {
            vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce(null);
            await AuthController.signin(request, response, next);
            expect(next).toHaveBeenCalled();
            expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
            expect(next.mock.calls[0][0].type).toBe("validation");
            expect(next.mock.calls[0][0].message).toBeTypeOf("string");
        });

        it("should throw a validation error if the password is incorrect", async () => {
            vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce({
                id: 1,
                email: "matthieu@gmail.com",
                name: "Matthieu Porte",
                password: "hashedpass"
            });
            vi.mocked(AuthService.comparePasswords).mockReturnValueOnce(false);

            await AuthController.signin(request, response, next);

            expect(AuthService.comparePasswords).toHaveBeenCalledWith(
                "motdepasse",
                "hashedpass"
            );
            expect(next).toHaveBeenCalled();
            expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
            expect(next.mock.calls[0][0].type).toBe("validation");
            expect(next.mock.calls[0][0].message).toBeTypeOf("string");
        });

        it("should create a session token for the successfully logged-in user", async () => {
            vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce({
                id: 1,
                email: "matthieu@gmail.com",
                name: "Matthieu Porte",
                password: "hashedpass"
            });
            vi.mocked(AuthService.comparePasswords).mockReturnValueOnce(true);
            vi.mocked(AuthService.generateJWT).mockReturnValue({ val:"testtoken",exp:99999999999999 });

            await AuthController.signin(request, response, next);

            expect(AuthService.generateJWT).toHaveBeenCalledWith(1);
        });

        /*it("should respond to the request with a message, the username, and the token", async () => {
            vi.mocked(AuthService.findUserByEmail).mockResolvedValueOnce({
                id: 1,
                email: "matthieu@gmail.com",
                name: "Matthieu Porte",
                password: "hashedpass"
            });
            vi.mocked(AuthService.comparePasswords).mockReturnValueOnce(true);
            vi.mocked(AuthService.generateJWT).mockReturnValue({ val:"testtoken",exp:99999999999999 });

            await AuthController.signin(request, response, next);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                message: "Login successful!",
                user: {
                    name: "Matthieu Porte",
                    email: "matthieu@gmail.com",
                    id: 1
                },
                token: {
                    val:"testtoken",
                    exp: 99999999999999
                }
            });
        });*/
    });
});
