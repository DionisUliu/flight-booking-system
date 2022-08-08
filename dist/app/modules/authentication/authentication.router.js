"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
const controller = __importStar(require("./authentication.controller"));
const router = (0, express_1.Router)();
/**
 * Register new user.
 *
 * @openapi
 *
 * paths:
 *   /register:
 *     post:
 *       tags:
 *         - Authentication
 *       summary: Register user
 *       description: Adds a new user.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - email
 *                 - password
 *                 - firstName
 *                 - lastName
 *                 - phoneNumber
 *                 - redirectUrl
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 redirectUrl:
 *                   type: string
 *       responses:
 *         201:
 *           description: User created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Authentication"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.post('/register', controller.registerUser);
/**
 * Resend confirmation email.
 *
 * @openapi
 *
 * paths:
 *   /resend-confirmation-email:
 *     post:
 *       tags:
 *         - Authentication
 *       summary: Resend confirmation email
 *       description: Resend confirmation email.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - email
 *                 - redirectUrl
 *               properties:
 *                 email:
 *                   type: string
 *                 redirectUrl:
 *                   type: string
 *       responses:
 *         201:
 *           description: Email sent successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Authentication"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.post('/resend-confirmation-email', controller.resendConfirmationEmail);
/**
 * Confirm account.
 *
 * @openapi
 *
 * paths:
 *   /confirmation:
 *     put:
 *       tags:
 *         - Authentication
 *       summary: Confirm account
 *       description: Confirm account.
 *       parameters:
 *         - name: token
 *           in: path
 *           description: confirmation token
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         204:
 *           description: Account confirmed.
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.put('/confirmation', controller.confirmAccount);
/**
 * Login user.
 *
 * @openapi
 *
 * paths:
 *   /login:
 *     post:
 *       tags:
 *         - Authentication
 *       summary: Login user
 *       description: Login user.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         201:
 *           description: User logged in successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Authentication"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.post('/login', controller.logIn);
/**
 * Request new password.
 *
 * @openapi
 *
 * paths:
 *   /request-new-password:
 *     post:
 *       tags:
 *         - Authentication
 *       summary: Request new password
 *       description: Request new password.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - email
 *                 - redirectUrl
 *               properties:
 *                 email:
 *                   type: string
 *                 redirectUrl:
 *                   type: string
 *       responses:
 *         201:
 *           description: Request sent successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Authentication"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.post('/request-new-password', controller.requestNewPassword);
/**
 * Reset password.
 *
 * @openapi
 *
 * paths:
 *   /password:
 *     put:
 *       tags:
 *         - Authentication
 *       summary: Reset password
 *       description: Reset password.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - token
 *                 - password
 *               properties:
 *                 token:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         204:
 *           description: Password reseted successfully.
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.put('/password', controller.resetPassword);
/**
 * Initialize two factor authentication.
 *
 * @openapi
 *
 * paths:
 *   /two-factor-auth/initialization:
 *     put:
 *       tags:
 *         - Authentication
 *       summary: Initialize two factor authentication
 *       description: Initialize two factor authentication.
 *       responses:
 *         204:
 *           description: QR code generated successfully.
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.put('/two-factor-auth/initialization', passport_1.default.authenticate('jwt', { session: false }), controller.initTwoFactorAuthentication);
/**
 * Activate two factor authentication.
 *
 * @openapi
 *
 * paths:
 *   /two-factor-auth/activation:
 *     put:
 *       tags:
 *         - Authentication
 *       summary: Activate two factor authentication
 *       description: Activate two factor authentication.
 *       parameters:
 *         - name: token
 *           in: path
 *           description: activation token
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         204:
 *           description: 2FA activated.
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.put('/two-factor-auth/activation', passport_1.default.authenticate('jwt', { session: false }), controller.completeTwoFactorAuthentication);
/**
 * Verificate two factor authentication.
 *
 * @openapi
 *
 * paths:
 *   /two-factor-auth/verification:
 *     head:
 *       tags:
 *         - Authentication
 *       summary: Verificate two factor authentication
 *       description: Verificate two factor authentication.
 *       parameters:
 *         - name: token
 *           in: path
 *           description: verification token
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         204:
 *           description: 2FA verificated.
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.head('/two-factor-auth/verification', passport_1.default.authenticate('jwt', { session: false }), controller.verifyTwoFactorAuthToken);
exports.default = router;
