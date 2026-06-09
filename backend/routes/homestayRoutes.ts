import express, { Request, Response } from "express";
import upload from "../config/multer";
import Homestay from "../models/Homestay";

const router = express.Router();



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
router.post(
  "/",
  upload.single("image"),

  async (req: Request, res: Response) => {
    try {

      const newHomestay = new Homestay({
        homestay_id:
          req.body.homestay_id,

        homestay_name:
          req.body.homestay_name,

        host_name:
          req.body.host_name,

        district:
          req.body.district,

        village_town:
          req.body.village_town,

        location: {
          latitude: Number(
            req.body.latitude
          ),

          longitude: Number(
            req.body.longitude
          ),
        },

        property_type:
          req.body.property_type,

        room_count: Number(
          req.body.room_count
        ),

        max_guests: Number(
          req.body.max_guests
        ),

        price_per_night_inr:
          Number(
            req.body.price_per_night_inr
          ),

        breakfast_included:
          req.body.breakfast_included ===
          "true",

        wifi:
          req.body.wifi ===
          "true",

        parking:
          req.body.parking ===
          "true",

        pet_friendly:
          req.body.pet_friendly ===
          "true",

        amenities: parseJSON(
          req.body.amenities
        ),

        local_food_available:
          req.body.local_food_available ===
          "true",

        eco_certified:
          req.body.eco_certified ===
          "true",

        solar_power:
          req.body.solar_power ===
          "true",

        rainwater_harvesting:
          req.body.rainwater_harvesting ===
          "true",

        eco_features: parseJSON(
          req.body.eco_features
        ),

        waste_management_score:
          Number(
            req.body.waste_management_score
          ),

        sustainability_score:
          Number(
            req.body.sustainability_score
          ),

        avg_rating:
          Number(
            req.body.avg_rating
          ),

        review_count:
          Number(
            req.body.review_count
          ),

        nearest_attraction:
          req.body.nearest_attraction,

        attraction_distance_km:
          Number(
            req.body.attraction_distance_km
          ),

        images: req.file
          ? [req.file.path]
          : [],
      });

      const saved =
        await newHomestay.save();

      res.status(201).json(saved);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error:
          "Failed to create homestay",
      });
    }
  }
);



// ======================================
// GET ALL HOMESTAYS
// ======================================
router.get(
  "/",

  async (req: Request, res: Response) => {
    try {

      const homestays =
        await Homestay.find().sort({
          createdAt: -1,
        });

      res.json(homestays);

    } catch (err) {

      res.status(500).json({
        error:
          "Failed to fetch homestays",
      });
    }
  }
);



// ======================================
// GET SINGLE HOMESTAY
// ======================================
router.get(
  "/:id",

  async (req: Request, res: Response) => {
    try {

      const homestay =
        await Homestay.findById(
          req.params.id
        );

      if (!homestay) {
        return res.status(404).json({
          error:
            "Homestay not found",
        });
      }

      res.json(homestay);

    } catch (err) {

      res.status(500).json({
        error:
          "Failed to fetch homestay",
      });
    }
  }
);



// ======================================
// UPDATE HOMESTAY
// ======================================
router.put(
  "/:id",

  upload.single("image"),

  async (req: Request, res: Response) => {
    try {

      const existing =
        await Homestay.findById(
          req.params.id
        );

      if (!existing) {
        return res.status(404).json({
          error:
            "Homestay not found",
        });
      }

      const updatedData = {
        ...req.body,

        location: {
          latitude: Number(
            req.body.latitude
          ),

          longitude: Number(
            req.body.longitude
          ),
        },

        breakfast_included:
          req.body.breakfast_included ===
          "true",

        wifi:
          req.body.wifi ===
          "true",

        parking:
          req.body.parking ===
          "true",

        pet_friendly:
          req.body.pet_friendly ===
          "true",

        local_food_available:
          req.body.local_food_available ===
          "true",

        eco_certified:
          req.body.eco_certified ===
          "true",

        solar_power:
          req.body.solar_power ===
          "true",

        rainwater_harvesting:
          req.body.rainwater_harvesting ===
          "true",

        amenities:
          req.body.amenities
            ? parseJSON(
                req.body.amenities
              )
            : existing.amenities,

        eco_features:
          req.body.eco_features
            ? parseJSON(
                req.body.eco_features
              )
            : existing.eco_features,

        images: req.file
          ? [req.file.path]
          : existing.images,
      };

      const updated =
        await Homestay.findByIdAndUpdate(
          req.params.id,
          updatedData,
          {
            new: true,
          }
        );

      res.json(updated);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error:
          "Failed to update homestay",
      });
    }
  }
);



// ======================================
// DELETE HOMESTAY
// ======================================
router.delete(
  "/:id",

  async (req: Request, res: Response) => {
    try {

      const deleted =
        await Homestay.findByIdAndDelete(
          req.params.id
        );

      if (!deleted) {
        return res.status(404).json({
          error:
            "Homestay not found",
        });
      }

      res.json({
        message:
          "Homestay deleted successfully",
      });

    } catch (err) {

      res.status(500).json({
        error:
          "Failed to delete homestay",
      });
    }
  }
);

export default router;