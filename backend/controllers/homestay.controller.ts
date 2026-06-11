import { Request, Response } from "express";
import Homestay from "../models/Homestay";
import upload from "../config/multer";

// ======================================
// SAFE JSON PARSER
// ======================================
const parseJSON = (value: any) => {
  try {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return JSON.parse(value);
  } catch {
    return [];
  }
};

// ======================================
// CREATE HOMESTAY
// ======================================
export const createHomestay = async (req: Request, res: Response) => {
  try {
    const {
      homestay_id,
      homestay_name,
      host_name,
      vendor_id,
      district,
      village_town,
      latitude,
      longitude,
      property_type,
      room_count,
      max_guests,
      price_per_night_inr,
      breakfast_included,
      wifi,
      parking,
      pet_friendly,
      amenities,
      local_food_available,
      eco_certified,
      solar_power,
      rainwater_harvesting,
      eco_features,
      waste_management_score,
      sustainability_score,
      avg_rating,
      review_count,
      nearest_attraction,
      attraction_distance_km,
    } = req.body;

    // -----------------------------
    // VALIDATION
    // -----------------------------
    if (
      !homestay_id ||
      !homestay_name ||
      !vendor_id ||
      !room_count ||
      !max_guests
    ) {
      return res.status(400).json({
        error: "Required fields missing",
      });
    }

    // -----------------------------
    // CREATE HOMESTAY
    // -----------------------------
    const newHomestay = new Homestay({
      homestay_id,
      homestay_name,
      host_name,
      vendor_id,

      district,
      village_town,

      location: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },

      property_type,

      room_count: Number(room_count),
      max_guests: Number(max_guests),
      price_per_night_inr: Number(price_per_night_inr),

      breakfast_included: breakfast_included === "true",
      wifi: wifi === "true",
      parking: parking === "true",
      pet_friendly: pet_friendly === "true",

      amenities: parseJSON(amenities),

      local_food_available: local_food_available === "true",

      eco_certified: eco_certified === "true",
      solar_power: solar_power === "true",
      rainwater_harvesting: rainwater_harvesting === "true",

      eco_features: parseJSON(eco_features),

      waste_management_score: Number(waste_management_score),
      sustainability_score: Number(sustainability_score),

      avg_rating: Number(avg_rating),
      review_count: Number(review_count),

      nearest_attraction,
      attraction_distance_km: Number(attraction_distance_km),

      images: req.file ? [req.file.path] : [],
    });

    const saved = await newHomestay.save();

    return res.status(201).json({
      success: true,
      homestay: saved,
    });
  } catch (err) {
    console.error("[createHomestay]", err);
    return res.status(500).json({
      error: "Failed to create homestay",
      details: err instanceof Error ? err.message : err,
    });
  }
};

// ======================================
// GET ALL HOMESTAYS
// ======================================
export const getAllHomestays = async (
  req: Request,
  res: Response
) => {
  try {
    const homestays = await Homestay.find().sort({
      createdAt: -1,
    });

    return res.json(homestays);
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch homestays",
    });
  }
};

// ======================================
// GET SINGLE HOMESTAY
// ======================================
export const getHomestayById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const homestay = await Homestay.findById(id);

    if (!homestay) {
      return res.status(404).json({
        error: "Homestay not found",
      });
    }

    return res.json(homestay);
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch homestay",
    });
  }
};

// ======================================
// UPDATE HOMESTAY
// ======================================
export const updateHomestay = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const updated = await Homestay.findByIdAndUpdate(
      id,
      {
        ...req.body,
        location: {
          latitude: Number(req.body.latitude),
          longitude: Number(req.body.longitude),
        },
        amenities: req.body.amenities
          ? parseJSON(req.body.amenities)
          : undefined,
        eco_features: req.body.eco_features
          ? parseJSON(req.body.eco_features)
          : undefined,
        images: req.file ? [req.file.path] : undefined,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        error: "Homestay not found",
      });
    }

    return res.json({
      success: true,
      homestay: updated,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to update homestay",
    });
  }
};

// ======================================
// DELETE HOMESTAY
// ======================================
export const deleteHomestay = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const deleted = await Homestay.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        error: "Homestay not found",
      });
    }

    return res.json({
      success: true,
      message: "Homestay deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to delete homestay",
    });
  }
};