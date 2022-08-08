"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cuid_1 = __importDefault(require("cuid"));
const ticketSchema = new mongoose_1.default.Schema({
    seatNumber: {
        type: Number,
        required: true,
        min: 0,
        max: 2000,
    },
    confirmationNumber: {
        type: String,
        default: (0, cuid_1.default)(),
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        min: 5,
        max: 10000,
        required: true,
    },
    class: {
        type: String,
        default: 'C',
        required: true,
    },
    flight: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Flight',
        required: true,
    },
});
const Ticket = mongoose_1.default.model('Ticket', ticketSchema);
exports.default = Ticket;
