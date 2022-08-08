import { Router } from 'express';
import Passport from 'passport';
import isAuthorized from '../../middleware/isAuthorized';
import * as controller from './users.controller';
const router = Router();

/**
 * Get all users.
 *
 * @openapi
 *
 * /users:
 *   get:
 *     tags:
 *       - "User"
 *     summary: "Get all users"
 *     description: "Admin can get list of all users"
 *     parameters: []
 *     responses:
 *       "200":
 *         description: "Users read successfully."
 *       "400":
 *         $ref: "#/components/responses/400"
 *       "401":
 *         $ref: "#/components/responses/401"
 *       "403":
 *         $ref: "#/components/responses/403"
 *       "500":
 *         $ref: "#/components/responses/500"
 *     security:
 *       - bearerAuth: []
 */
router.get(
  '/',
  [Passport.authenticate('jwt', { session: false }), isAuthorized],
  controller.getAllUsers,
);

/**
 * Get user profile.
 *
 * @openapi
 *
 * /users/me:
 *   parameters:
 *     - in: path
 *       name: id
 *       description: User ID
 *       required: true
 *       schema:
 *         type: "string"
 *   get:
 *     tags:
 *       - "User"
 *     summary: "Get my profile"
 *     description: "Get my profile details"
 *     responses:
 *       "200":
 *         description: "User read successfully"
 *       "401":
 *         $ref: "#/components/responses/401"
 *       "500":
 *         $ref: "#/components/responses/500"
 */
router.get(
  '/me',
  Passport.authenticate('jwt', { session: false }),
  controller.getProfile,
);

/**
 * Update user profile.
 *
 * @openapi
 * /users/me:
 *   patch:
 *     tags:
 *       - "User"
 *     summary: "Update profile"
 *     description: "Update existing profile details"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User Id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "User updated successfully"
 *       "401":
 *         $ref: "#/components/responses/401"
 *       "404":
 *         $ref: "#/components/responses/404"
 *       "422":
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *         "500":
 *           $ref: "#/components/responses/500"
 */
router.patch(
  '/me',
  Passport.authenticate('jwt', { session: false }),
  controller.updateProfile,
);

export default router;
