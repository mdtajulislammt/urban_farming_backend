import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const updateVendorStatus = async (req: Request, res: Response) => {
  const { vendorId } = req.params;
  const { status } = req.body;

  const result = await AdminService.verifyVendor(vendorId as string, status);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Vendor status updated to ${status}`,
    data: result,
  });
};

const getPendingCerts = async (req: Request, res: Response) => {
  const result = await AdminService.getAllPendingCerts();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Pending certificates fetched successfully",
    data: result,
  });
};

const getStats = async (req: Request, res: Response) => {
  const result = await AdminService.getPlatformStats();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
};

export const AdminController = {
  updateVendorStatus,
  getPendingCerts,
  getStats,
};
