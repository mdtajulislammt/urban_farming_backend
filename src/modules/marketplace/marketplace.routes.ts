import express from "express";
import { MarketplaceController } from "./marketplace.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

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
  MarketplaceController.getProducts,
);

export const MarketplaceRoutes = router;
