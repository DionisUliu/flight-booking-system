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
const controller = __importStar(require("./flights.controller"));
const validateObjectId_1 = __importDefault(require("../../middleware/validateObjectId"));
const router = (0, express_1.Router)();
/**
 * Get all flights.
 *
 * @openapi
 *
 * paths:
 *   /airports:
 *     get:
 *       tags:
 *         - Flights
 *       summary: Get all flights
 *       description: Get all flights.
 *       responses:
 *         200:
 *           description: Flights were successfully received.
 *           content:
 *             application/json:
 *               schema:
 *                 type: "array"
 *                 items:
 *                   $ref: "#/components/schemas/Flights"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.get('/', controller.getAllAFlights);
/**
 * Get flight by id.
 *
 * @openapi
 *
 * paths:
 *   /flights/{id}:
 *     get:
 *       tags:
 *         - Flights
 *       summary: Get flight by id
 *       description: Get flight by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Flight id
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         200:
 *           description: Flight was received successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: "array"
 *                 items:
 *                   $ref: "#/components/schemas/Flight"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.get('/:id', validateObjectId_1.default, controller.getFlightById);
/**
 * Create new flight.
 *
 * @openapi
 *
 * paths:
 *   /flights:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Flights
 *       summary: Create flight
 *       description: Adds a new flight.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - departureDate
 *                 - arrivalDate
 *                 - durationInHours
 *                 - durationInMiles
 *                 - departureAirport
 *                 - arrivalAirport
 *                 - airplane
 *               properties:
 *                 departureDate:
 *                   type: date
 *                 arrivalDate:
 *                   type: date
 *                 durationInHours:
 *                   type: number
 *                 durationInMiles:
 *                   type: number
 *                 departureAirport:
 *                   type: string
 *                 arrivalAirport:
 *                   type: string
 *                 airplane:
 *                   type: string
 *       responses:
 *         201:
 *           description: Flight created successfully.
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
router.post('/', controller.addNewFlight);
/**
 * Update flight.
 *
 * @openapi
 *
 * paths:
 *   /flights/{id}:
 *     put:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Flights
 *       summary: Upadate flight by id
 *       description: Update flight by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Flight id
 *           schema:
 *             type: "string"
 *             required: true
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - departureDate
 *                 - arrivalDate
 *                 - durationInHours
 *                 - durationInMiles
 *                 - departureAirport
 *                 - arrivalAirport
 *                 - airplane
 *               properties:
 *                 departureDate:
 *                   type: date
 *                 arrivalDate:
 *                   type: date
 *                 durationInHours:
 *                   type: number
 *                 durationInMiles:
 *                   type: number
 *                 departureAirport:
 *                   type: string
 *                 arrivalAirport:
 *                   type: string
 *                 airplane:
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
router.put('/:id', validateObjectId_1.default, controller.updateFlight);
/**
 * Delete flight.
 *
 * @openapi
 *
 * paths:
 *   /flights/{id}:
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Flights
 *       summary: Delete flight by id
 *       description: Delete flight by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Flight id
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         204:
 *           description: Flight deleted successfully.
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.delete('/:id', validateObjectId_1.default, controller.deleteFlightById);
exports.default = router;
