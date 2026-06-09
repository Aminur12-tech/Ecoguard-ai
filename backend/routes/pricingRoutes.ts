// src/routes/pricing.routes.ts
import { Router } from "express";
import {
  getPrice,
  getPricingLogs,
  getPricingSummary,
} from "../controllers/pricing.controller";

const router = Router();

// GET  /api/pricing?homestayId=HS001&checkIn=2025-10-10&checkOut=2025-10-14
router.get("/", getPrice);

// GET  /api/pricing/logs/:homestayId
router.get("/logs/:homestayId", getPricingLogs);

// GET  /api/pricing/summary/:homestayId
router.get("/summary/:homestayId", getPricingSummary);


export default router;