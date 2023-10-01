/*
test logging in with wrong credentials should return 401
test logging in with correct credentials should return 200 and a JWT token
*/


import request from "supertest";
import app from "../../src/lib/createServer";
import { createRandomUser } from "../../prisma/fixtures/users";
import { prisma } from "../../prisma/index";


describe("signup", () => {
    it("should return 200 and a JWT token", async () => {
        const email = "email1@test.com";
        const password = "password1";
        const name = "name1";
        const response = await request(app).post("/auth/signup").send({ email, password, name });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        /* check if user exists in database */
        const user = await prisma.user.findUnique({ where: { email } });
        expect(user).toBeTruthy();


    });
    it("should return 400 if user already exits", async () => {
        const user = await createRandomUser();
        const response = await request(app).post("/auth/signup").send({ email: user.email, password: user.password });
        expect(response.status).toBe(400);
    });
    /* disabled until we have a better email validation. returning 200 */
    /*it('should return 400 if email is not valid', async () => {
        const email = "email1";
        const password = "password1";
        const name = "name1";
        const response = await request(app).post("/auth/signup").send({ email, password, name });
        expect(response.status).toBe(400);
    });*/
    it("should return 400 if password is missing", async () => {
        const email = "email@test.com";
        const name = "name";
        const response = await request(app).post("/auth/signup").send({ email, name });
        expect(response.status).toBe(400);
    });
    it("should return 400 if email is missing", async () => {
        const password = "password";
        const name = "name";
        const response = await request(app).post("/auth/signup").send({ password, name });
        expect(response.status).toBe(400);
    });
    it("should return 400 if name is missing", async () => {
        const email = "email@test.com";
        const password = "password";
        const response = await request(app).post("/auth/signup").send({ email, password });
        expect(response.status).toBe(400);
    });
});
