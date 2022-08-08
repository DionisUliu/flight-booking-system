"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVerifyTwoFactorAuthTokenRequest = exports.validateCompleteTwoFactorAuthRequest = exports.validatePasswordUpdateRequest = exports.validateResetPasswordRequest = exports.validateLogInRequest = exports.validateConfirmAccountRequest = exports.validateResendConfirmationEmailRequest = exports.validateUserRegisterRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const error_1 = require("../../utils/error");
const validateUserRegisterRequest = ({ input }) => {
    const schema = joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).alphanum().required(),
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        phoneNumber: joi_1.default.string().required(),
        redirectUrl: joi_1.default.string().uri().required(),
    });
    const { error } = schema.validate(input);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateUserRegisterRequest = validateUserRegisterRequest;
const validateResendConfirmationEmailRequest = ({ input }) => {
    const schema = joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        redirectUrl: joi_1.default.string().uri().required(),
    });
    const { error } = schema.validate(input);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateResendConfirmationEmailRequest = validateResendConfirmationEmailRequest;
const validateConfirmAccountRequest = ({ input }) => {
    const schema = joi_1.default.object().keys({
        token: joi_1.default.string().required(),
    });
    const { error } = schema.validate(input);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateConfirmAccountRequest = validateConfirmAccountRequest;
const validateLogInRequest = ({ input }) => {
    const schema = joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    });
    const { error } = schema.validate(input);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateLogInRequest = validateLogInRequest;
const validateResetPasswordRequest = ({ input }) => {
    const schema = joi_1.default.object()
        .keys({
        email: joi_1.default.string().email().required(),
        redirectUrl: joi_1.default.string().uri().required(),
    })
        .required();
    const { error } = schema.validate(input);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateResetPasswordRequest = validateResetPasswordRequest;
const validatePasswordUpdateRequest = ({ input }) => {
    const schema = joi_1.default.object()
        .keys({
        token: joi_1.default.string().required(),
        password: joi_1.default.string().min(8).alphanum().required(),
    })
        .required();
    const { error } = schema.validate(input);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validatePasswordUpdateRequest = validatePasswordUpdateRequest;
const validateCompleteTwoFactorAuthRequest = ({ input }) => {
    const schema = joi_1.default.object().keys({
        token: joi_1.default.string().required(),
    });
    const { error } = schema.validate(input);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateCompleteTwoFactorAuthRequest = validateCompleteTwoFactorAuthRequest;
const validateVerifyTwoFactorAuthTokenRequest = ({ input }) => {
    const schema = joi_1.default.object().keys({
        token: joi_1.default.string().required(),
    });
    const { error } = schema.validate(input);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateVerifyTwoFactorAuthTokenRequest = validateVerifyTwoFactorAuthTokenRequest;
