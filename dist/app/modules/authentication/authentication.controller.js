"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTwoFactorAuthToken = exports.completeTwoFactorAuthentication = exports.initTwoFactorAuthentication = exports.resetPassword = exports.requestNewPassword = exports.logIn = exports.resendConfirmationEmail = exports.confirmAccount = exports.registerUser = void 0;
const service = __importStar(require("./authentication.service"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service.registerUser({ requestBody: req.body });
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
});
exports.registerUser = registerUser;
const confirmAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service.confirmAccount({ requestParams: req.query });
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
});
exports.confirmAccount = confirmAccount;
const resendConfirmationEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service.resendConfirmationEmail({ requestBody: req.body });
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
});
exports.resendConfirmationEmail = resendConfirmationEmail;
const logIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service.logIn({ requestBody: req.body });
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
});
exports.logIn = logIn;
const requestNewPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service.requestNewPassword({ requestBody: req.body });
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
});
exports.requestNewPassword = requestNewPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service.resetPassword({ requestBody: req.body });
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
});
exports.resetPassword = resetPassword;
const initTwoFactorAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield service.initTwoFactorAuthentication({
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        });
        res.status(200).send(result);
    }
    catch (e) {
        next(e);
    }
});
exports.initTwoFactorAuthentication = initTwoFactorAuthentication;
const completeTwoFactorAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        yield service.completeTwoFactorAuthentication({
            userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
            requestBody: req.body,
        });
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
});
exports.completeTwoFactorAuthentication = completeTwoFactorAuthentication;
const verifyTwoFactorAuthToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        yield service.verifyTwoFactorAuthToken({
            userId: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id,
            requestParams: req.query,
        });
        res.sendStatus(200);
    }
    catch (e) {
        next(e);
    }
});
exports.verifyTwoFactorAuthToken = verifyTwoFactorAuthToken;
