// src/models/Booking.ts
import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IBooking extends Document {
  booking_id: string;
  homestay_id: string;
  guest_name: string;
  guest_email: string;
  check_in: Date;
  check_out: Date;
  guests: number;
  rooms_booked: number;
  price_per_night: number;
  total_price: number;
  status: "pending" | "confirmed" | "cancelled";
}

const BookingSchema = new Schema<IBooking>(
  {
    booking_id: {
      type: String,
      unique: true,
      default: () => `BK-${uuidv4().slice(0, 8).toUpperCase()}`, // e.g. BK-3F9A1C2D
    },
    homestay_id:     { type: String, required: true, index: true },
    guest_name:      { type: String, required: true },
    guest_email:     { type: String, required: true },
    check_in:        { type: Date, required: true },
    check_out:       { type: Date, required: true },
    guests:          { type: Number, required: true },
    rooms_booked:    { type: Number, default: 1 },
    price_per_night: { type: Number, required: true },
    total_price:     { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Compound index — speeds up the occupancy countDocuments query
BookingSchema.index({ homestay_id: 1, status: 1, check_in: 1, check_out: 1 });

export default mongoose.model<IBooking>("Booking", BookingSchema);