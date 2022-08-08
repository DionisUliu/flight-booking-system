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
