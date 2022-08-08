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
const controller = __importStar(require("./flights.controller"));
const validateObjectId_1 = __importDefault(require("../../middleware/validateObjectId"));
const isAuthorized_1 = __importDefault(require("../../middleware/isAuthorized"));
const router = (0, express_1.Router)();
/**
 * Get all flights.
 *
 * @openapi
 *
 * /flights:
 *   get:
 *     tags:
 *       - "Flights"
 *     summary: "Get all flights"
 *     description: ""
 *     responses:
 *       "200":
 *         description: "OK"
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 $ref: "#/components/schemas/Flight"
 *       "400":
 *         $ref: "#/components/responses/400"
 *       "401":
 *         $ref: "#/components/responses/401"
 *       "404":
 *         $ref: "#/components/responses/404"
 *       "500":
 *         $ref: "#/components/responses/500"
 */
router.get('/', passport_1.default.authenticate('jwt', { session: false }), controller.getAllAFlights);
/**
 * Get flight by id.
 *
 * @openapi
 *
 * /flights/{id}:
 *   get:
 *     tags:
 *       - "Flights"
 *     summary: "Get a flight details"
 *     description: ""
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Flight id"
 *         schema:
 *           type: "string"
 *         required: true
 *     responses:
 *       "200":
 *         description: "OK"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Flight"
 *       "400":
 *         $ref: "#/components/responses/400"
 *       "401":
 *         $ref: "#/components/responses/401"
 *       "404":
 *         $ref: "#/components/responses/404"
 *       "500":
 *         $ref: "#/components/responses/500"
 */
router.get('/:id', [passport_1.default.authenticate('jwt', { session: false }), validateObjectId_1.default], controller.getFlightById);
/**
 * Create new flight.
 *
 * @openapi
 *
 * /flights:
 *   post:
 *     tags:
 *       - "Flights"
 *     summary: "Add a new flight"
 *     description: ""
 *     operationId: "addFlight"
 *     requestBody:
 *       description: "New flight added."
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               departureDate:
 *                 type: "string"
 *                 format: "date"
 *               arrivalDate:
 *                 type: "string"
 *                 format: "date"
 *               durationInHours:
 *                 type: "number"
 *               durationInMiles:
 *                 type: "number"
 *               departureAirport:
 *                 type: "string"
 *               arrivalAirport:
 *                 type: "integer"
 *               airplane:
 *                 type: "string"
 *     responses:
 *       "200":
 *         description: "OK"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Flight"
 *       "400":
 *         $ref: "#/components/responses/400"
 *       "401":
 *         $ref: "#/components/responses/401"
 *       "403":
 *         $ref: "#/components/responses/403"
 *       "422":
 *         $ref: "#/components/responses/422"
 *       "500":
 *         $ref: "#/components/responses/500"
 *     security:
 *       - bearerAuth: []
 */
router.post('/', [passport_1.default.authenticate('jwt', { session: false }), isAuthorized_1.default], controller.addNewFlight);
/**
 * Update flight.
 *
 * @openapi
 *
 * /flights/{id}:
 *   put:
 *     tags:
 *       - "Flights"
 *     summary: "Update an existing flight"
 *     description: ""
 *     operationId: "updateFlight"
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         description: "Flight id"
 *         schema:
 *           type: "string"
 *         required: true
 *     requestBody:
 *       description: "Flight object that needs to be updated"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               departureDate:
 *                 type: "data"
 *               arrivalDate:
 *                 type: "string"
 *               durationInHours:
 *                 type: "string"
 *               durationInMiles:
 *                 type: "string"
 *               departureAirport:
 *                 type: "string"
 *               arrivalAirport:
 *                 type: "integer"
 *               airplane:
 *                 type: "string"
 *     responses:
 *       "200":
 *         description: "OK"
 *       "400":
 *         $ref: "#/components/responses/400"
 *       "401":
 *         $ref: "#/components/responses/401"
 *       "403":
 *         $ref: "#/components/responses/403"
 *       "404":
 *         $ref: "#/components/responses/404"
 *       "500":
 *         $ref: "#/components/responses/500"
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', [
    passport_1.default.authenticate('jwt', { session: false }),
    isAuthorized_1.default,
    validateObjectId_1.default,
], controller.updateFlight);
/**
 * Delete flight.
 *
 * @openapi
 *
 * /flights/{id}:
 *   delete:
 *     tags:
 *       - "Flights"
 *     summary: "Deletes a flight"
 *     description: ""
 *     operationId: "deleteFlight"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Flight id to delete"
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: "string"
 *     responses:
 *       "204":
 *         description: "Flight successfully deleted"
 *       "400":
 *         $ref: "#/components/responses/400"
 *       "401":
 *         $ref: "#/components/responses/401"
 *       "403":
 *         $ref: "#/components/responses/403"
 *       "404":
 *         $ref: "#/components/responses/404"
 *       "500":
 *         $ref: "#/components/responses/500"
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', [
    passport_1.default.authenticate('jwt', { session: false }),
    isAuthorized_1.default,
    validateObjectId_1.default,
], controller.deleteFlightById);
exports.default = router;
