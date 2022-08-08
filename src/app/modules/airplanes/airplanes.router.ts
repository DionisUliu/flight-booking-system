import { Router } from 'express';
import Passport from 'passport';
import * as controller from './airplanes.controller';
import validateObjectId from '../../middleware/validateObjectId';
import isAuthorized from '../../middleware/isAuthorized';
const router = Router();

/**
 * Get all airplanes.
 *
 * @openapi
 *
 * paths:
 *   /airplanes:
 *     get:
 *       tags:
 *         - Airplanes
 *       summary: Get all airplanes
 *       description: Get all airplanes.
 *       responses:
 *         200:
 *           description: Airplanes were successfully received.
 *           content:
 *             application/json:
 *               schema:
 *                 type: "array"
 *                 items:
 *                   $ref: "#/components/schemas/Airplane"
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
  controller.getAllAirplanes,
);

/**
 * Get airplane by id.
 *
 * @openapi
 *
 * paths:
 *   /airplanes/{id}:
 *     get:
 *       tags:
 *         - Airplanes
 *       summary: Get airplane by id
 *       description: Get airplane by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airplane id
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         200:
 *           description: Airplane found successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Airplane"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         404:
 *           $ref: "#/components/responses/404"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.get(
  '/:id',
  [Passport.authenticate('jwt', { session: false }), validateObjectId],
  controller.getAirplaneById,
);

/**
 * Add new airplane.
 *
 * @openapi
 *
 * paths:
 *   /airplanes:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airplanes
 *       summary: Create airplane
 *       description: Adds a new airplane.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - name
 *                 - seats
 *                 - fuelCapacity
 *               properties:
 *                 name:
 *                   type: string
 *                 seats:
 *                   type: number
 *                 fuelCapacity:
 *                   type: number
 *       responses:
 *         201:
 *           description: Airplane created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Airplane"
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
  controller.addNewAirplane,
);

/**
 * Update airplane.
 *
 * @openapi
 *
 * paths:
 *   /airplanes/{id}:
 *     put:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airplanes
 *       summary: Upadate airplane by id
 *       description: Update airplane by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airplane id
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         204:
 *           description: Airplane updated successfully.
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
  controller.updateAirplane,
);

/**
 * Delete airplane.
 *
 * @openapi
 *
 * paths:
 *   /airplanes/{id}:
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airplanes
 *       summary: Delete airplane by id
 *       description: Delete airplane by id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airplane id
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         204:
 *           description: Airplane deleted successfully.
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
  controller.deleteAirplaneById,
);

export default router;
