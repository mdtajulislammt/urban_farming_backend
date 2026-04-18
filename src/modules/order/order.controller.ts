import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { OrderService } from "./order.service";

const placeOrder = async (req: Request, res: Response) => {
  const result = await OrderService.createOrder(req.user.userId, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Order placed successfully!",
    data: result,
  });
};

const myOrders = async (req: Request, res: Response) => {
  const result = await OrderService.getCustomerOrders(req.user.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
};

const getVendorOrders = async (req: Request, res: Response) => {
  const result = await OrderService.getVendorOrders(req.user.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
};

const updateStatus = async (req: Request, res: Response) => {
  const result = await OrderService.updateOrderStatus(
    req.user.userId,
    req.params.id as string,
    req.body.status,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order status updated successfully!",
    data: result,
  });
};

export const OrderController = {
  placeOrder,
  myOrders,
  getVendorOrders,
  updateStatus,
};
