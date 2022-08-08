import { Router } from 'express';
import Passport from 'passport';
import * as controller from './tickets.controller';
import validateObjectId from '../../middleware/validateObjectId';
import isAuthorized from '../../middleware/isAuthorized';
const router = Router();

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
router.get(
  '/',
  [Passport.authenticate('jwt', { session: false }), isAuthorized],
  controller.getAllTickets,
);

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
router.post(
  '/',
  Passport.authenticate('jwt', { session: false }),
  controller.addNewTicket,
);

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
router.delete(
  '/:id',
  [Passport.authenticate('jwt', { session: false }), validateObjectId],
  controller.deleteTicketById,
);

export default router;
