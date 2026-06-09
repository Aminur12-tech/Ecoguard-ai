// src/controllers/pricing.controller.ts
import { Request, Response } from "express";
import Homestay from "../models/Homestay";
import Booking from "../models/Booking";
import PricingLog from "../models/PricingLog";
import { pricingEngine } from "../services/dynamicPricing.service";

// GET /api/pricing
export const getPrice = async (req: Request, res: Response) => {
  try {
    const homestayId = req.query.homestayId as string;
    const {  checkIn, checkOut } = req.query;
    
    if (!homestayId || !checkIn || !checkOut) {
      return res.status(400).json({ error: "homestayId, checkIn, checkOut are required" });
    }

    const checkInDate  = new Date(checkIn as string);
    const checkOutDate = new Date(checkOut as string);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({ error: "checkOut must be after checkIn" });
    }

    const homestay = await Homestay.findOne({ homestay_id: homestayId });
    if (!homestay) return res.status(404).json({ error: "Homestay not found" });

    const totalRooms  = homestay.room_count ?? 1;
    const bookedRooms = await Booking.countDocuments({
      homestay_id: homestayId,
      status: "confirmed",
      check_in:  { $lt: checkOutDate },
      check_out: { $gt: checkInDate },
    });
    const occupancyRate = Math.min(bookedRooms / totalRooms, 1);

    const breakdown = pricingEngine.calculatePrice(
      homestay, checkInDate, checkOutDate, { occupancyRate }
    );


    // Fire-and-forget log
    PricingLog.create({
      homestay_id:    homestayId,
      check_in:       checkInDate,
      check_out:      checkOutDate,
      occupancy_rate: occupancyRate,
      ...breakdown,
    }).catch((err) => console.error("[PricingLog]", err));

    return res.json({ success: true, pricing: breakdown });

  } catch (err) {
    console.error("[getPrice]", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/pricing/logs/:homestayId
export const getPricingLogs = async (req: Request, res: Response) => {
  try {
    const { homestayId } = req.params;
    const { page = "1", limit = "20" } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [logs, total] = await Promise.all([
      PricingLog.find({ homestay_id: homestayId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit as string)),
      PricingLog.countDocuments({ homestay_id: homestayId }),
    ]);

    return res.json({
      success: true,
      total,
      page:  parseInt(page as string),
      pages: Math.ceil(total / parseInt(limit as string)),
      logs,
    });

  } catch (err) {
    console.error("[getPricingLogs]", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/pricing/summary/:homestayId
export const getPricingSummary = async (req: Request, res: Response) => {
  try {
    const { homestayId } = req.params;

    const summary = await PricingLog.aggregate([
      { $match: { homestay_id: homestayId } },
      {
        $group: {
          _id: null,
          avgFinalPrice:      { $avg: "$finalPrice" },
          maxFinalPrice:      { $max: "$finalPrice" },
          minFinalPrice:      { $min: "$finalPrice" },
          avgMultiplier:      { $avg: "$finalMultiplier" },
          avgOccupancy:       { $avg: "$occupancy_rate" },
          surgeCount:         { $sum: { $cond: ["$surgeAlert", 1, 0] } },
          totalLogs:          { $sum: 1 },
        },
      },
    ]);

    if (!summary.length) {
      return res.status(404).json({ error: "No pricing data found for this homestay" });
    }

    return res.json({ success: true, summary: summary[0] });

  } catch (err) {
    console.error("[getPricingSummary]", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
