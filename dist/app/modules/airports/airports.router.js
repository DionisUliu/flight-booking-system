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
const validateObjectId_1 = __importDefault(require("../../middleware/validateObjectId"));
const controller = __importStar(require("./airports.controller"));
const router = (0, express_1.Router)();
/**
 * Get all airports.
 *
 * @openapi
 *
 * paths:
 *   /airports:
 *     get:
 *       tags:
 *         - Airports
 *       summary: Get all airports
 *       description: Get all airports.
 *       responses:
 *         200:
 *           description: Airports were successfully received.
 *           content:
 *             application/json:
 *               schema:
 *                 type: "array"
 *                 items:
 *                   $ref: "#/components/schemas/Airport"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.get('/', controller.getAllAirports);
/**
 * Get airport by id.
 *
 * @openapi
 *
 * paths:
 *   /airports/{id}:
 *     get:
 *       tags:
 *         - Airports
 *       summary: Get airport by id
 *       description: Get airport by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airport id
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         200:
 *           description: Airport was received successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: "array"
 *                 items:
 *                   $ref: "#/components/schemas/Airport"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.get('/:id', validateObjectId_1.default, controller.getAirportById);
/**
 * Create new airport.
 *
 * @openapi
 *
 * paths:
 *   /airports:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airports
 *       summary: Create airport
 *       description: Adds a new airport.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - name
 *                 - city
 *                 - state
 *               properties:
 *                 name:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *       responses:
 *         201:
 *           description: Airport created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Airport"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.post('/', controller.addNewAirport);
/**
 * Update airport.
 *
 * @openapi
 *
 * paths:
 *   /airports/{id}:
 *     put:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airports
 *       summary: Upadate airport by id
 *       description: Update airport by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airport id
 *           schema:
 *             type: "string"
 *             required: true
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - name
 *                 - city
 *                 - state
 *               properties:
 *                 name:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *       responses:
 *         204:
 *           description: Airport updated successfully.
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.put('/:id', validateObjectId_1.default, controller.updateAirport);
/**
 * Delete airport.
 *
 * @openapi
 *
 * paths:
 *   /airports/{id}:
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airports
 *       summary: Delete airport by id (Admin only)
 *       description: Delete airport by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airport id
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         204:
 *           description: Airport deleted successfully.
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.delete('/:id', validateObjectId_1.default, controller.deleteAirportById);
exports.default = router;
