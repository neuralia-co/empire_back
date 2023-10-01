/* https://www.prisma.io/docs/guides/testing/integration-testing */
/* https://www.douglasgoulart.com/writings/creating-a-complete-nodejs-test-environment-with-vitest-postgresql-and-prisma */
/* https://blog.ludicroushq.com/a-better-way-to-run-integration-tests-with-prisma-and-postgresql */



/* test /ping */
/* test / */

import request from "supertest";
import app from "../../src/lib/createServer";

describe("ping", () => {
    it("should return 200", async () => {
        const response = await request(app).get("/ping");
        expect(response.status).toBe(200);
    });
});

describe("root", () => {
    it("should return 200", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(404);
    });
});

