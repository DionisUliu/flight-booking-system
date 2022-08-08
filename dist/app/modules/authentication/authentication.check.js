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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserAccountIsNotConfirmed = exports.checkIfPasswordsMatch = exports.checkIfUserWithGivenUsernameExists = exports.checkIfUserAccountExists = exports.checkIfTwoFactorAuthIsEnabled = exports.checkIfTokenIsValid = exports.checkIfTwoFactorAuthIsActivated = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errorDetailsConstants_1 = __importDefault(require("../../constants/errorDetailsConstants"));
const error_1 = require("../../utils/error");
const twoFactorAuth = __importStar(require("../../config/authentication/two_factor_auth"));
const confirmation_levels_1 = __importDefault(require("../../constants/confirmation_levels"));
function checkIfTwoFactorAuthIsActivated(user) {
    if (!user.twoFactorAuth.active) {
        throw new error_1.UnprocessableEntity(errorDetailsConstants_1.default.NO_2FA);
    }
}
exports.checkIfTwoFactorAuthIsActivated = checkIfTwoFactorAuthIsActivated;
function checkIfTokenIsValid(user, token) {
    const tokenIsValid = twoFactorAuth.validateToken(user.twoFactorAuth.secret, token);
    if (!tokenIsValid) {
        throw new error_1.UnprocessableEntity(errorDetailsConstants_1.default.INVALID_2FA_TOKEN);
    }
}
exports.checkIfTokenIsValid = checkIfTokenIsValid;
function checkIfTwoFactorAuthIsEnabled(user) {
    if (!user.twoFactorAuth.secret) {
        throw new error_1.UnprocessableEntity(errorDetailsConstants_1.default.NO_2FA);
    }
}
exports.checkIfTwoFactorAuthIsEnabled = checkIfTwoFactorAuthIsEnabled;
function checkIfUserAccountExists(user) {
    if (!user) {
        throw new error_1.NotFound(errorDetailsConstants_1.default.USER_NOT_FOUND);
    }
}
exports.checkIfUserAccountExists = checkIfUserAccountExists;
function checkIfUserWithGivenUsernameExists(user) {
    if (!user) {
        throw new error_1.NotAuthenticated(errorDetailsConstants_1.default.USER_NOT_FOUND);
    }
}
exports.checkIfUserWithGivenUsernameExists = checkIfUserWithGivenUsernameExists;
function checkIfPasswordsMatch(existingPassword, givenPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordsMatch = yield bcryptjs_1.default.compare(givenPassword, existingPassword);
        if (!passwordsMatch) {
            throw new error_1.NotAuthenticated(errorDetailsConstants_1.default.INVALID_PASSWORD);
        }
    });
}
exports.checkIfPasswordsMatch = checkIfPasswordsMatch;
function checkIfUserAccountIsNotConfirmed(currentConfirmationLevel) {
    const accountNotConfirmed = currentConfirmationLevel === confirmation_levels_1.default.PENDING;
    if (accountNotConfirmed) {
        throw new error_1.NotAuthenticated(errorDetailsConstants_1.default.ACCOUNT_NOT_CONFIRMED);
    }
}
exports.checkIfUserAccountIsNotConfirmed = checkIfUserAccountIsNotConfirmed;
