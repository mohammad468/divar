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
 *         description: Success
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: get all categories
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: Success
 */