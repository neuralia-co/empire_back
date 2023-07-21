"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const router_invoices_1 = __importDefault(require("../invoices/router.invoices"));
const router_users_1 = __importDefault(require("../users/router.users"));
const router_auth_1 = __importDefault(require("../auth/router.auth"));
const router_companies_1 = __importDefault(require("../companies/router.companies"));
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/invoices", middlewares_1.authorization, router_invoices_1.default);
app.use("/users", middlewares_1.authorization, router_users_1.default);
app.use("/companies", middlewares_1.authorization, router_companies_1.default);
app.use("/auth", router_auth_1.default);
app.get("/ping", (_req, res) => {
    const date = new Date;
    const info = "pong at " + (date.getUTCHours() + 2) + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
    console.log(info);
    res.send(info);
});
app.use(middlewares_1.errorHandler);
exports.default = app;
