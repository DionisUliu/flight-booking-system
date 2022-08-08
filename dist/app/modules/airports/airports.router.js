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
const validateObjectId_1 = __importDefault(require("../../middleware/validateObjectId"));
const controller = __importStar(require("./airports.controller"));
const router = (0, express_1.Router)();
/**
 * Get all airports.
 *
 * @openapi
 *
 * /airports:
 *   get:
 *     tags:
 *       - "Airports"
 *     summary: "Get all airports"
 *     description: ""
 *     responses:
 *       "200":
 *         description: "successfull operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 $ref: "#/components/schemas/Airport"
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
router.get('/', passport_1.default.authenticate('jwt', { session: false }), controller.getAllAirports);
/**
 * Get airport by id.
 *
 * @openapi
 *
 * /airports/{id}:
 *   get:
 *     tags:
 *       - "Airports"
 *     summary: "Get an airport details"
 *     description: ""
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Airport id"
 *         schema:
 *           type: "string"
 *         required: true
 *     responses:
 *       "200":
 *         description: "OK"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Airport"
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
router.get('/:id', [passport_1.default.authenticate('jwt', { session: false }), validateObjectId_1.default], controller.getAirportById);
/**
 * Create new airport.
 *
 * @openapi
 *
 * /airports:
 *   post:
 *     tags:
 *       - "Airports"
 *     summary: "Add a new airport"
 *     description: ""
 *     requestBody:
 *       description: "New airport added."
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               name:
 *                 type: "string"
 *               address:
 *                 type: "object"
 *                 properties:
 *                   name:
 *                     type: "string"
 *                   city:
 *                     type: "string"
 *                   state:
 *                     type: "string"
 *     responses:
 *       "200":
 *         description: ""
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Airport"
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
router.post('/', [passport_1.default.authenticate('jwt', { session: false }), isAuthorized_1.default], controller.addNewAirport);
/**
 * Update airport.
 *
 * @openapi
 *
 * /airports/{id}:
 *   put:
 *     tags:
 *       - "Airports"
 *     summary: "Update an existing airport"
 *     description: ""
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Airport id"
 *         schema:
 *           type: "string"
 *         required: true
 *     requestBody:
 *       description: "Airport object that needs to be updated"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               name:
 *                 type: "string"
 *               address:
 *                 type: "object"
 *                 properties:
 *                   name:
 *                     type: "string"
 *                   city:
 *                     type: "string"
 *                   state:
 *                     type: "string"
 *     responses:
 *       "200":
 *         description: "OK"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Airport"
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
], controller.updateAirport);
/**
 * Delete airport.
 *
 * @openapi
 *
 * /airports/{id}:
 *   delete:
 *     tags:
 *       - "Airports"
 *     summary: "Deletes an airport"
 *     description: ""
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         description: "Airport id to delete"
 *         required: true
 *         schema:
 *           type: "string"
 *     responses:
 *       "204":
 *         description: "Airport successfully deleted"
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
], controller.deleteAirportById);
exports.default = router;
