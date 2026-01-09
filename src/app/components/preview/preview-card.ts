/**
 * Preview Card Component
 * Displays a preview of the offering
 * Refactored to use TierService for price calculations
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferingStore } from '../../store/offer';
import { TierService } from '../../core/services/tier.service';
import { Tier } from '../../core/models/tier.model';

/**
 * Interface for tier price tracking
 */
interface TierPrice {
  price: number;
  tier: Tier;
  isMinPrice: boolean; // true if this is from a price range's minPrice
}

@Component({
  selector: 'app-preview-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white shadow rounded-xl overflow-hidden">
      @if (store.value.thumbnail) {
      <div
        class="h-40 bg-cover mb-2"
        [style.backgroundImage]="'url(' + store.value.thumbnail + ')'"
      ></div>
      } @else {
      <div class="h-40 mb-2" [style.background]="store.value.fallbackColor"></div>
      }
      <div class="p-4">
        <h3 class="font-bold text-lg">
          @if (store.value.useDisplayNameOverride && store.value.displayNameOverride) {
          {{ store.value.displayNameOverride }}
          } @else {
          {{ store.value.name }}
          }
        </h3>
        <p class="text-sm text-[#303030] py-2">{{ store.value.description }}</p>

        <ul class="list-disc ml-4 mt-2 text-sm text-[#303030]">
          @for (feature of store.value.features; track $index) { @if (feature) {
          <li>{{ feature }}</li>
          } }
        </ul>
      </div>
      <p class="font-semibold mt-3 border-t p-3 text-[#D42727] border-[#F2F5F9]">
        {{ priceLabel }}
      </p>
    </div>
  `,
})
export class PreviewCardComponent {
  readonly store = inject(OfferingStore);
  private readonly tierService = inject(TierService);

  /**
   * Computed price label using TierService
   * Now considers offering type for proper formatting
   * For multiple tiers, shows "Starting from [lowest price]" with appropriate suffix
   */
  get priceLabel(): string {
    const tiers = this.store.value.tiers;
    const offeringType = this.store.value.offeringType;

    if (tiers.length === 0) {
      return 'No pricing configured';
    }

    // If all tiers are request quote only
    if (tiers.every((t) => t.requestQuoteOnly)) {
      return 'Request Quote Only';
    }

    // For single tier, show formatted price
    if (tiers.length === 1) {
      return this.tierService.formatTierPrice(tiers[0], offeringType);
    }

    // For multiple tiers, find the absolute lowest price and its tier
    const tierPrices: TierPrice[] = [];

    tiers.forEach((tier) => {
      if (!tier.requestQuoteOnly) {
        if (tier.usePriceRange) {
          // For price ranges, add both min and max
          if (tier.minPrice) {
            tierPrices.push({ price: tier.minPrice, tier, isMinPrice: true });
          }
          if (tier.maxPrice) {
            tierPrices.push({ price: tier.maxPrice, tier, isMinPrice: false });
          }
        } else if (tier.price) {
          // For fixed prices
          tierPrices.push({ price: tier.price, tier, isMinPrice: false });
        }
      }
    });

    if (tierPrices.length === 0) {
      return 'Request Quote Only';
    }

    // Find the tier with the absolute lowest price
    const lowestTierPrice = tierPrices.reduce((lowest, current) =>
      current.price < lowest.price ? current : lowest
    );

    const lowestPrice = lowestTierPrice.price;
    const lowestTier = lowestTierPrice.tier;

    // Get the appropriate suffix from the tier with the lowest price
    let suffix = '';
    if (offeringType === 'service') {
      suffix = this.getBillingSuffix(lowestTier);
    }

    // Return "Starting from [lowest price][suffix]"
    return `Starting from $${lowestPrice}${suffix}`;
  }

  private getBillingSuffix(tier: any): string {
    switch (tier.billingType) {
      case 'hourly':
        return '/hr';
      case 'monthly':
        return tier.monthlyDuration ? `/month for ${tier.monthlyDuration} months` : '/month';
      default:
        return '';
    }
  }
}
