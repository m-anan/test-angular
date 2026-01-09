/**
 * Tier Editor Component
 * Handles editing of a single tier's details and pricing
 * Separates tier editing logic from the main step component
 * Now supports dynamic pricing UI based on offering type
 */

import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tier, BillingType } from '../../core/models/tier.model';
import { OfferingType } from '../../core/models/offering.model';
import { FormInputComponent } from '../shared/form-input/form-input';
import { TierService } from '../../core/services/tier.service';
import {
  getInputValue,
  getCheckboxValue,
  getNumberValue,
  getSelectValue,
} from '../../core/utils/event-helpers';
import { OfferingStore } from '../../store/offer';

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

  // Generate unique ID for accessibility
  private static nextId = 0;
  readonly componentId = `tier-editor-${TierEditorComponent.nextId++}`;

  // Discount percentage options for subscriptions
  readonly discountOptions = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  ];
  readonly store = inject(OfferingStore);

  // Type-safe property update methods
  onTierPropertyChange(
    property: keyof Tier,
    value: string | number | boolean | string[] | BillingType | undefined
  ): void {
    const updatedTier = { ...this.tier, [property]: value };
    this.tierChange.emit(updatedTier);
  }

  onBulletChange(index: number, event: Event): void {
    const bullets = [...this.tier.bullets];
    bullets[index] = getInputValue(event);
    this.onTierPropertyChange('bullets', bullets);
  }

  onCheckboxChange(property: keyof Tier, event: Event): void {
    this.onTierPropertyChange(property, getCheckboxValue(event));
  }

  onInputChange(property: keyof Tier, event: Event): void {
    this.onTierPropertyChange(property, getInputValue(event));
  }

  onNumberInputChange(property: keyof Tier, event: Event): void {
    this.onTierPropertyChange(property, getNumberValue(event));
  }

  onSelectChange<T extends keyof Tier>(property: T, value: Tier[T]): void {
    this.onTierPropertyChange(property, value);
  }

  onSelectNumberChange(property: keyof Tier, event: Event): void {
    const value = getSelectValue(event);
    this.onTierPropertyChange(property, +value);
  }

  onDisplayNameOverrideCheckboxChange(event: Event): void {
    this.useDisplayNameOverrideChange.emit(getCheckboxValue(event));
  }

  onDisplayNameOverrideInputChange(event: Event): void {
    this.displayNameOverrideChange.emit(getInputValue(event));
  }

  onAddBullet(): void {
    this.addBullet.emit();
  }

  onDeleteTier(): void {
    this.deleteTier.emit();
  }
  onGoToStep1(): void {
    this.store.goToStep(1);
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
  get yearlyPrice(): number {
    if (!this.tier.price) {
      return 0;
    }
    return this.tier.price * 12;
  }
  get monthOptions(): number[] {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }
}
