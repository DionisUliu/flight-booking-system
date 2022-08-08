"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cuid_1 = __importDefault(require("cuid"));
const flightsSchema = new mongoose_1.default.Schema({
    flightNumber: {
        type: String,
        default: (0, cuid_1.default)(),
    },
    departureDate: {
        type: Date,
        required: true,
    },
    arrivalDate: {
        type: Date,
        required: true,
    },
    durationInHours: {
        type: Number,
        max: 60,
        required: true,
    },
    durationInMiles: {
        type: Number,
        max: 1000000,
        required: true,
    },
    departureAirport: {
        type: new mongoose_1.default.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50,
            },
            code: {
                type: String,
                min: 10,
                max: 200,
                required: true,
            },
            city: {
                type: String,
                required: true,
                min: 3,
                max: 100,
            },
            state: {
                type: String,
                required: true,
                min: 3,
                max: 100,
            },
        }),
        required: true,
    },
    arrivalAirport: {
        type: new mongoose_1.default.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50,
            },
            code: {
                type: String,
                min: 10,
                max: 200,
                required: true,
            },
            city: {
                type: String,
                required: true,
                min: 3,
                max: 100,
            },
            state: {
                type: String,
                required: true,
                min: 3,
                max: 100,
            },
        }),
        required: true,
    },
    totalAmountOfTickets: {
        type: Number,
        min: 30,
        max: 2000,
        required: true,
    },
    availableSeatNumbers: {
        type: [Number],
        required: true,
    },
    airplane: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Airplane',
        required: true,
    },
});
const Flight = mongoose_1.default.model('Flight', flightsSchema);
exports.default = Flight;
