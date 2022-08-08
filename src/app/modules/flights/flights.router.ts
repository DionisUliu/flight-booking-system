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
