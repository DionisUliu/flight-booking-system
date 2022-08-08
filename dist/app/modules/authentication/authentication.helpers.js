"use strict";
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
exports.sendEmailWithResetPasswordLink = exports.sendConfirmationEmail = void 0;
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const inline_css_1 = __importDefault(require("inline-css"));
const url_utils_1 = require("../../helpers/url_utils");
const mail_1 = __importDefault(require("../../config/mail"));
const sendConfirmationEmail = ({ user, redirectUrl }) => __awaiter(void 0, void 0, void 0, function* () {
    const confirmationURL = (0, url_utils_1.getRedirectUrl)(redirectUrl, `token=${user.confirmationToken}`);
    const name = user.firstName;
    const emailContent = yield ejs_1.default.renderFile(path_1.default.resolve(__dirname, '../../../../src/templates/mail/account_confirmation.ejs'), {
        user: name || '',
        confirmationLink: confirmationURL,
    });
    const html = yield (0, inline_css_1.default)(emailContent, {
        url: ' ',
        applyStyleTags: true,
    });
    yield mail_1.default.sendEmail({
        to: user.email,
        subject: 'Account Confirmation',
        html,
    });
});
exports.sendConfirmationEmail = sendConfirmationEmail;
const sendEmailWithResetPasswordLink = ({ user, redirectUrl, }) => __awaiter(void 0, void 0, void 0, function* () {
    const emailContent = yield ejs_1.default.renderFile(path_1.default.resolve(__dirname, '../../../../src/templates/mail/reset_password_instructions.ejs'), {
        user: user.firstName,
        resetPasswordUrl: (0, url_utils_1.getRedirectUrl)(redirectUrl, `token=${user.confirmationToken}`),
    });
    const html = yield (0, inline_css_1.default)(emailContent, {
        url: ' ',
        applyStyleTags: true,
    });
    yield mail_1.default.sendEmail({
        to: user.email,
        subject: 'Reset Password Instructions',
        html,
    });
});
exports.sendEmailWithResetPasswordLink = sendEmailWithResetPasswordLink;
