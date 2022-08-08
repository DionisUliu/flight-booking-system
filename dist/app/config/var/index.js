"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const production_1 = __importDefault(require("./production"));
const development_1 = __importDefault(require("./development"));
const test_1 = __importDefault(require("./test"));
let config = development_1.default;
switch (process.env.NODE_ENV) {
    case 'development':
        config = development_1.default;
        break;
    case 'production':
        config = production_1.default;
        break;
    case 'test':
        config = test_1.default;
        break;
    default:
        config = development_1.default;
}
exports.default = config;
