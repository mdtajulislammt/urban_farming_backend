import express from "express";
import { MarketplaceController } from "./marketplace.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateProductInput:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *         - available_quantity
 *       properties:
 *         name:
 *           type: string
 *           example: "Fresh Organic Tomato"
 *         description:
 *           type: string
 *           example: "Grown without pesticides"
 *         price:
 *           type: number
 *           example: 120
 *         category:
 *           type: string
 *           example: "Vegetables"
 *         available_quantity:
 *           type: number
 *           example: 50
 *     UpdateProductInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Organic Tomato"
 *         price:
 *           type: number
 *           example: 130
 *         available_quantity:
 *           type: number
 *           example: 45
 */

/**
 * @openapi
 * /marketplace/products:
 *   get:
 *     tags:
 *       - Marketplace
 *     summary: Get all organic products with filters and pagination
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
  "/products",
  auth("CUSTOMER", "VENDOR", "ADMIN"),
  MarketplaceController.getProducts
);

/**
 * @openapi
 * /marketplace/products:
 *   post:
 *     tags:
 *       - Marketplace
 *     summary: List a new organic product (Vendor only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       403:
 *         description: Unauthorized - Vendor only
 */
router.post(
  "/products",
  auth("VENDOR"),
  MarketplaceController.createProduct
);

/**
 * @openapi
 * /marketplace/products/{id}:
 *   get:
 *     tags:
 *       - Marketplace
 *     summary: Get single product details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Product not found
 */
router.get(
  "/products/:id",
  auth("CUSTOMER", "VENDOR", "ADMIN"),
  MarketplaceController.getProductById
);

/**
 * @openapi
 * /marketplace/products/{id}:
 *   patch:
 *     tags:
 *       - Marketplace
 *     summary: Update product (Vendor only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.patch(
  "/products/:id",
  auth("VENDOR"),
  MarketplaceController.updateProduct
);

export const MarketplaceRoutes = router;