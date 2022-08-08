"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetAllUsersRequest = exports.validateUpdateProfileRequest = exports.validateGetProfileRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const error_1 = require("../../utils/error");
const validateGetProfileRequest = ({ input }) => {
    const schema = joi_1.default.object()
        .keys({
        id: joi_1.default.string().required(),
    })
        .required();
    const { error } = schema.validate(input);
    if (error) {
        throw new error_1.BadRequest(error === null || error === void 0 ? void 0 : error.details[0].message);
    }
};
exports.validateGetProfileRequest = validateGetProfileRequest;
const validateUpdateProfileRequest = ({ input }) => {
    const schema = joi_1.default.object()
        .keys({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        email: joi_1.default.string().email(),
        phoneNumber: joi_1.default.string().required(),
    })
        .required();
    const { error } = schema.validate(input);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateUpdateProfileRequest = validateUpdateProfileRequest;
const validateGetAllUsersRequest = ({ input }) => {
    const schema = joi_1.default.object().keys({
        firstName: joi_1.default.string().min(2).max(150),
        fields: joi_1.default.string().min(1).max(150),
    });
    const { error } = schema.validate(input);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateGetAllUsersRequest = validateGetAllUsersRequest;
