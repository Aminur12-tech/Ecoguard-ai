import express from "express";

import {
  getTodayForecast
} from "../controllers/forecast.controller";

const router = express.Router();

router.get(
  "/today",
  getTodayForecast
);

export default router;