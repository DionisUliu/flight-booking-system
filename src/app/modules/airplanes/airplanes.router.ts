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
