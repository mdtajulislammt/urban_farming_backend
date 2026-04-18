import express from "express";
import auth from "../../middlewares/auth";
import { RentalController } from "./rental.controller";

const router = express.Router();

/**
 * @openapi
 * /rental/list-space:
 *   post:
 *     tags:
 *       - Rental
 *     summary: List garden space for rent (Vendor only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 example: "Mirpur, Dhaka"
 *               size:
 *                 type: string
 *                 example: "300 sq ft"
 *               price:
 *                 type: number
 *                 example: 2000
 *     responses:
 *       201:
 *         description: Rental space listed successfully
 */
router.post("/list-space", auth("VENDOR"), RentalController.listSpace);

/**
 * @openapi
 * /rental/book:
 *   post:
 *     tags:
 *       - Rental
 *     summary: Request to rent a garden space
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
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Booking request submitted
 */
router.post("/book", auth("CUSTOMER"), RentalController.createBooking);

/**
 * @openapi
 * /rental/my-spaces:
 *   get:
 *     tags:
 *       - Rental
 *     summary: Get all spaces listed by the logged-in vendor
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/my-spaces", auth("VENDOR"), RentalController.getMyListedSpaces);

/**
 * @openapi
 * /rental/manage-booking/{bookingId}:
 *   patch:
 *     tags:
 *       - Rental
 *     summary: Confirm or Cancel a booking request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
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
 *                 enum: [CONFIRMED, CANCELLED]
 *     responses:
 *       200:
 *         description: Booking status updated successfully
 */
router.patch(
  "/manage-booking/:bookingId",
  auth("VENDOR"),
  RentalController.updateBookingStatus,
);

/**
 * @openapi
 * /rental/my-bookings:
 *   get:
 *     tags:
 *       - Rental
 *     summary: Get all bookings made by the logged-in customer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/my-bookings", auth("CUSTOMER"), RentalController.getMyBookings);

export const RentalRoutes = router;
