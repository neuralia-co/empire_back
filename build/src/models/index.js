"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Note = void 0;
const note_1 = __importDefault(require("./note"));
exports.Note = note_1.default;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
user_1.default.hasMany(note_1.default);
note_1.default.belongsTo(user_1.default);
void note_1.default.sync({ alter: true });
void user_1.default.sync({ alter: true });
