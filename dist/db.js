"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
const { MONGO_URI } = process.env;
exports.client = new mongodb_1.MongoClient(MONGO_URI || '');
exports.db = exports.client.db();
//# sourceMappingURL=db.js.map