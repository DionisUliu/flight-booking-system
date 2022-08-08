"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetAllAirplanesRequest = exports.validateAirplane = void 0;
const joi_1 = __importDefault(require("joi"));
const error_1 = require("../../utils/error");
const validateAirplane = (airplane) => {
    const schema = joi_1.default.object()
        .keys({
        name: joi_1.default.string().min(5).max(50).required(),
        seats: joi_1.default.number().min(5).max(200).required(),
        fuelCapacity: joi_1.default.number().min(500).max(2000).required(),
    })
        .required();
    const { error } = schema.validate(airplane);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateAirplane = validateAirplane;
const validateGetAllAirplanesRequest = ({ input }) => {
    const schema = joi_1.default.object().keys({
        name: joi_1.default.string().min(5).max(50),
        fields: joi_1.default.string().min(1).max(150),
    });
    const { error } = schema.validate(input);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateGetAllAirplanesRequest = validateGetAllAirplanesRequest;
