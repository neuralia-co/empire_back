import supertest from "supertest";
import { describe, expect, test } from "@jest/globals";
import app from "../app";
const api = supertest(app);


describe("simple ping", () => {

    test("returns json", async () => {
        await api
            .get("/api/ping")
            .expect(200)
            .expect("Content-Type", "text/html; charset=utf-8");
    });

    test("returns pong", async () => {
        const response = await api.get("/api/ping");

        expect(response.text).toContain("pong");
    });
});
