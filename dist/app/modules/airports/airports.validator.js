"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetAllAirportsRequest = exports.validateAirport = void 0;
const joi_1 = __importDefault(require("joi"));
const error_1 = require("../../utils/error");
const validateAirport = (airport) => {
    const schema = joi_1.default.object()
        .keys({
        name: joi_1.default.string().min(5).max(50).required(),
        city: joi_1.default.string().min(3).max(100).required(),
        state: joi_1.default.string().min(3).max(100).required(),
    })
        .required();
    const { error } = schema.validate(airport);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateAirport = validateAirport;
const validateGetAllAirportsRequest = ({ input }) => {
    const schema = joi_1.default.object().keys({
        name: joi_1.default.string().min(5).max(50),
        fields: joi_1.default.string().min(1).max(150),
    });
    const { error } = schema.validate(input);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateGetAllAirportsRequest = validateGetAllAirportsRequest;
