import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { AdminRoutes } from "../modules/admin/admin.routes";
import { CommunityRoutes } from "../modules/community/community.routes";
import { MarketplaceRoutes } from "../modules/marketplace/marketplace.routes";
import { OrderRoutes } from "../modules/order/order.routes";
import { RentalRoutes } from "../modules/rental/rental.routes";
import { TrackingRoutes } from "../modules/tracking/tracking.routes";
import { VendorRoutes } from "../modules/vendor/vendor.routes";

const router = express.Router();

const moduleRoutes = [
  { path: "/admin", route: AdminRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/marketplace", route: MarketplaceRoutes },
  { path: "/vendor", route: VendorRoutes },
  { path: "/rental", route: RentalRoutes },
  { path: "/order", route: OrderRoutes },
  { path: "/tracking", route: TrackingRoutes },
  { path: "/community", route: CommunityRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
