/**
 * Tier-related type definitions and interfaces
 * Provides strong typing for tier management
 */

export type BillingType = 'project' | 'hourly' | 'monthly';

export interface Tier {
  id: string;
  name: string;
  bullets: string[];
  billingType: BillingType;

  // Pricing fields
  price?: number; // Fixed price (for product/subscription or when usePriceRange is false)
  minPrice?: number; // Minimum price (when usePriceRange is true)
  maxPrice?: number; // Maximum price (when usePriceRange is true)
  usePriceRange?: boolean; // Toggle for price range (service only)

  // Service-specific fields
  monthlyDuration?: number; // Number of months for monthly retainer (1-12)

  // Subscription-specific fields
  enableYearlyDiscount?: boolean; // Toggle for yearly discount
  yearlyDiscountPercent?: number; // Discount percentage (5-95)

  requestQuoteOnly: boolean;
  popular: boolean;
}

export interface TierTemplate {
  name: string;
  popular: boolean;
}

export interface TierFormData {
  name: string;
  billingType: BillingType;
  minPrice?: number;
  maxPrice?: number;
  requestQuoteOnly: boolean;
  popular: boolean;
  bullets: string[];
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface TierValidationResult {
  valid: boolean;
  errors: string[];
}
