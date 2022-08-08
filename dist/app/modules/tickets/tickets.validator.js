"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetAllTicketsRequest = exports.validateTicket = void 0;
const joi_1 = __importDefault(require("joi"));
const error_1 = require("../../utils/error");
const validateTicket = (ticket) => {
    const schema = joi_1.default.object()
        .keys({
        seatNumber: joi_1.default.number().min(0).max(2000),
        user: joi_1.default.string().hex().length(24).required(),
        price: joi_1.default.number().min(5).max(10000),
        class: joi_1.default.string().min(1).max(1),
        flight: joi_1.default.string().hex().length(24).required(),
    })
        .required();
    const { error } = schema.validate(ticket);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateTicket = validateTicket;
const validateGetAllTicketsRequest = ({ input }) => {
    const schema = joi_1.default.object().keys({
        user: joi_1.default.string().min(5).max(50),
        fields: joi_1.default.string().min(1).max(150),
    });
    const { error } = schema.validate(input);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateGetAllTicketsRequest = validateGetAllTicketsRequest;
