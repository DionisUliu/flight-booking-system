"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
// import { getLogger } from '../config/logger';
const error_1 = require("../utils/error");
/**
 * Express error handling middleware
 */
exports.default = (err, req, res, next) => {
    let fullPath = null;
    let error = err;
    if ((req === null || req === void 0 ? void 0 : req.originalUrl) && (req === null || req === void 0 ? void 0 : req.method)) {
        fullPath = `${req.method} ${req.originalUrl}`;
    }
    if (!(err instanceof error_1.GeneralError)) {
        error = new error_1.InternalError(typeof err === 'object' ? util_1.default.inspect(err) : err);
    }
    error.setPath(fullPath);
    // getLogger().error(error.printForLogging());
    if (res === null || res === void 0 ? void 0 : res.headersSent) {
        next(err); // pass error to default express handler
        return;
    }
    if (!error.logOnly) {
        res === null || res === void 0 ? void 0 : res.status(error.getCode()).json(error.printForHTTPResponse());
    }
};
