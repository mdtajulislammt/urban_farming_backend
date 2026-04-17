"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketplaceController = void 0;
const marketplace_service_1 = require("./marketplace.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const getProducts = async (req, res) => {
    const result = await marketplace_service_1.MarketplaceService.getAllProducts(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Products fetched successfully",
        meta: result.meta,
        data: result.data
    });
};
exports.MarketplaceController = {
    getProducts
};
//# sourceMappingURL=marketplace.controller.js.map