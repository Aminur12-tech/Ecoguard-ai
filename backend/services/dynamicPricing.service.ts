// src/services/dynamicPricing.service.ts

import { IHomestay } from "../models/Homestay";
import { PRICING_CONFIG as CFG } from "../config/pricing.config";

export interface PriceBreakdown {
  basePrice: number;
  demandMultiplier: number;
  supplyMultiplier: number;
  propertyMultiplier: number;
  finalMultiplier: number;
  finalPrice: number;
  nights: number;
  totalPrice: number;
}

export interface SupplyContext {
  occupancyRate: number;       // 0–1, how booked the homestay is for those dates
  districtAvailability?: number; // optional: 0–1, how many similar places are free
}

export class DynamicPricingEngine {

  calculatePrice(
    homestay: IHomestay,
    checkIn: Date,
    checkOut: Date,
    supply: SupplyContext
  ): PriceBreakdown {
    const nights = this.getNights(checkIn, checkOut);
    const demandMultiplier  = this.getDemandMultiplier(checkIn);
    const supplyMultiplier  = this.getSupplyMultiplier(supply);
    const propertyMultiplier = this.getPropertyMultiplier(homestay);

    // Combine and clamp
    const rawMultiplier = demandMultiplier * supplyMultiplier * propertyMultiplier;
    const finalMultiplier = Math.min(
      Math.max(rawMultiplier, CFG.MIN_MULTIPLIER),
      CFG.MAX_MULTIPLIER
    );

    const finalPrice = Math.round(homestay.price_per_night_inr * finalMultiplier);
    return {
      basePrice: homestay.price_per_night_inr,
      demandMultiplier,
      supplyMultiplier,
      propertyMultiplier,
      finalMultiplier,
      finalPrice,
      nights,
      totalPrice: finalPrice * nights,
    };
  }

  private getDemandMultiplier(checkIn: Date): number {
    const month = checkIn.getMonth();
    const day   = checkIn.getDay(); // 0=Sun, 6=Sat
    const daysAhead = Math.floor((checkIn.getTime() - Date.now()) / 86_400_000);

    // Season
    let seasonal = CFG.demand.offSeasonMultiplier;
    if (CFG.demand.peakMonths.includes(month))    seasonal = CFG.demand.peakMultiplier;
    if (CFG.demand.shoulderMonths.includes(month)) seasonal = CFG.demand.shoulderMultiplier;

    // Weekend
    const isWeekend = day === 5 || day === 6;
    const dayFactor = isWeekend ? CFG.demand.weekend : CFG.demand.weekday;

    // Advance booking
    const rule = [...CFG.demand.advanceBookingRules]
      .sort((a, b) => b.daysAhead - a.daysAhead)
      .find(r => daysAhead >= r.daysAhead);
    const advanceFactor = rule?.multiplier ?? 1.0;

    return seasonal * dayFactor * advanceFactor;
  }

  private getSupplyMultiplier(supply: SupplyContext): number {
    const rule = CFG.supply.occupancyRules.find(
      r => supply.occupancyRate >= r.threshold
    );
    return rule?.multiplier ?? 1.0;
  }

  private getPropertyMultiplier(homestay: IHomestay): number {
    // Rating
    const ratingRule = CFG.property.ratingRules.find(
      r => homestay.avg_rating >= r.minRating
    );
    let multiplier = ratingRule?.multiplier ?? 1.0;

    // Eco certification
    if (homestay.eco_certified) {
      multiplier *= CFG.property.ecoCertifiedBonus;
    }

    // Sustainability score (linear bonus above 50)
    if (homestay.sustainability_score > 50) {
      multiplier += (homestay.sustainability_score - 50) * CFG.property.sustainabilityScoreWeight;
    }

    return multiplier;
  }

  private getNights(checkIn: Date, checkOut: Date): number {
    return Math.max(
      1,
      Math.floor((checkOut.getTime() - checkIn.getTime()) / 86_400_000)
    );
  }
}

export const pricingEngine = new DynamicPricingEngine();