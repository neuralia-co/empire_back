import cors from "cors";
import express from "express";
//import invoicesRouter from "invoices/quotes.router";
import usersRouter from "../routers/user";
import authRouter from "../routers/auth";
import { errorHandler } from "./middlewares";

const app = express();
app.use(cors());
app.use(express.json());
//app.use("/invoices", authorization, quotesRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use(errorHandler);


app.get("/ping", (_req, res) => {
    const date = new Date;
    const info = "pong at " + (date.getUTCHours() + 2) + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
    console.log(info);
    res.send(info);
});

export default app;
