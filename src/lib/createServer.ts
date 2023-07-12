import cors from "cors";
import express from "express";
import invoicesRouter from "../invoices/router.invoices";
import usersRouter from "../users/router.users";
import authRouter from "../auth/router.auth";
import { errorHandler, authorization } from "./middlewares";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/invoices", authorization, invoicesRouter);
app.use("/users",authorization, usersRouter);
app.use("/auth", authRouter);

app.get("/ping", (_req, res) => {
    const date = new Date;
    const info = "pong at " + (date.getUTCHours() + 2) + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
    console.log(info);
    res.send(info);
});



app.use(errorHandler);



export default app;
