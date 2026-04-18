import prisma from "../../config/prisma";

const createOrder = async (userId: string, payload: any) => {
  return await prisma.$transaction(async (tx) => {
    //  product check and stock verify
    const product = await tx.produce.findUnique({
      where: { id: payload.produce_id },
    });

    if (!product) throw new Error("Product not found");
    if (product.available_quantity < payload.quantity) {
      throw new Error("Insufficient stock available");
    }

    // create order
    const newOrder = await tx.order.create({
      data: {
        user_id: userId,
        produce_id: payload.produce_id,
        vendor_id: product.vendor_id,
        quantity: payload.quantity,
        total_price: product.price * payload.quantity,
        status: "pending",
        shipping_address: payload.shipping_address,
      },
    });

    // stock update
    await tx.produce.update({
      where: { id: payload.produce_id },
      data: {
        available_quantity: {
          decrement: payload.quantity,
        },
      },
    });

    return {
      success: true,
      message: "Order created successfully",
      data: newOrder,
    };
  });
};

const getCustomerOrders = async (userId: string) => {
  const result = await prisma.order.findMany({
    where: { user_id: userId },
    include: { produce: true },
  });

  if (!result) {
    throw new Error("Orders not found");
  }

  return {
    success: true,
    message: "Orders fetched successfully",
    data: result,
  };
};

// vendor can see his orders
const getVendorOrders = async (userId: string) => {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { user_id: userId },
  });
  if (!vendor) throw new Error("Vendor profile not found!");

  return await prisma.order.findMany({
    where: { vendor_id: vendor.id },
    include: {
      produce: { select: { name: true, price: true } },
      user: { select: { name: true, email: true } },
    },
  });
};

// this
const updateOrderStatus = async (
  userId: string,
  orderId: string,
  status: string,
) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) throw new Error("Order not found!");

  //  just vendor can update order status
  const vendor = await prisma.vendorProfile.findUnique({
    where: { user_id: userId },
  });

  if (order.vendor_id !== vendor?.id) {
    throw new Error("Unauthorized to update this order!");
  }

  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

export const OrderService = {
  createOrder,
  getCustomerOrders,
  getVendorOrders,
  updateOrderStatus,
};
