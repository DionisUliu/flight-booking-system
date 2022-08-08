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
const controller = __importStar(require("./tickets.controller"));
const validateObjectId_1 = __importDefault(require("../../middleware/validateObjectId"));
const isAuthorized_1 = __importDefault(require("../../middleware/isAuthorized"));
const router = (0, express_1.Router)();
/**
 * Get all tickets.
 *
 * @openapi
 *
 * /tickets:
 *   get:
 *     tags:
 *       - "Tickets"
 *     summary: "Get all tickets"
 *     description: ""
 *     parameters: []
 *     responses:
 *       "200":
 *         description: "List of bookings displayed"
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 $ref: "#/components/schemas/Ticket"
 *       "401":
 *         description: "Not authenticated"
 *       "400":
 *         description: "You requests contain invalid or missing data"
 *       "500":
 *         description: "Internal server error"
 *     security:
 *       - bearerAuth: []
 */
router.get('/', [passport_1.default.authenticate('jwt', { session: false }), isAuthorized_1.default], controller.getAllTickets);
/**
 * Create new ticket.
 *
 * @openapi
 *
 * /tiskets:
 *   post:
 *     tags:
 *       - "Tickets"
 *     summary: "Create a ticket"
 *     requestBody:
 *       description: "Flight that needs to be booked by an individual"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               seatNumber:
 *                 type: "number"
 *                 required: true
 *               confirmationNumber:
 *                 type: "string"
 *                 required: true
 *               user:
 *                 type: "string"
 *                 required: true
 *               price:
 *                 type: "number"
 *                 required: true
 *               class:
 *                 type: "string"
 *                 required: true
 *               flight:
 *                 type: "number"
 *                 required: true
 *     responses:
 *       "201":
 *         $ref: "#/components/schemas/Ticket"
 *       "401":
 *           $ref: "#/components/responses/401"
 *       "400":
 *         $ref: "#/components/responses/400"
 *       "500":
 *         $ref: "#/components/responses/500"
 *     security:
 *       - bearerAuth: []
 */
router.post('/', passport_1.default.authenticate('jwt', { session: false }), controller.addNewTicket);
/**
 * Delete ticket.
 *
 * @openapi
 *
 * /tickets/{id}:
 *   delete:
 *     tags:
 *       - "Tickets"
 *     summary: "Cancel ticket"
 *     description: ""
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         description: "Booking is canceled"
 *         required: true
 *         schema:
 *           type: "string"
 *     responses:
 *       "200":
 *         description: "Booking cancled"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Ticket"
 *       "400":
 *         description: "Invalid ID supplied"
 *       "404":
 *         description: "Booking not found"
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', [passport_1.default.authenticate('jwt', { session: false }), validateObjectId_1.default], controller.deleteTicketById);
exports.default = router;
