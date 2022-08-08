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
const controller = __importStar(require("./tickets.controller"));
const validateObjectId_1 = __importDefault(require("../../middleware/validateObjectId"));
const router = (0, express_1.Router)();
/**
 * Get all tickets.
 *
 * @openapi
 *
 * paths:
 *   /tickets:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Tickets
 *       summary: Get all tickets
 *       description: Get all tickets.
 *       responses:
 *         200:
 *           description: Tickets were successfully received.
 *           content:
 *             application/json:
 *               schema:
 *                 type: "array"
 *                 items:
 *                   $ref: "#/components/schemas/Tickets"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.get('/', controller.getAllTickets);
/**
 * Create new ticket.
 *
 * @openapi
 *
 * paths:
 *   /tickets:
 *     post:
 *       tags:
 *         - Tickets
 *       summary: Create ticket
 *       description: Adds a new ticket.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - seatNumber
 *                 - user
 *                 - price
 *                 - class
 *                 - flight
 *               properties:
 *                 seatNumber:
 *                   type: number
 *                 user:
 *                   type: string
 *                 price:
 *                   type: number
 *                 class:
 *                   type: string
 *                 flight:
 *                   type: string
 *       responses:
 *         201:
 *           description: Ticket created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Ticket"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.post('/', controller.addNewTicket);
/**
 * Delete ticket.
 *
 * @openapi
 *
 * paths:
 *   /tickets/{id}:
 *     delete:
 *       tags:
 *         - Tickets
 *       summary: Delete ticket by id
 *       description: Delete ticket by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Ticket id
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         204:
 *           description: Ticket deleted successfully.
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.delete('/:id', validateObjectId_1.default, controller.deleteTikcetById);
exports.default = router;
