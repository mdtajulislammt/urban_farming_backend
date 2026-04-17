"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketplaceService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const getAllProducts = async (query) => {
    const { searchTerm, category, minPrice, maxPrice, page = 1, limit = 10, } = query;
    const skip = (Number(page) - 1) * Number(limit);
    // Dynamic Filter Construction
    const whereConditions = {};
    if (searchTerm) {
        whereConditions.OR = [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
        ];
    }
    if (category) {
        whereConditions.category = category;
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
    const result = await prisma_1.default.produce.findMany({
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
    const total = await prisma_1.default.produce.count({ where: whereConditions });
    return {
        meta: { page: Number(page), limit: Number(limit), total },
        data: result,
    };
};
exports.MarketplaceService = {
    getAllProducts,
};
//# sourceMappingURL=marketplace.service.js.map