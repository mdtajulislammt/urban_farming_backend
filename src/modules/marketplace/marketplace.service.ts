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
    meta: { page: Number(page), limit: Number(limit), total },
    data: result,
  };
};

export const MarketplaceService = {
  getAllProducts,
};
