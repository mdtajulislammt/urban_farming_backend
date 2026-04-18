import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { TrackingService } from "./tracking.service";

const updateStatus = async (req: Request, res: Response) => {
  const result = await TrackingService.updatePlantStatus(
    req.user.userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Plant status updated successfully!",
    data: result,
  });
};

const getTrackings = async (req: Request, res: Response) => {
  const result = await TrackingService.getMyPlantTracking(req.user.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
};

const getTrackingHistoryBySpace = async (req: Request, res: Response) => {
  const result = await TrackingService.getTrackingHistoryBySpace(
    req.params.spaceId as string,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
};

export const TrackingController = {
  updateStatus,
  getTrackings,
  getTrackingHistoryBySpace,
};
