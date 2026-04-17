"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const verifyVendor = async (vendorId, status) => {
    return await prisma.vendorProfile.update({
        where: { id: vendorId },
        data: { certification_status: status },
    });
};
exports.AdminService = {
    verifyVendor,
};
//# sourceMappingURL=admin.service.js.map