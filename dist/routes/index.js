"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const marketplace_routes_1 = require("@/modules/marketplace/marketplace.routes");
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const vendor_routes_1 = require("@/modules/vendor/vendor.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    { path: "/auth", route: auth_routes_1.AuthRoutes },
    { path: "/marketplace", route: marketplace_routes_1.MarketplaceRoutes },
    { path: "/vendor", route: vendor_routes_1.VendorRoutes },
    //   { path: "/admin", route: AdminRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
//# sourceMappingURL=index.js.map