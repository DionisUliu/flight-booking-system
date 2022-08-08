"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const var_1 = __importDefault(require("../var"));
mail_1.default.setApiKey(var_1.default.mailServiceApiKey);
const sendEmail = (params) => {
    return new Promise((resolve, reject) => {
        const body = Object.assign(Object.assign({}, params), { from: {
                email: params.from || var_1.default.mailServiceSender,
                name: var_1.default.appName,
            } });
        if (params.attachments) {
            body.attachments = params.attachments;
        }
        mail_1.default.send(body, false, (error, info) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(info);
            }
        });
    });
};
exports.sendEmail = sendEmail;
