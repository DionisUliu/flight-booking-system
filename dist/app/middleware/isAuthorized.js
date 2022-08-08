"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorDetailsConstants_1 = __importDefault(require("../constants/errorDetailsConstants"));
const error_1 = require("../utils/error");
function isAuthorized(req, res, next) {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
        throw new error_1.NotAuthorized(errorDetailsConstants_1.default.NOT_AUTHORIZED);
    }
    next();
}
exports.default = isAuthorized;
