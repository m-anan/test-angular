/**
 * Tier Service
 * Handles all tier-related business logic and operations
 * Follows Single Responsibility Principle
 */

import { Injectable } from '@angular/core';
import { Tier, TierTemplate, TierValidationResult } from '../models/tier.model';
import { APP_CONSTANTS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class TierService {
  /**
   * Creates a new tier with default values
   */
  createTier(name: string = '', popular: boolean = false): Tier {
    return {
      id: crypto.randomUUID(),
      name,
      bullets: [],
      billingType: APP_CONSTANTS.DEFAULTS.BILLING_TYPE,
      requestQuoteOnly: false,
      popular,
    };
  }

  /**
   * Creates multiple tiers from templates
   */
  createTiersFromTemplates(templates: readonly TierTemplate[]): Tier[] {
    return templates.map((template) => this.createTier(template.name, template.popular));
  }

  /**
   * Validates a tier
   */
  validateTier(tier: Tier): TierValidationResult {
    const errors: string[] = [];

    if (!tier.name.trim()) {
      errors.push('Tier name is required');
    }

    if (tier.name.length > APP_CONSTANTS.VALIDATION.MAX_TIER_NAME_LENGTH) {
      errors.push(
        `Tier name must be less than ${APP_CONSTANTS.VALIDATION.MAX_TIER_NAME_LENGTH} characters`
      );
    }

    if (!tier.requestQuoteOnly) {
      if (tier.minPrice !== undefined && tier.maxPrice !== undefined) {
        if (tier.minPrice > tier.maxPrice) {
          errors.push('Minimum price cannot be greater than maximum price');
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Calculates price range from tiers
   */
  calculatePriceRange(tiers: Tier[]): { min: number; max: number } | null {
    const prices = tiers
      .filter((t) => !t.requestQuoteOnly)
      .flatMap((t) => [t.minPrice, t.maxPrice].filter((p): p is number => p !== undefined));

    if (prices.length === 0) {
      return null;
    }

    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }

  /**
   * Formats price label for display
   */
  formatPriceLabel(tiers: Tier[]): string {
    const priceRange = this.calculatePriceRange(tiers);

    if (!priceRange) {
      return 'Request Quote Only';
    }

    const { min, max } = priceRange;
    return min === max ? `Starting from $${min}` : `$${min} - $${max}`;
  }

  /**
   * Calculates yearly discounted price for subscriptions
   */
  calculateYearlyPrice(monthlyPrice: number, discountPercent: number): number {
    const yearlyPrice = monthlyPrice * 12;
    const discount = yearlyPrice * (discountPercent / 100);
    return yearlyPrice - discount;
  }

  /**
   * Formats price display based on tier configuration and offering type
   */
  formatTierPrice(tier: Tier, offeringType?: string): string {
    if (tier.requestQuoteOnly) {
      return 'Request Quote';
    }

    // For services with price range
    if (offeringType === 'service' && tier.usePriceRange) {
      const min = tier.minPrice || 0;
      const max = tier.maxPrice || 0;
      const suffix = this.getBillingTypeSuffix(tier.billingType, tier.monthlyDuration);
      return `$${min} - $${max}${suffix}`;
    }

    // For fixed price
    const price = tier.price || tier.minPrice || 0;

    // Subscription with yearly discount
    if (
      offeringType === 'subscription' &&
      tier.enableYearlyDiscount &&
      tier.yearlyDiscountPercent
    ) {
      const yearlyPrice = this.calculateYearlyPrice(price, tier.yearlyDiscountPercent);
      return `$${price}/month (User Pays: $${yearlyPrice.toFixed(2)}/year)`;
    }

    // Service with billing type suffix
    if (offeringType === 'service') {
      const suffix = this.getBillingTypeSuffix(tier.billingType, tier.monthlyDuration);
      return `$${price}${suffix}`;
    }

    // Product or subscription without discount
    return `$${price}`;
  }

  /**
   * Gets the appropriate suffix for billing type
   */
  private getBillingTypeSuffix(billingType: string, monthlyDuration?: number): string {
    switch (billingType) {
      case 'hourly':
        return '/hr';
      case 'monthly':
        return monthlyDuration ? `/month for ${monthlyDuration} months` : '/month';
      case 'project':
      default:
        return '';
    }
  }

  /**
   * Adds a bullet point to a tier
   */
  addBulletPoint(tier: Tier, bullet: string = ''): Tier {
    return {
      ...tier,
      bullets: [...tier.bullets, bullet],
    };
  }

  /**
   * Removes a bullet point from a tier
   */
  removeBulletPoint(tier: Tier, index: number): Tier {
    return {
      ...tier,
      bullets: tier.bullets.filter((_, i) => i !== index),
    };
  }

  /**
   * Updates a bullet point in a tier
   */
  updateBulletPoint(tier: Tier, index: number, value: string): Tier {
    const bullets = [...tier.bullets];
    bullets[index] = value;
    return {
      ...tier,
      bullets,
    };
  }

  /**
   * Clones a tier with a new ID
   */
  cloneTier(tier: Tier): Tier {
    return {
      ...tier,
      id: crypto.randomUUID(),
      name: `${tier.name} (Copy)`,
    };
  }
}
