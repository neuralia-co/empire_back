"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./utils/config");
const db_1 = require("./utils/db");
const app = (0, express_1.default)();
const notes_1 = __importDefault(require("./controllers/notes"));
const users_1 = __importDefault(require("./controllers/users"));
const login_1 = __importDefault(require("./controllers/login"));
app.use(express_1.default.json());
app.use("/api/notes", notes_1.default);
app.use("/api/users", users_1.default);
app.use("/api/login", login_1.default);
app.get("/api/ping", (_req, res) => {
    const date = new Date;
    const info = "pong at " + (date.getUTCHours() + 2) + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
    console.log(info);
    res.send(info);
});
const server = app.listen(config_1.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const port = server.address().port;
    yield (0, db_1.connectToDatabase)();
    console.log("App listening on port : ", port);
}));
