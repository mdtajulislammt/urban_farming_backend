import express from "express";
import auth from "../../middlewares/auth";
import { TrackingController } from "./tracking.controller";

const router = express.Router();

/**
 * @swagger
 * /tracking/update:
 *   post:
 *     tags:
 *       - Tracking
 *     summary: Update plant health and growth status (Vendor only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rental_space_id:
 *                 type: string
 *               plant_name:
 *                 type: string
 *                 example: "Capsicum"
 *               health_status:
 *                 type: string
 *                 example: "Needs Water"
 *               growth_stage:
 *                 type: string
 *                 example: "Flowering"
 *     responses:
 *       200:
 *         description: Plant status updated successfully
 *       403:
 *         description: Unauthorized
 */
router.post("/update", auth("VENDOR"), TrackingController.updateStatus);

/**
 * @swagger
 * /tracking/my-plants:
 *   get:
 *     tags:
 *       - Tracking
 *     summary: Customer views health status of their rented plants
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Unauthorized
 */
router.get("/my-plants", auth("CUSTOMER"), TrackingController.getTrackings);

/**
 * @swagger
 * /tracking/history/{spaceId}:
 *   get:
 *     tags:
 *       - Tracking
 *     summary: Get tracking history for a specific rental space
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: spaceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Unauthorized
 */
router.get(
  "/history/:spaceId",
  auth("CUSTOMER"),
  TrackingController.getTrackingHistoryBySpace,
);

export const TrackingRoutes = router;
