import * as CompaniesServices from "../service.companies";
import prismaMock from "lib/__mocks__/prisma";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("lib/prisma");

describe("controller.companies", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });
    describe("get all companies", () => {
        it("should return all companies",() => {
            prismaMock.company.findMany.mockResolvedValueOnce([
                {
                    "id": 1,
                    "name": "neuralia.co",
                    "siren": "0000001",
                    "color": "4287f5"
                },
                {
                    "id": 2,
                    "name": "Vermeil Developpement",
                    "siren": "0000002",
                    "color": "4287f5"
                }
            ]);

        });
        it("should throw an error is there is no company",() => {
            expect(1).toBe(1);

        });
    });

    //create



    // get one


    // get mine

});
