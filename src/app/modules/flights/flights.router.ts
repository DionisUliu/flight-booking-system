import { Router } from 'express';
import Passport from 'passport';
import * as controller from './flights.controller';
import validateObjectId from '../../middleware/validateObjectId';
import isAuthorized from '../../middleware/isAuthorized';
const router = Router();

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
router.get(
  '/',
  Passport.authenticate('jwt', { session: false }),
  controller.getAllAFlights,
);

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
router.get(
  '/:id',
  [Passport.authenticate('jwt', { session: false }), validateObjectId],
  controller.getFlightById,
);

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
router.post(
  '/',
  [Passport.authenticate('jwt', { session: false }), isAuthorized],
  controller.addNewFlight,
);

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
router.put(
  '/:id',
  [
    Passport.authenticate('jwt', { session: false }),
    isAuthorized,
    validateObjectId,
  ],

  controller.updateFlight,
);
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
router.delete(
  '/:id',
  [
    Passport.authenticate('jwt', { session: false }),
    isAuthorized,
    validateObjectId,
  ],

  controller.deleteFlightById,
);
export default router;
