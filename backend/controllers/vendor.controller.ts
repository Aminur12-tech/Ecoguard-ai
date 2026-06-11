import { Request, Response } from "express";
import Booking from "../models/Booking";
import Homestay from "../models/Homestay";

export const getVendorDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const { vendorId } = req.params;

    // -----------------------------
    // Vendor Homestays
    // -----------------------------
    const homestays = await Homestay.find({
      vendor_id: vendorId,
    });

    const homestayIds = homestays.map(
      (h) => h.homestay_id
    );

    // -----------------------------
    // Vendor Bookings
    // -----------------------------
    const bookings = await Booking.find({
      vendor_id: vendorId,
      status: "confirmed",
    }).sort({
      createdAt: -1,
    });

    // -----------------------------
    // Revenue
    // -----------------------------
    const totalRevenue = bookings.reduce(
      (sum, booking) =>
        sum + booking.total_price,
      0
    );

    // -----------------------------
    // Active Bookings
    // -----------------------------
    const today = new Date();

    const activeBookings =
      bookings.filter(
        (booking) =>
          booking.check_in <= today &&
          booking.check_out >= today
      ).length;

    // -----------------------------
    // Occupancy
    // -----------------------------
    const totalRooms = homestays.reduce(
      (sum, h) => sum + h.room_count,
      0
    );

    const occupiedRooms = bookings.reduce(
      (sum, booking) =>
        sum + booking.rooms_booked,
      0
    );

    const occupancyRate =
      totalRooms > 0
        ? (
            (occupiedRooms /
              totalRooms) *
            100
          ).toFixed(2)
        : "0";

    // -----------------------------
    // Response
    // -----------------------------
    return res.json({
      success: true,

      stats: {
        totalRevenue,
        totalBookings:
          bookings.length,
        activeBookings,
        occupancyRate,
        totalHomestays:
          homestays.length,
      },

      homestays,

      recentBookings:
        bookings.slice(0, 10),
    });
  } catch (err) {
    console.error(
      "[getVendorDashboard]",
      err
    );

    return res.status(500).json({
      error:
        "Failed to load dashboard",
    });
  }
};