import { CertStatus } from "@prisma/client";
import prisma from "../../config/prisma";

const verifyVendor = async (vendorId: string, status: CertStatus) => {
  const result = await prisma.vendorProfile.update({
    where: { id: vendorId },
    data: { certification_status: status },
  });
  return {
    success: true,
    message: "Vendor verified successfully",
    data: result,
  };
};

const getAllPendingCerts = async () => {
  const result = await prisma.sustainabilityCert.findMany({
    include: {
      vendor: {
        select: {
          farm_name: true,
          farm_location: true,
          user: { select: { name: true, email: true } },
        },
      },
    },
  });

  return {
    success: true,
    message: "Pending certifications fetched successfully",
    data: result,
  };
};

const getPlatformStats = async () => {
  const [users, vendors, products, totalRevenue] = await Promise.all([
    prisma.user.count(),
    prisma.vendorProfile.count(),
    prisma.produce.count(),
    prisma.order.aggregate({
      _sum: { total_price: true },
    }),
  ]);

  return {
    success: true,
    message: "Platform statistics fetched successfully",
    data: {
      totalUsers: users,
      totalVendors: vendors,
      totalProducts: products,
      totalRevenue: totalRevenue._sum.total_price || 0,
    },
  };
};

export const AdminService = {
  verifyVendor,
  getAllPendingCerts,
  getPlatformStats,
};
