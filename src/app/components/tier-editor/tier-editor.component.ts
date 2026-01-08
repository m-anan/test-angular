/**
 * Tier Editor Component
 * Handles editing of a single tier's details and pricing
 * Separates tier editing logic from the main step component
 * Now supports dynamic pricing UI based on offering type
 */

import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tier } from '../../core/models/tier.model';
import { OfferingType } from '../../core/models/offering.model';
import { FormInputComponent } from '../../shared/form-input/form-input';
import { TierService } from '../../core/services/tier.service';

@Component({
  selector: 'app-tier-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, FormInputComponent],
  templateUrl: './tier-editor.component.html',
})
export class TierEditorComponent {
  private readonly tierService = inject(TierService);

  @Input() tier!: Tier;
  @Input() offeringName = '';
  @Input() offeringType?: OfferingType;
  @Input() useDisplayNameOverride = false;
  @Input() displayNameOverride = '';

  @Output() tierChange = new EventEmitter<Tier>();
  @Output() displayNameOverrideChange = new EventEmitter<string>();
  @Output() useDisplayNameOverrideChange = new EventEmitter<boolean>();
  @Output() addBullet = new EventEmitter<void>();
  @Output() deleteTier = new EventEmitter<void>();

  // Discount percentage options for subscriptions
  readonly discountOptions = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  ];

  onTierPropertyChange(property: keyof Tier, value: any): void {
    const updatedTier = { ...this.tier, [property]: value };
    this.tierChange.emit(updatedTier);
  }

  onBulletChange(index: number, value: string): void {
    const bullets = [...this.tier.bullets];
    bullets[index] = value;
    this.onTierPropertyChange('bullets', bullets);
  }

  onAddBullet(): void {
    this.addBullet.emit();
  }

  onDeleteTier(): void {
    this.deleteTier.emit();
  }

  get displayName(): string {
    return this.useDisplayNameOverride ? this.displayNameOverride || '' : this.offeringName;
  }

  get isService(): boolean {
    return this.offeringType === 'service';
  }

  get isProduct(): boolean {
    return this.offeringType === 'product';
  }

  get isSubscription(): boolean {
    return this.offeringType === 'subscription';
  }

  get showPriceRangeToggle(): boolean {
    return this.isService;
  }

  get showBillingTypeDropdown(): boolean {
    return this.isService;
  }

  get showMonthlyDuration(): boolean {
    return this.isService && this.tier.billingType === 'monthly';
  }

  get showYearlyDiscount(): boolean {
    return this.isSubscription;
  }

  get calculatedYearlyPrice(): number {
    if (!this.tier.enableYearlyDiscount || !this.tier.yearlyDiscountPercent || !this.tier.price) {
      return 0;
    }
    return this.tierService.calculateYearlyPrice(this.tier.price, this.tier.yearlyDiscountPercent);
  }

  get monthOptions(): number[] {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }
}
