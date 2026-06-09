import mongoose, { Schema, Document } from "mongoose";

export interface IHomestay extends Document {
  homestay_id: string;
  homestay_name: string;
  host_name: string;

  district: string;
  village_town: string;

  location: {
    latitude: number;
    longitude: number;
  };

  property_type: string;

  room_count: number;
  max_guests: number;

  price_per_night_inr: number;

  breakfast_included: boolean;
  wifi: boolean;
  parking: boolean;
  pet_friendly: boolean;

  amenities: string[];

  local_food_available: boolean;

  eco_certified: boolean;
  solar_power: boolean;
  rainwater_harvesting: boolean;

  eco_features: string[];

  waste_management_score: number;
  sustainability_score: number;

  avg_rating: number;
  review_count: number;

  nearest_attraction: string;
  attraction_distance_km: number;

  images: string[];

  min_price_override?: number;  
  max_price_override?: number;
}

const HomestaySchema = new Schema<IHomestay>(
  {
    homestay_id: {
      type: String,
      required: true,
      unique: true,
    },

    homestay_name: {
      type: String,
      required: true,
    },

    host_name: String,

    district: String,

    village_town: String,

    location: {
      latitude: Number,
      longitude: Number,
    },

    property_type: String,

    room_count: Number,

    max_guests: Number,

    price_per_night_inr: Number,

    breakfast_included: Boolean,

    wifi: Boolean,

    parking: Boolean,

    pet_friendly: Boolean,

    amenities: [String],

    local_food_available: Boolean,

    eco_certified: Boolean,

    solar_power: Boolean,

    rainwater_harvesting: Boolean,

    eco_features: [String],

    waste_management_score: Number,

    sustainability_score: Number,

    avg_rating: Number,

    review_count: Number,

    nearest_attraction: String,

    attraction_distance_km: Number,

    images: [String],

    min_price_override: { type: Number, default: null },  
    
    max_price_override: { type: Number, default: null },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model<IHomestay>(
  "Homestay",
  HomestaySchema
);