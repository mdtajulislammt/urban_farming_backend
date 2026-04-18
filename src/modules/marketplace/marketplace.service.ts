import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

const getAllProducts = async (query: any) => {
  const {
    searchTerm,
    category,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
  } = query;
  const skip = (Number(page) - 1) * Number(limit);

  // Dynamic Filter Construction
  const whereConditions: Prisma.ProduceWhereInput = {};

  if (searchTerm) {
    whereConditions.OR = [
      { name: { contains: searchTerm as string, mode: "insensitive" } },
      { description: { contains: searchTerm as string, mode: "insensitive" } },
    ];
  }

  if (category) {
    whereConditions.category = category as string;
  }

  if (minPrice || maxPrice) {
    whereConditions.price = {
      gte: minPrice ? Number(minPrice) : 0,
      lte: maxPrice ? Number(maxPrice) : 999999,
    };
  }

  // Only show products from certified vendors (Business Logic)
  whereConditions.vendor = {
    certification_status: "APPROVED",
  };

  const result = await prisma.produce.findMany({
    where: whereConditions,
    skip,
    take: Number(limit),
    include: {
      vendor: {
        select: { farm_name: true, farm_location: true },
      },
    },
    orderBy: { price: "asc" },
  });

  const total = await prisma.produce.count({ where: whereConditions });

  return {
    success: true,
    message: "Products fetched successfully",
    meta: { page: Number(page), limit: Number(limit), total },
    data: result,
  };
};

// vendor will add product
const createProduct = async (userId: string, payload: any) => {
  // check vendor profile
  const vendor = await prisma.vendorProfile.findUnique({
    where: { user_id: userId },
  });

  if (!vendor) throw new Error("You must setup a vendor profile first!");

  const result = await prisma.produce.create({
    data: {
      ...payload,
      vendor_id: vendor.id,
      certification_status: "PENDING", // এডমিন এপ্রুভালের জন্য ওয়েটিং
    },
  });

  if (!result) {
    throw new Error("Product not created");
  }

  return {
    success: true,
    message: "Product created successfully",
    data: result,
  };
};

// get single product
const getProductById = async (id: string) => {
  const result = await prisma.produce.findUnique({
    where: { id },
    include: { vendor: true },
  });

  if (!result) {
    throw new Error("Product not found");
  }

  return {
    success: true,
    message: "Product fetched successfully",
    data: result,
  };
};

// update product
const updateProduct = async (id: string, userId: string, payload: any) => {
  const product = await prisma.produce.findUnique({
    where: { id },
    include: { vendor: true },
  });

  if (!product || product.vendor.user_id !== userId) {
    throw new Error("Unauthorized or Product not found");
  }

  const result = await prisma.produce.update({
    where: { id },
    data: payload,
  });

  if (!result) {
    throw new Error("Product not updated");
  }

  return {
    success: true,
    message: "Product updated successfully",
    data: result,
  };
};

export const MarketplaceService = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
};
