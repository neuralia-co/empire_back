import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.static("build"));
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
    const date = new Date;
    const info = "pong at " + (date.getUTCHours() + 2) + ":" + date.getUTCMinutes();
    console.log(info);
    res.send(info);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});