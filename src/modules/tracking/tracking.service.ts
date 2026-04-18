import prisma from "../../config/prisma";

const updatePlantStatus = async (userId: string, payload: any) => {
  //  check if vendor is updating his own rented space
  const space = await prisma.rental_space.findUnique({
    where: { id: payload.rental_space_id },
    include: { vendor: true },
  });

  if (!space || space.vendor.user_id !== userId) {
    throw new Error("Unauthorized to update tracking for this space!");
  }

  //  update or create new entry
  const result = await prisma.plant_tracking.upsert({
    // if already exists update, otherwise create new
    where: { id: payload.id || "new-id" },
    update: {
      health_status: payload.health_status,
      growth_stage: payload.growth_stage,
      last_updated: new Date(),
    },
    create: {
      rental_space_id: payload.rental_space_id,
      plant_name: payload.plant_name,
      health_status: payload.health_status,
      growth_stage: payload.growth_stage,
    },
  });

  return {
      success: true,
      statusCode: 200,
      message: "Tracking history fetched successfully!",
      data: result,
  };
};

const getMyPlantTracking = async (userId: string) => {
  //  customer can see his rented space plant tracking
  const result = await prisma.plant_tracking.findMany({
    where: {
      rental_space: {
        bookings: {
          some: { user_id: userId, status: "CONFIRMED" },
        },
      },
    },
    include: { rental_space: true },
  });

  return {
      success: true,
      statusCode: 200,
      message: "Tracking history fetched successfully!",
      data: result,
  };
};

const getTrackingHistoryBySpace = async (spaceId: string) => {
  const result = await prisma.plant_tracking.findMany({
    where: { rental_space_id: spaceId },
    orderBy: { last_updated: "desc" },
  });

  return {
      success: true,
      statusCode: 200,
      message: "Tracking history fetched successfully!",
      data: result,
  };
};

export const TrackingService = {
  updatePlantStatus,
  getMyPlantTracking,
  getTrackingHistoryBySpace,
};
