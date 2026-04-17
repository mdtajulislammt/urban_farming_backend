import { CertStatus } from "@prisma/client";
import prisma from "../../config/prisma";

const createProfile = async (userId: string, data: any) => {
  return await prisma.vendorProfile.upsert({
    where: { user_id: userId },
    update: data,
    create: {
      ...data,
      user_id: userId,
      certification_status: CertStatus.PENDING,
    },
  });
};

const uploadCertificate = async (userId: string, payload: any) => {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { user_id: userId },
  });

  if (!vendor)
    throw new Error("Vendor profile not found. Create profile first.");

  return await prisma.sustainabilityCert.create({
    data: {
      vendor_id: vendor.id,
      certifying_agency: payload.certifying_agency,
      certification_date: new Date(payload.certification_date),
    },
  });
};

export const VendorService = {
  createProfile,
  uploadCertificate,
};
