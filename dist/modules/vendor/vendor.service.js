"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createProfile = async (userId, data) => {
    return await prisma.vendorProfile.upsert({
        where: { user_id: userId },
        update: data,
        create: {
            ...data,
            user_id: userId,
            certification_status: client_1.CertStatus.PENDING,
        },
    });
};
const uploadCertificate = async (userId, payload) => {
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
exports.VendorService = {
    createProfile,
    uploadCertificate,
};
//# sourceMappingURL=vendor.service.js.map