import { Request, Response } from "express";
import { RentalService } from "./rental.service";
import sendResponse from "../../utils/sendResponse";

const listSpace = async (req: Request, res: Response) => {
  const result = await RentalService.createRentalSpace(
    req.user.userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Rental space listed successfully",
    data: result,
  });
};

const createBooking = async (req: Request, res: Response) => {
  const result = await RentalService.bookSpace(req.user.userId, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Booking request submitted",
    data: result,
  });
};

const getMyBookings = async (req: Request, res: Response) => {
  const result = await RentalService.getMyBookings(req.user.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookings fetched successfully",
    data: result,
  });
};

const getMyListedSpaces = async (req: Request, res: Response) => {
  const result = await RentalService.getMyListedSpaces(req.user.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Listed spaces fetched successfully",
    data: result,
  });
};

const updateBookingStatus = async (req: Request, res: Response) => {
  const result = await RentalService.updateBookingStatus(
    req.user.userId,
    req.params.bookingId as string,
    req.body.status,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking status updated successfully",
    data: result,
  });
};

export const RentalController = {
  listSpace,
  createBooking,
  getMyBookings,
  getMyListedSpaces,
  updateBookingStatus,
};
