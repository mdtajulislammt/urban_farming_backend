import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { MarketplaceRoutes } from "../modules/marketplace/marketplace.routes";
import { VendorRoutes } from "../modules/vendor/vendor.routes";

const router = express.Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/marketplace", route: MarketplaceRoutes },
  { path: "/vendor", route: VendorRoutes },
  //   { path: "/admin", route: AdminRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
