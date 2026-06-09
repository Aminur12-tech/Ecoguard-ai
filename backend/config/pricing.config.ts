// src/config/pricing.config.ts

export const PRICING_CONFIG = {
  // Hard bounds — final price never goes outside these
  MIN_MULTIPLIER: 0.7,
  MAX_MULTIPLIER: 2.5,

  demand: {
    // Peak seasons (month indices, 0-based)
    peakMonths: [9, 10, 11, 0],       // Oct–Jan (Assam/NE tourist season)
    shoulderMonths: [2, 3, 6, 7],     // Mar–Apr, Jul–Aug
    peakMultiplier: 1.4,
    shoulderMultiplier: 1.15,
    offSeasonMultiplier: 0.9,

    weekend: 1.2,    // Fri–Sat
    weekday: 1.0,

    // Last-minute discount vs early-bird premium
    advanceBookingRules: [
      { daysAhead: 1,   multiplier: 0.85 }, // tomorrow: discount
      { daysAhead: 7,   multiplier: 0.95 },
      { daysAhead: 30,  multiplier: 1.0  },
      { daysAhead: 90,  multiplier: 1.1  }, // 3 months out: early-bird premium
    ],
  },

  supply: {
    // Occupancy thresholds → multipliers
    occupancyRules: [
      { threshold: 0.9, multiplier: 1.3 },  // >90% booked: surge
      { threshold: 0.7, multiplier: 1.1 },
      { threshold: 0.4, multiplier: 1.0 },
      { threshold: 0.0, multiplier: 0.9 },  // low demand: discount
    ],
  },

  property: {
    ratingRules: [
      { minRating: 4.8, multiplier: 1.2 },
      { minRating: 4.5, multiplier: 1.1 },
      { minRating: 4.0, multiplier: 1.0 },
      { minRating: 0,   multiplier: 0.95 },
    ],
    ecoCertifiedBonus: 1.08,
    sustainabilityScoreWeight: 0.002, // per point above 50
  },
};