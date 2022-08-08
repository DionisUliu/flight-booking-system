"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        min: 2,
        max: 150,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 150,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 150,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
    confirmationLevel: {
        type: Number,
        required: true,
    },
    confirmationToken: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    twoFactorAuth: {
        type: {
            active: {
                type: Boolean,
                required: true,
                default: false,
            },
            secret: {
                type: {
                    ascii: { type: 'String' },
                    hex: { type: 'String' },
                    base32: { type: 'String' },
                    otpauth_url: { type: 'String' },
                },
                required: false,
            },
        },
        required: false,
    },
}, {
    timestamps: true,
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
