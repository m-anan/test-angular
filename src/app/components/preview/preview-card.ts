/**
 * Preview Card Component
 * Displays a preview of the offering
 * Refactored to use TierService for price calculations
 */

import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferingStore } from '../../store/offer';
import { TierService } from '../../core/services/tier.service';
import { Tier } from '../../core/models/tier.model';
import { Subscription } from 'rxjs';

/**
 * Interface for tier price tracking
 */
interface TierPrice {
  price: number; // Display price (actual price shown to user)
  normalizedMonthlyPrice: number; // Normalized to monthly for fair comparison
  tier: Tier;
  isMinPrice: boolean; // true if this is from a price range's minPrice
}

@Component({
  selector: 'app-preview-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white shadow-xl rounded-xl overflow-hidden">
      @if (store.value.thumbnail) {
      <div
        class="h-40 bg-cover  "
        [style.backgroundImage]="'url(' + store.value.thumbnail + ')'"
      ></div>
      } @else {
      <div
        class="h-40"
        [style.background-image]="
          'linear-gradient(45deg, ' +
          store.value.fallbackColor +
          ' 20%, ' +
          'rgb(51 51 51 / 89%) 100%)'
        "
      ></div>
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

        <ul class="list-disc ml-4 my-2 text-xs text-[#303030]">
          @for (feature of store.value.features | slice:0:3; track $index) { @if (feature) {
          <li>{{ feature }}</li>
          } }
        </ul>
        @if (store.value.features.length > 3) {
        <span class="text-xs text-gray-600 p-2 rounded-xl font-medium bg-[#CDE7E4]">
          +{{ store.value.features.length - 3 }} Tiers</span
        >
        }
      </div>
      <p class="font-semibold mt-3 border-t p-3 text-[#D42727] border-[#F2F5F9]">
        {{ priceLabel }}
      </p>
    </div>
  `,
})
export class PreviewCardComponent implements OnInit, OnDestroy {
  readonly store = inject(OfferingStore);
  private readonly tierService = inject(TierService);
  private readonly cdr = inject(ChangeDetectorRef);
  private subscription?: Subscription;

  ngOnInit(): void {
    // Subscribe to store changes to trigger change detection with OnPush
    this.subscription = this.store.state$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Computed price label using TierService
   * Now considers offering type for proper formatting
   * For multiple tiers, shows "Starting from [lowest price]" with appropriate suffix
   * Compares prices fairly by normalizing to the same billing period
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

    // For multiple tiers, find the tier with lowest normalized monthly price
    // This ensures fair comparison across different billing types
    const tierPrices: TierPrice[] = [];

    tiers.forEach((tier) => {
      if (!tier.requestQuoteOnly) {
        if (tier.usePriceRange) {
          // For price ranges, use min price
          if (tier.minPrice) {
            tierPrices.push({
              price: tier.minPrice,
              normalizedMonthlyPrice: this.normalizeToMonthly(tier.minPrice, tier.billingType),
              tier,
              isMinPrice: true
            });
          }
        } else if (tier.price) {
          // For fixed prices
          tierPrices.push({
            price: tier.price,
            normalizedMonthlyPrice: this.normalizeToMonthly(tier.price, tier.billingType),
            tier,
            isMinPrice: false
          });
        }
      }
    });

    if (tierPrices.length === 0) {
      return 'Request Quote Only';
    }

    // Find the tier with the lowest normalized monthly price for fair comparison
    // This ensures $200/hr is correctly identified as more expensive than $199/month
    const lowestTierPrice = tierPrices.reduce((lowest, current) =>
      current.normalizedMonthlyPrice < lowest.normalizedMonthlyPrice ? current : lowest
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

  /**
   * Normalizes prices to monthly equivalent for fair comparison
   * Assumes standard work month of 160 hours (40 hours/week * 4 weeks)
   */
  private normalizeToMonthly(price: number, billingType: string): number {
    switch (billingType) {
      case 'hourly':
        // 160 hours per month (40 hours/week * 4 weeks)
        return price * 160;
      case 'monthly':
        return price;
      case 'project':
        // For project-based pricing, treat as one-time (equivalent to 1 month)
        return price;
      default:
        return price;
    }
  }

  private getBillingSuffix(tier: Tier): string {
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
