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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const isAuthorized_1 = __importDefault(require("../../middleware/isAuthorized"));
const controller = __importStar(require("./users.controller"));
const router = (0, express_1.Router)();
/**
 * Get all users.
 *
 * @openapi
 *
 * paths:
 *   /users:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Users
 *       summary: Get all users
 *       description: Get all users.
 *       responses:
 *         200:
 *           description: Users were successfully received.
 *           content:
 *             application/json:
 *               schema:
 *                 type: "array"
 *                 items:
 *                   $ref: "#/components/schemas/Users"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.get('/', [passport_1.default.authenticate('jwt', { session: false }), isAuthorized_1.default], controller.getAllUsers);
/**
 * Get user profile.
 *
 * @openapi
 *
 * paths:
 *   /users/me:
 *     get:
 *       tags:
 *         - Users
 *       summary: Get user profile
 *       description: Get user profile.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: User id
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         200:
 *           description: Profile were successfully received.
 *           content:
 *             application/json:
 *               schema:
 *                 type: "array"
 *                 items:
 *                   $ref: "#/components/schemas/User"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.get('/me', passport_1.default.authenticate('jwt', { session: false }), controller.getProfile);
/**
 * Update user profile.
 *
 * @openapi
 *
 * paths:
 *   /users/me:
 *     patch:
 *       tags:
 *         - Users
 *       summary: Update user profile
 *       description: Update user profile.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: User id
 *           schema:
 *             type: "string"
 *             required: true
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - firstName
 *                 - lastName
 *                 - email
 *                 - password
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phoneNumber:
 *                   type: number
 *       responses:
 *         200:
 *           description: User profile updated successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: "array"
 *                 items:
 *                   $ref: "#/components/schemas/User"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.patch('/me', passport_1.default.authenticate('jwt', { session: false }), controller.updateProfile);
exports.default = router;
