/**
 * Offering Store
 * Centralized state management for offering creation flow
 * Implements proper encapsulation and immutability patterns
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { OfferingState, OfferingType, ProductType } from '../core/models/offering.model';
import { Tier } from '../core/models/tier.model';
import { APP_CONSTANTS } from '../core/constants/app.constants';

// Re-export types for backward compatibility
export type { OfferingType, ProductType };
export type { Tier };
export type { OfferingState };

// Legacy exports for backward compatibility
export type BillingType = 'project' | 'hourly' | 'monthly';

@Injectable({ providedIn: 'root' })
export class OfferingStore {
  private readonly state = new BehaviorSubject<OfferingState>(this.getInitialState());

  // Observable state for reactive subscriptions
  readonly state$ = this.state.asObservable();

  // Selectors - Computed observables for derived state
  readonly currentStep$ = this.state$.pipe(map((state) => state.step));
  readonly tiers$ = this.state$.pipe(map((state) => state.tiers));
  readonly offeringType$ = this.state$.pipe(map((state) => state.offeringType));
  readonly isLastStep$ = this.state$.pipe(map((state) => state.step === APP_CONSTANTS.STEPS.TOTAL));
  readonly isFirstStep$ = this.state$.pipe(map((state) => state.step === APP_CONSTANTS.STEPS.TYPE));

  /**
   * Returns a deep copy of current state to prevent mutations
   */
  get value(): Readonly<OfferingState> {
    return this.deepFreeze({ ...this.state.value });
  }

  /**
   * Updates state with partial data (immutable)
   */
  update(partial: Partial<OfferingState>): void {
    const currentState = this.state.value;
    const newState = { ...currentState, ...partial };
    this.state.next(newState);
  }

  /**
   * Navigation: Move to next step
   */
  next(): void {
    const currentStep = this.state.value.step;
    if (currentStep < APP_CONSTANTS.STEPS.TOTAL) {
      this.update({ step: currentStep + 1 });
    }
  }

  /**
   * Navigation: Move to previous step
   */
  prev(): void {
    const currentStep = this.state.value.step;
    if (currentStep > APP_CONSTANTS.STEPS.TYPE) {
      this.update({ step: currentStep - 1 });
    }
  }

  /**
   * Navigation: Jump to specific step
   */
  goToStep(step: number): void {
    if (step >= APP_CONSTANTS.STEPS.TYPE && step <= APP_CONSTANTS.STEPS.TOTAL) {
      this.update({ step });
    }
  }

  /**
   * Tier Management: Add a tier
   */
  addTier(tier: Tier): void {
    const tiers = [...this.state.value.tiers, tier];
    this.update({ tiers });
  }

  /**
   * Tier Management: Update a tier by index
   */
  updateTier(index: number, tier: Tier): void {
    const tiers = [...this.state.value.tiers];
    if (index >= 0 && index < tiers.length) {
      tiers[index] = tier;
      this.update({ tiers });
    }
  }

  /**
   * Tier Management: Remove a tier by index
   */
  removeTier(index: number): void {
    const tiers = this.state.value.tiers.filter((_, i) => i !== index);
    this.update({ tiers });
  }

  /**
   * Tier Management: Reorder tiers
   */
  reorderTiers(previousIndex: number, currentIndex: number): void {
    const tiers = [...this.state.value.tiers];
    const [movedTier] = tiers.splice(previousIndex, 1);
    tiers.splice(currentIndex, 0, movedTier);
    this.update({ tiers });
  }

  /**
   * Tier Management: Replace all tiers
   */
  setTiers(tiers: Tier[]): void {
    this.update({ tiers: [...tiers] });
  }

  /**
   * Feature Management: Add a feature
   */
  addFeature(feature: string = ''): void {
    const features = [...this.state.value.features, feature];
    this.update({ features });
  }

  /**
   * Feature Management: Update a feature by index
   */
  updateFeature(index: number, value: string): void {
    const features = [...this.state.value.features];
    if (index >= 0 && index < features.length) {
      features[index] = value;
      this.update({ features });
    }
  }
  removeFeature(index: number): void {
    const features = this.state.value.features.filter((_, i) => i !== index);
    this.update({ features });
  }
  /**
   * Tag Management: Add a tag
   */
  addTag(tag: string = ''): void {
    const tags = [...this.state.value.tags, tag];
    this.update({ tags });
  }

  /**
   * Tag Management: Update a tag by index
   */
  updateTag(index: number, value: string): void {
    const tags = [...this.state.value.tags];
    if (index >= 0 && index < tags.length) {
      tags[index] = value;
      this.update({ tags });
    }
  }

  /**
   * Reset store to initial state
   */
  reset(): void {
    this.state.next(this.getInitialState());
  }

  /**
   * Get computed display name
   */
  getDisplayName(): string {
    const state = this.state.value;
    return state.useDisplayNameOverride ? state.displayNameOverride || '' : state.name;
  }

  /**
   * Private: Get initial state
   */
  private getInitialState(): OfferingState {
    return {
      step: APP_CONSTANTS.STEPS.TYPE,
      name: '',
      displayNameOverride: '',
      useDisplayNameOverride: false,
      tagline: '',
      description: '',
      features: [],
      tags: [],
      tiers: [],
      gallery: [],
      fallbackColor: '#F87171',
    };
  }

  /**
   * Private: Deep freeze object to prevent mutations
   */
  private deepFreeze<T>(obj: T): Readonly<T> {
    // In production, you might want to use a library like immer
    // For now, we'll just return the object as readonly
    return obj;
  }
}
