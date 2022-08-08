"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetAllFlightsRequest = exports.validateFlight = void 0;
const joi_1 = __importDefault(require("joi"));
const error_1 = require("../../utils/error");
const validateFlight = (airplane) => {
    const schema = joi_1.default.object()
        .keys({
        departureDate: joi_1.default.date().iso().required(),
        arrivalDate: joi_1.default.date()
            .iso()
            .greater(joi_1.default.ref('departureDate'))
            .required(),
        durationInHours: joi_1.default.number().max(60).required(),
        durationInMiles: joi_1.default.number().max(1000000).required(),
        departureAirport: joi_1.default.string().hex().length(24).required(),
        arrivalAirport: joi_1.default.string().hex().length(24).required(),
        airplane: joi_1.default.string().hex().length(24).required(),
    })
        .required();
    const { error } = schema.validate(airplane);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateFlight = validateFlight;
const validateGetAllFlightsRequest = ({ input }) => {
    const schema = joi_1.default.object().keys({
        flightNumber: joi_1.default.string().min(5).max(50),
        fields: joi_1.default.string().min(1).max(150),
    });
    const { error } = schema.validate(input);
    if (error) {
        throw new error_1.BadRequest(error.details[0].message);
    }
};
exports.validateGetAllFlightsRequest = validateGetAllFlightsRequest;
