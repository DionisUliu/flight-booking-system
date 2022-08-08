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
 * paths:
 *   /users:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Users
 *       summary: Get all users
 *       description: Get all users.
 *       responses:
 *         200:
 *           description: Users were successfully received.
 *           content:
 *             application/json:
 *               schema:
 *                 type: "array"
 *                 items:
 *                   $ref: "#/components/schemas/Users"
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
  controller.getAllUsers,
);

/**
 * Get user profile.
 *
 * @openapi
 *
 * paths:
 *   /users/me:
 *     get:
 *       tags:
 *         - Users
 *       summary: Get user profile
 *       description: Get user profile.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: User id
 *           schema:
 *             type: "string"
 *             required: true
 *       responses:
 *         200:
 *           description: Profile were successfully received.
 *           content:
 *             application/json:
 *               schema:
 *                 type: "array"
 *                 items:
 *                   $ref: "#/components/schemas/User"
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
  '/me',
  Passport.authenticate('jwt', { session: false }),
  controller.getProfile,
);

/**
 * Update user profile.
 *
 * @openapi
 *
 * paths:
 *   /users/me:
 *     patch:
 *       tags:
 *         - Users
 *       summary: Update user profile
 *       description: Update user profile.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: User id
 *           schema:
 *             type: "string"
 *             required: true
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - firstName
 *                 - lastName
 *                 - email
 *                 - password
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phoneNumber:
 *                   type: number
 *       responses:
 *         200:
 *           description: User profile updated successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: "array"
 *                 items:
 *                   $ref: "#/components/schemas/User"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.patch(
  '/me',
  Passport.authenticate('jwt', { session: false }),
  controller.updateProfile,
);

export default router;
