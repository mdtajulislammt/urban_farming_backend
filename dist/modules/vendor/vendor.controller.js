"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const vendor_service_1 = require("./vendor.service");
const createOrUpdateProfile = async (req, res) => {
    const result = await vendor_service_1.VendorService.createProfile(req.user.userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Vendor profile synced successfully",
        data: result,
    });
};
const submitCertificate = async (req, res) => {
    const result = await vendor_service_1.VendorService.uploadCertificate(req.user.userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Sustainability certificate submitted for review",
        data: result,
    });
};
exports.VendorController = {
    createOrUpdateProfile,
    submitCertificate,
};
//# sourceMappingURL=vendor.controller.js.map