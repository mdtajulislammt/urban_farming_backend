"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./config/prisma"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5000;
async function main() {
    try {
        await prisma_1.default.$connect();
        console.log("✅ Database connected successfully");
        app_1.default.listen(PORT, () => {
            console.log(`🚀 Server is flying on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
    }
}
main();
//# sourceMappingURL=server.js.map