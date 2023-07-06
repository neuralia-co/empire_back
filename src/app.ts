import express from "express";
const app = express();

import notesRouter from "./controllers/notes";
import usersRouter from "./controllers/users";
import loginRouter from "./controllers/login";

app.use(express.json());

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);


app.get("/api/ping", (_req, res) => {
    const date = new Date;
    const info = "pong at " + (date.getUTCHours() + 2) + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
    console.log(info);
    res.send(info);
});

export default app;
