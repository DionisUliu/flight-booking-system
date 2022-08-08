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
const controller = __importStar(require("./airplanes.controller"));
const validateObjectId_1 = __importDefault(require("../../middleware/validateObjectId"));
const router = (0, express_1.Router)();
/**
 * Get all airplanes.
 *
 * @openapi
 *
 * paths:
 *   /airplanes:
 *     get:
 *       tags:
 *         - Airplanes
 *       summary: Get all airplanes
 *       description: Get all airplanes.
 *       responses:
 *         200:
 *           description: Airplanes were successfully received.
 *           content:
 *             application/json:
 *               schema:
 *                 type: "array"
 *                 items:
 *                   $ref: "#/components/schemas/Airplane"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.get('/', controller.getAllAirplanes);
/**
 * Get airplane by id.
 *
 * @openapi
 *
 * paths:
 *   /airplanes/{id}:
 *     get:
 *       tags:
 *         - Airplanes
 *       summary: Get airplane by id
 *       description: Get airplane by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airplane id
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         200:
 *           description: Airplane found successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Airplane"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         404:
 *           $ref: "#/components/responses/404"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.get('/:id', validateObjectId_1.default, controller.getAirplaneById);
/**
 * Add new airplane.
 *
 * @openapi
 *
 * paths:
 *   /airplanes:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airplanes
 *       summary: Create airplane
 *       description: Adds a new airplane.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - name
 *                 - seats
 *                 - fuelCapacity
 *               properties:
 *                 name:
 *                   type: string
 *                 seats:
 *                   type: number
 *                 fuelCapacity:
 *                   type: number
 *       responses:
 *         201:
 *           description: Airplane created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Airplane"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.post('/', controller.addNewAirplane);
/**
 * Update airplane.
 *
 * @openapi
 *
 * paths:
 *   /airplanes/{id}:
 *     put:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airplanes
 *       summary: Upadate airplane by id
 *       description: Update airplane by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airplane id
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         204:
 *           description: Airplane updated successfully.
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.put('/:id', validateObjectId_1.default, controller.updateAirplane);
/**
 * Delete airplane.
 *
 * @openapi
 *
 * paths:
 *   /airplanes/{id}:
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airplanes
 *       summary: Delete airplane by id
 *       description: Delete airplane by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airplane id
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         204:
 *           description: Airplane deleted successfully.
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.delete('/:id', validateObjectId_1.default, controller.deleteAirplaneById);
exports.default = router;
