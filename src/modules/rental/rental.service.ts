import { BookingStatus } from "@prisma/client";
import prisma from "../../config/prisma";

const createRentalSpace = async (userId: string, payload: any) => {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { user_id: userId },
  });
  if (!vendor) throw new Error("Vendor profile not found!");

  const result = await prisma.rental_space.create({
    data: {
      ...payload,
      vendor_id: vendor.id,
    },
  });

  if (!result) {
    throw new Error("Rental space not created");
  }

  return {
    success: true,
    message: "Rental space created successfully",
    data: result,
  };
};

const bookSpace = async (userId: string, payload: any) => {
  const result = await prisma.booking.create({
    data: {
      user_id: userId,
      rental_space_id: payload.rental_space_id,
      start_date: new Date(payload.start_date),
      end_date: new Date(payload.end_date),
      status: BookingStatus.PENDING,
    },
  });

  if (!result) {
    throw new Error("Booking not created");
  }

  return {
    success: true,
    message: "Booking created successfully",
    data: result,
  };
};

const getMyBookings = async (userId: string) => {
  const result = await prisma.booking.findMany({
    where: { user_id: userId },
    include: { rental_space: true },
  });

  if (!result) {
    throw new Error("Bookings not found");
  }

  return {
    success: true,
    message: "Bookings fetched successfully",
    data: result,
  };
};

// vendoe see the listed spaces
const getMyListedSpaces = async (userId: string) => {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { user_id: userId },
  });
  if (!vendor) throw new Error("Vendor profile not found!");

  const result = await prisma.rental_space.findMany({
    where: { vendor_id: vendor.id },
    include: { _count: { select: { bookings: true } } },
  });

  if (!result) {
    throw new Error("Rental spaces not found");
  }

  return {
    success: true,
    message: "Rental spaces fetched successfully",
    data: result,
  };
};

// update booking status
const updateBookingStatus = async (
  userId: string,
  bookingId: string,
  status: BookingStatus,
) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { rental_space: true },
  });

  if (!booking) throw new Error("Booking not found!");

  // check if the booking belongs to the vendor
  const vendor = await prisma.vendorProfile.findUnique({
    where: { user_id: userId },
  });

  if (booking.rental_space.vendor_id !== vendor?.id) {
    throw new Error("Unauthorized access to this booking!");
  }

  const result = await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });

  if (!result) {
    throw new Error("Booking status not updated");
  }

  return {
    success: true,
    message: "Booking status updated successfully",
    data: result,
  };
};

export const RentalService = {
  createRentalSpace,
  bookSpace,
  getMyBookings,
  getMyListedSpaces,
  updateBookingStatus,
};
