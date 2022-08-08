"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const airplaneSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    seats: {
        type: Number,
        required: true,
        min: 5,
        max: 200,
    },
    fuelCapacity: {
        type: Number,
        required: true,
        min: 500,
        max: 2000,
    },
});
const Airplane = mongoose_1.default.model('Airplane', airplaneSchema);
exports.default = Airplane;
