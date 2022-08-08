"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = require("../utils/error");
const errorDetailsConstants_1 = __importDefault(require("../constants/errorDetailsConstants"));
function validateObjectId(req, res, next) {
    if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
        throw new error_1.BadRequest(errorDetailsConstants_1.default.INVALID_OBJECT_ID);
    }
    next();
}
exports.default = validateObjectId;
