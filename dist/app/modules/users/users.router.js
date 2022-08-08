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
 * /users:
 *   get:
 *     tags:
 *       - "User"
 *     summary: "Get all users"
 *     description: "Admin can get list of all users"
 *     parameters: []
 *     responses:
 *       "200":
 *         description: "Users read successfully."
 *       "400":
 *         $ref: "#/components/responses/400"
 *       "401":
 *         $ref: "#/components/responses/401"
 *       "403":
 *         $ref: "#/components/responses/403"
 *       "500":
 *         $ref: "#/components/responses/500"
 *     security:
 *       - bearerAuth: []
 */
router.get('/', [passport_1.default.authenticate('jwt', { session: false }), isAuthorized_1.default], controller.getAllUsers);
/**
 * Get user profile.
 *
 * @openapi
 *
 * /users/me:
 *   parameters:
 *     - in: path
 *       name: id
 *       description: User ID
 *       required: true
 *       schema:
 *         type: "string"
 *   get:
 *     tags:
 *       - "User"
 *     summary: "Get my profile"
 *     description: "Get my profile details"
 *     responses:
 *       "200":
 *         description: "User read successfully"
 *       "401":
 *         $ref: "#/components/responses/401"
 *       "500":
 *         $ref: "#/components/responses/500"
 */
router.get('/me', passport_1.default.authenticate('jwt', { session: false }), controller.getProfile);
/**
 * Update user profile.
 *
 * @openapi
 * /users/me:
 *   patch:
 *     tags:
 *       - "User"
 *     summary: "Update profile"
 *     description: "Update existing profile details"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User Id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "User updated successfully"
 *       "401":
 *         $ref: "#/components/responses/401"
 *       "404":
 *         $ref: "#/components/responses/404"
 *       "422":
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *         "500":
 *           $ref: "#/components/responses/500"
 */
router.patch('/me', passport_1.default.authenticate('jwt', { session: false }), controller.updateProfile);
exports.default = router;
