import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { VendorService } from "./vendor.service";

const createOrUpdateProfile = async (req: Request, res: Response) => {
  const result = await VendorService.createProfile(req.user.userId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Vendor profile synced successfully",
    data: result,
  });
};

const submitCertificate = async (req: Request, res: Response) => {
  const result = await VendorService.uploadCertificate(
    req.user.userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Sustainability certificate submitted for review",
    data: result,
  });
};

export const VendorController = {
  createOrUpdateProfile,
  submitCertificate,
};
