/**
 * @swagger
 * components:
 *   schemas:
 *     OrderCheckoutInput:
 *       type: object
 *       required:
 *         - produce_id
 *         - quantity
 *         - shipping_address
 *       properties:
 *         produce_id:
 *           type: string
 *           description: Unique ID of the organic produce
 *           example: "uuid-123-456"
 *         quantity:
 *           type: number
 *           description: Number of units to order
 *           example: 2
 *         shipping_address:
 *           type: string
 *           description: Fully qualified delivery address
 *           example: "H#12, R#5, Dhanmondi, Dhaka"
 *     OrderResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         user_id:
 *           type: string
 *         produce_id:
 *           type: string
 *         vendor_id:
 *           type: string
 *         quantity:
 *           type: number
 *         total_price:
 *           type: number
 *         status:
 *           type: string
 *           enum: [pending, paid, delivered, cancelled]
 *         shipping_address:
 *           type: string
 *         order_date:
 *           type: string
 *           format: date-time
 */
