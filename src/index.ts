import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.static("build"));
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
    console.log("someone pinged here");
    const date = new Date;
    res.send("pong at " + (date.getUTCHours() + 2) + ":" + date.getUTCMinutes());
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});