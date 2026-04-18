import express from "express";
import auth from "../../middlewares/auth";
import { AdminController } from "./admin.controller";

const router = express.Router();

/**
 * @swagger
 * /admin/verify-vendor/{vendorId}:
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Approve or Reject a vendor (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vendorId
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
 *                 enum: [APPROVED, REJECTED]
 *     responses:
 *       200:
 *         description: Vendor status updated successfully
 *       403:
 *         description: Unauthorized
 */
router.patch(
  "/verify-vendor/:vendorId",
  auth("ADMIN"),
  AdminController.updateVendorStatus,
);

/**
 * @swagger
 * /admin/pending-certificates:
 *   get:
 *     tags:
 *       - Admin
 *     summary: List all submitted sustainability certificates
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Unauthorized
 */
router.get(
  "/pending-certificates",
  auth("ADMIN"),
  AdminController.getPendingCerts,
);

/**
 * @swagger
 * /admin/dashboard-stats:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get platform overview statistics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Unauthorized
 */
router.get("/dashboard-stats", auth("ADMIN"), AdminController.getStats);

export const AdminRoutes = router;
