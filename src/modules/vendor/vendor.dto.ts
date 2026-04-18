/**
 * @openapi
 * components:
 *   schemas:
 *     VendorProfileInput:
 *       type: object
 *       required:
 *         - farm_name
 *         - farm_location
 *       properties:
 *         farm_name:
 *           type: string
 *           description: The official name of the farm
 *           example: "Urban Green Oasis"
 *         farm_location:
 *           type: string
 *           description: Physical address or general location of the farm
 *           example: "Mirpur, Dhaka"
 *     SustainabilityCertInput:
 *       type: object
 *       required:
 *         - certifying_agency
 *         - certification_date
 *       properties:
 *         certifying_agency:
 *           type: string
 *           description: The organization that issued the sustainability certificate
 *           example: "Global Organic Standard"
 *         certification_date:
 *           type: string
 *           format: date
 *           description: Date of issuance (YYYY-MM-DD)
 *           example: "2026-04-17"
 */