"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketplaceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const marketplace_controller_1 = require("./marketplace.controller");
const router = express_1.default.Router();
/**
 * @openapi
 * /api/v1/marketplace/products:
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
router.get("/products", marketplace_controller_1.MarketplaceController.getProducts);
exports.MarketplaceRoutes = router;
//# sourceMappingURL=marketplace.routes.js.map