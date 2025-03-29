/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Category module and Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategory:
 *       type: object
 *       required:
 *         - name
 *         - icon
 *       properties:
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *         icon:
 *           type: string
 *         parent:
 *           type: string
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create new category
 *     tags:
 *       - Category
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your-token-here
 *         description: Bearer token for authentication
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/CreateCategory"
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateCategory"
 *     responses:
 *       200:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories (children and parent structure)
 *     tags:
 *       - Category
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your-token-here
 *         description: Bearer token for authentication
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /category/all:
 *   get:
 *     summary: Get all categories list
 *     tags:
 *       - Category
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your-token-here
 *         description: Bearer token for authentication
 *     responses:
 *       200:
 *         description: Categories list retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get category with id
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to retrieve
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer your-token-here
 *         description: Bearer token for authentication
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete category with id
 *     tags:
 *       - Category
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
 *           example: Bearer your-token-here
 *         description: Bearer token for authentication
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
