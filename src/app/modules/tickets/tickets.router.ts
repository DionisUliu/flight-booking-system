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
router.delete(
  '/:id',
  [Passport.authenticate('jwt', { session: false }), validateObjectId],
  controller.deleteTicketById,
);

export default router;
