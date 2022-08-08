import { Router } from 'express';
import Passport from 'passport';
import isAuthorized from '../../middleware/isAuthorized';
import validateObjectId from '../../middleware/validateObjectId';
import * as controller from './airports.controller';
const router = Router();

/**
 * Get all airports.
 *
 * @openapi
 *
 * paths:
 *   /airports:
 *     get:
 *       tags:
 *         - Airports
 *       summary: Get all airports
 *       description: Get all airports.
 *       responses:
 *         200:
 *           description: Airports were successfully received.
 *           content:
 *             application/json:
 *               schema:
 *                 type: "array"
 *                 items:
 *                   $ref: "#/components/schemas/Airport"
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
  controller.getAllAirports,
);

/**
 * Get airport by id.
 *
 * @openapi
 *
 * paths:
 *   /airports/{id}:
 *     get:
 *       tags:
 *         - Airports
 *       summary: Get airport by id
 *       description: Get airport by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airport id
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         200:
 *           description: Airport was received successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: "array"
 *                 items:
 *                   $ref: "#/components/schemas/Airport"
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
  controller.getAirportById,
);

/**
 * Create new airport.
 *
 * @openapi
 *
 * paths:
 *   /airports:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airports
 *       summary: Create airport
 *       description: Adds a new airport.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - name
 *                 - city
 *                 - state
 *               properties:
 *                 name:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *       responses:
 *         201:
 *           description: Airport created successfully.
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
  controller.addNewAirport,
);

/**
 * Update airport.
 *
 * @openapi
 *
 * paths:
 *   /airports/{id}:
 *     put:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airports
 *       summary: Upadate airport by id
 *       description: Update airport by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airport id
 *           schema:
 *             type: "string"
 *             required: true
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - name
 *                 - city
 *                 - state
 *               properties:
 *                 name:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
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
  controller.updateAirport,
);

/**
 * Delete airport.
 *
 * @openapi
 *
 * paths:
 *   /airports/{id}:
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airports
 *       summary: Delete airport by id (Admin only)
 *       description: Delete airport by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airport id
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         204:
 *           description: Airport deleted successfully.
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
  controller.deleteAirportById,
);

export default router;
