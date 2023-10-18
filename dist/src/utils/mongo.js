"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
async function connection() {
    try {
        console.log("connecting");
        await mongoose_1.default.connect(config_1.default.get('dbUri'));
        console.log("connected ...");
    }
    catch (err) {
        console.log("error");
        console.log(err);
        process.exit(1);
    }
}
exports.connection = connection;
