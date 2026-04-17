"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const vendor_controller_1 = require("./vendor.controller");
const router = express_1.default.Router();
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
router.post("/setup-profile", (0, auth_1.default)("VENDOR"), vendor_controller_1.VendorController.createOrUpdateProfile);
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
router.post("/submit-cert", (0, auth_1.default)("VENDOR"), vendor_controller_1.VendorController.submitCertificate);
exports.VendorRoutes = router;
//# sourceMappingURL=vendor.routes.js.map