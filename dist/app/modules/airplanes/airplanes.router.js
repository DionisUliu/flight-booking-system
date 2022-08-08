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
const controller = __importStar(require("./airplanes.controller"));
const validateObjectId_1 = __importDefault(require("../../middleware/validateObjectId"));
const isAuthorized_1 = __importDefault(require("../../middleware/isAuthorized"));
const router = (0, express_1.Router)();
/**
 * Get all airplanes.
 *
 * @openapi
 *
 * /airplanes:
 *   get:
 *     tags:
 *       - "Airplanes"
 *     summary: "Get all airplanes"
 *     description: ""
 *     responses:
 *       "200":
 *         description: ""
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 $ref: "#/components/schemas/Airplane"
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
router.get('/', passport_1.default.authenticate('jwt', { session: false }), controller.getAllAirplanes);
/**
 * Get airplane by id.
 *
 * @openapi
 *
 * /airplanes/{id}:
 *   get:
 *     tags:
 *       - "Airplanes"
 *     summary: "Get an airplane details"
 *     description: ""
 *     operationId: "findAirplanesByTags"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Airplane id"
 *         schema:
 *           type: "string"
 *         required: true
 *     responses:
 *       "200":
 *         description: ""
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Airplane"
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
router.get('/:id', [passport_1.default.authenticate('jwt', { session: false }), validateObjectId_1.default], controller.getAirplaneById);
/**
 * Add new airplane.
 *
 * @openapi
 *
 * /airplanes:
 *   post:
 *     tags:
 *       - "Airplanes"
 *     summary: "Add a new Airplane"
 *     description: ""
 *     operationId: "addAirplane"
 *     requestBody:
 *       description: "New airplane added."
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               name:
 *                 type: "string"
 *               seats:
 *                 type: "number"
 *               fuelCapacity:
 *                 type: "number"
 *     responses:
 *       "200":
 *         description: ""
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Airplane"
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
router.post('/', [passport_1.default.authenticate('jwt', { session: false }), isAuthorized_1.default], controller.addNewAirplane);
/**
 * Update airplane.
 *
 * @openapi
 *
 * /airplanes/{id}:
 *   put:
 *     tags:
 *       - "Airplanes"
 *     summary: "Update an existing airplanes"
 *     description: ""
 *     operationId: "updateAirplanes"
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         description: "Airplane id"
 *         schema:
 *           type: "string"
 *         required: true
 *     requestBody:
 *       description: "Airplane object that needs to be updated"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               name:
 *                 type: "string"
 *               seats:
 *                 type: "number"
 *               fuelCapacity:
 *                 type: "number"
 *     responses:
 *       "200":
 *         description: ""
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Airplane"
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
], controller.updateAirplane);
/**
 * Delete airplane.
 *
 * @openapi
 *
 * /airplanes/{id}:
 *   delete:
 *     tags:
 *       - "Airplanes"
 *     summary: "Deletes an airplane"
 *     description: ""
 *     operationId: "deleteAirplanes"
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         description: "Airplane id to delete"
 *         required: true
 *         schema:
 *           type: "string"
 *     responses:
 *       "204":
 *         description: "Airplane successfully deleted"
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
], controller.deleteAirplaneById);
exports.default = router;
