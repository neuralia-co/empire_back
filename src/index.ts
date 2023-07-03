import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.static("build"));
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get("/api/ping", (_req, res) => {
    const date = new Date;
    const info = "pong at " + (date.getUTCHours() + 2) + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
    console.log(info);
    res.send(info);
});

const server = app.listen(PORT, () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const host = server.address().address;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});