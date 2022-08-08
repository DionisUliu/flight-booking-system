"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRequest = void 0;
const error_1 = require("../../utils/error");
const errorDetailsConstants_1 = __importDefault(require("../../constants/errorDetailsConstants"));
const authorizeRequest = ({ user }) => {
    if (!user.isAdmin) {
        throw new error_1.NotAuthorized(errorDetailsConstants_1.default.NOT_AUTHORIZED);
    }
};
exports.authorizeRequest = authorizeRequest;
