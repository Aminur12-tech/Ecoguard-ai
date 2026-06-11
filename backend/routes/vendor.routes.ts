import { Router } from "express";
import { getVendorDashboard } from "../controllers/vendor.controller";

const router = Router();

router.get(
  "/dashboard/:vendorId",
  getVendorDashboard
);

export default router;