import { Request, Response } from "express";
import Booking from "../models/Booking";
import Homestay from "../models/Homestay";
import { pricingEngine } from "../services/dynamicPricing.service";


// ======================================
// CREATE BOOKING
// ======================================
export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      homestay_id,
      guest_name,
      guest_email,
      check_in,
      check_out,
      guests,
      rooms_booked = 1,
    } = req.body;

    // -----------------------------
    // VALIDATION
    // -----------------------------
    if (
      !homestay_id ||
      !guest_name ||
      !guest_email ||
      !check_in ||
      !check_out ||
      !guests
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);

    if (
      isNaN(checkInDate.getTime()) ||
      isNaN(checkOutDate.getTime())
    ) {
      return res.status(400).json({
        error: "Invalid date format",
      });
    }

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({
        error: "checkOut must be after checkIn",
      });
    }

    if (
      checkInDate <
      new Date(new Date().setHours(0, 0, 0, 0))
    ) {
      return res.status(400).json({
        error: "checkIn cannot be in the past",
      });
    }

    if (rooms_booked < 1) {
      return res.status(400).json({
        error: "Invalid rooms_booked",
      });
    }

    // -----------------------------
    // FETCH HOMESTAY
    // -----------------------------
    const homestay = await Homestay.findOne({
      homestay_id,
    });

    if (!homestay) {
      return res.status(404).json({
        error: "Homestay not found",
      });
    }

    // -----------------------------
    // GUEST CAPACITY CHECK
    // -----------------------------
    if (guests > homestay.max_guests) {
      return res.status(400).json({
        error: `Max guests allowed is ${homestay.max_guests}`,
      });
    }

    // -----------------------------
    // ROOM AVAILABILITY CHECK
    // -----------------------------
    const bookedRooms = await Booking.aggregate([
      {
        $match: {
          homestay_id,
          status: "confirmed",
          check_in: { $lt: checkOutDate },
          check_out: { $gt: checkInDate },
        },
      },
      {
        $group: {
          _id: null,
          totalRoomsBooked: {
            $sum: "$rooms_booked",
          },
        },
      },
    ]);

    const totalBooked =
      bookedRooms[0]?.totalRoomsBooked || 0;

    if (
      totalBooked + rooms_booked >
      homestay.room_count
    ) {
      return res.status(409).json({
        error:
          "No rooms available for selected dates",
      });
    }

    // -----------------------------
    // OCCUPANCY RATE
    // -----------------------------
    const occupancyRate =
      totalBooked / homestay.room_count;

    // -----------------------------
    // DYNAMIC PRICING
    // -----------------------------
    const breakdown =
      pricingEngine.calculatePrice(
        homestay,
        checkInDate,
        checkOutDate,
        { occupancyRate }
      );

    // -----------------------------
    // CREATE BOOKING
    // -----------------------------
    const booking = await Booking.create({
      homestay_id,
      vendor_id: homestay.vendor_id, // IMPORTANT FIX
      guest_name,
      guest_email,
      check_in: checkInDate,
      check_out: checkOutDate,
      guests,
      rooms_booked,
      price_per_night: breakdown.finalPrice,
      total_price: breakdown.totalPrice,
      status: "confirmed",
    });

    return res.status(201).json({
      success: true,
      booking,
      pricing: breakdown,
    });
  } catch (err) {
    console.error("[createBooking]", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};


// ======================================
// CANCEL BOOKING
// ======================================
export const cancelBooking = async (
  req: Request,
  res: Response
) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({
      booking_id: bookingId,
    });

    if (!booking) {
      return res.status(404).json({
        error: "Booking not found",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        error: "Booking already cancelled",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    return res.json({
      success: true,
      booking,
    });
  } catch (err) {
    console.error("[cancelBooking]", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};


// ======================================
// GET BOOKING
// ======================================
export const getBooking = async (
  req: Request,
  res: Response
) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({
      booking_id: bookingId,
    });

    if (!booking) {
      return res.status(404).json({
        error: "Booking not found",
      });
    }

    return res.json({
      success: true,
      booking,
    });
  } catch (err) {
    console.error("[getBooking]", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};