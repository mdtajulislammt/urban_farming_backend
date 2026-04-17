import express from "express";
import auth from "../../middlewares/auth";
import { VendorController } from "./vendor.controller";

const router = express.Router();

/**
 * @openapi
 * /api/v1/vendor/setup-profile:
 * post:
 * tags: [Vendor]
 * summary: Create/Update Farm Profile
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/VendorProfileInput'
 */
router.post(
  "/setup-profile",
  auth("VENDOR"),
  VendorController.createOrUpdateProfile,
);

/**
 * @openapi
 * /api/v1/vendor/submit-cert:
 * post:
 * tags: [Vendor]
 * summary: Submit Sustainability Certificate
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/SustainabilityCertInput'
 */
router.post("/submit-cert", auth("VENDOR"), VendorController.submitCertificate);

export const VendorRoutes = router;
