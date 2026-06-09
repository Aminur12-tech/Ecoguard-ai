// src/models/PricingLog.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IPricingLog extends Document {
  homestay_id: string;
  check_in: Date;
  check_out: Date;
  base_price: number;
  demand_multiplier: number;
  supply_multiplier: number;
  property_multiplier: number;
  final_multiplier: number;
  final_price: number;
  occupancy_rate: number;
  created_at: Date;
}

const PricingLogSchema = new Schema<IPricingLog>(
  {
    homestay_id:          { type: String, required: true, index: true },
    check_in:             { type: Date, required: true },
    check_out:            { type: Date, required: true },
    base_price:           Number,
    demand_multiplier:    Number,
    supply_multiplier:    Number,
    property_multiplier:  Number,
    final_multiplier:     Number,
    final_price:          Number,
    occupancy_rate:       Number,
  },
  { timestamps: true }
);

export default mongoose.model<IPricingLog>("PricingLog", PricingLogSchema);