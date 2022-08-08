"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cuid_1 = __importDefault(require("cuid"));
const airportSchema = new mongoose_1.default.Schema({
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
        default: (0, cuid_1.default)(),
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
});
airportSchema.methods.getAirportImportantProperties = function () {
    return {
        name: this.name,
        code: this.code,
        city: this.city,
        state: this.state,
    };
};
const Airport = mongoose_1.default.model('Airport', airportSchema);
exports.default = Airport;
