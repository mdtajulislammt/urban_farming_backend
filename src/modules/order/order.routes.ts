import express from "express";
import auth from "../../middlewares/auth";
import { OrderController } from "./order.controller";

const router = express.Router();

/**
 * @swagger
 * /order/checkout:
 *   post:
 *     tags:
 *       - Order
 *     summary: Place an order for organic produce
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderCheckoutInput'
 *     responses:
 *       201:
 *         description: Order placed successfully!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 */
router.post("/checkout", auth("CUSTOMER"), OrderController.placeOrder);

/**
 * @swagger
 * /order/my-orders:
 *   get:
 *     tags:
 *       - Order
 *     summary: View all my purchase history
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderResponse'
 */
router.get("/my-orders", auth("CUSTOMER"), OrderController.myOrders);

/**
 * @swagger
 * /order/vendor-orders:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get all orders received by the logged-in vendor
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderResponse'
 */
router.get("/vendor-orders", auth("VENDOR"), OrderController.getVendorOrders);

/**
 * @swagger
 * /order/status/{id}:
 *   patch:
 *     tags:
 *       - Order
 *     summary: Update order status (Vendor only)
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
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, paid, shipped, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 */
router.patch("/status/:id", auth("VENDOR"), OrderController.updateStatus);

export const OrderRoutes = router;
