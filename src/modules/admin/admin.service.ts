import prisma from "../../config/prisma";

const verifyVendor = async (
  vendorId: string,
  status: "APPROVED" | "REJECTED",
) => {
  return await prisma.vendorProfile.update({
    where: { id: vendorId },
    data: { certification_status: status },
  });
};

export const AdminService = {
  verifyVendor,
};
