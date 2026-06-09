// src/routes/booking.routes.ts
import { Router } from "express";
import { createBooking, cancelBooking, getBooking } from "../controllers/booking.controller";

const router = Router();

router.post("/",                    createBooking);
router.get("/:bookingId",           getBooking);
router.patch("/:bookingId/cancel",  cancelBooking);

export default router;