import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Homestay from "../models/Homestay";

dotenv.config();

const results: any[] = [];

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB Connected");
  });

fs.createReadStream("uploads/homestays.csv")
  .pipe(csv())

  .on("data", (data) => {
    results.push({
      homestay_id: data.homestay_id,

      homestay_name: data.homestay_name,

      host_name: data.host_name,

      district: data.district,

      village_town: data.village_town,

      location: {
        latitude: Number(data.latitude),

        longitude: Number(data.longitude),
      },

      property_type: data.property_type,

      room_count: Number(data.room_count),

      max_guests: Number(data.max_guests),

      price_per_night_inr:
        Number(data.price_per_night_inr),

      breakfast_included:
        data.breakfast_included === "TRUE",

      wifi: data.wifi === "TRUE",

      parking: data.parking === "TRUE",

      pet_friendly:
        data.pet_friendly === "TRUE",

      amenities: [
        data.wifi === "TRUE"
          ? "WiFi"
          : null,

        data.parking === "TRUE"
          ? "Parking"
          : null,

        data.breakfast_included === "TRUE"
          ? "Breakfast"
          : null,

        data.pet_friendly === "TRUE"
          ? "Pet Friendly"
          : null,
      ].filter(Boolean),

      local_food_available:
        data.local_food_available === "TRUE",

      eco_certified:
        data.eco_certified === "TRUE",

      solar_power:
        data.solar_power === "TRUE",

      rainwater_harvesting:
        data.rainwater_harvesting === "TRUE",

      eco_features: [
        data.eco_certified === "TRUE"
          ? "Eco Certified"
          : null,

        data.solar_power === "TRUE"
          ? "Solar Power"
          : null,

        data.rainwater_harvesting === "TRUE"
          ? "Rainwater Harvesting"
          : null,
      ].filter(Boolean),

      waste_management_score:
        Number(data.waste_management_score),

      sustainability_score:
        Number(data.sustainability_score),

      avg_rating:
        Number(data.avg_rating),

      review_count:
        Number(data.review_count),

      nearest_attraction:
        data.nearest_attraction,

      attraction_distance_km:
        Number(data.attraction_distance_km),

      images: [data.image_url],
    });
  })

  .on("end", async () => {
    try {
      await Homestay.insertMany(results);

      console.log(
        "Homestays Imported Successfully"
      );

      process.exit();
    } catch (err) {
      console.log(err);

      process.exit(1);
    }
  });