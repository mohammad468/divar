/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User module and Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       required:
 *         - mobile
 *       properties:
 *         fullName:
 *           type: string
 *         mobile:
 *           type: string
 */

/**
 * @swagger
 * /user/whoami:
 *   get:
 *     summary: Get User Profile
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token (e.g., "Bearer your_token_here")
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get All Users
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token (e.g., "Bearer your_token_here")
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create user
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token (e.g., "Bearer your_token_here")
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/CreateUser"
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateUser"
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete  User
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to delete
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token (e.g., "Bearer your_token_here")
 *     responses:
 *       200:
 *         description: Success
 */