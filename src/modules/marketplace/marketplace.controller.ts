import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { MarketplaceService } from "./marketplace.service";

const getProducts = async (req: Request, res: Response) => {
  const result = await MarketplaceService.getAllProducts(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products fetched successfully",
    meta: result.meta,
    data: result.data,
  });
};

const createProduct = async (req: Request, res: Response) => {
  const result = await MarketplaceService.createProduct(
    req.user.userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product created successfully",
    data: result,
  });
};

const getProductById = async (req: Request, res: Response) => {
  const result = await MarketplaceService.getProductById(
    req.params.id as string,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
};

const updateProduct = async (req: Request, res: Response) => {
  const result = await MarketplaceService.updateProduct(
    req.params.id as string,
    req.user.userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
};

export const MarketplaceController = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
};
