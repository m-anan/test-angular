/**
 * Offering Validation Service
 * Centralized validation logic for offering forms
 * Separates validation concerns from components
 */

import { Injectable } from '@angular/core';
import { OfferingState } from '../models/offering.model';
import { APP_CONSTANTS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class OfferingValidationService {
  /**
   * Validates step 1 (Type selection)
   */
  validateStep1(state: OfferingState): boolean {
    return state.offeringType === 'product' && !!state.productType
      ? true
      : !!state.offeringType && state.offeringType !== 'product';
  }

  /**
   * Validates step 2 (Details)
   */
  validateStep2(state: OfferingState): boolean {
    const hasName = state.name.trim().length > 0;
    const hasTagline = state.tagline.trim().length > 0;
    const nameValid = state.name.length <= APP_CONSTANTS.VALIDATION.MAX_NAME_LENGTH;
    const taglineValid = state.tagline.length <= APP_CONSTANTS.VALIDATION.MAX_TAGLINE_LENGTH;

    return hasName && hasTagline && nameValid && taglineValid;
  }

  /**
   * Validates step 3 (Tiers)
   */
  validateStep3(state: OfferingState): boolean {
    if (state.tiers.length === 0) {
      return false;
    }

    return state.tiers.every((tier) => {
      const hasName = tier.name.trim().length > 0;
      const priceValid =
        tier.requestQuoteOnly ||
        (tier.minPrice !== undefined && tier.maxPrice !== undefined) ||
        tier.price !== undefined;

      return hasName && priceValid;
    });
  }

  /**
   * Validates step 4 (Media)
   */
  validateStep4(state: OfferingState): boolean {
    // Media is optional, so always valid
    return true;
  }

  /**
   * Checks if current step is valid
   */
  isCurrentStepValid(state: OfferingState): boolean {
    switch (state.step) {
      case APP_CONSTANTS.STEPS.TYPE:
        return this.validateStep1(state);
      case APP_CONSTANTS.STEPS.DETAILS:
        return this.validateStep2(state);
      case APP_CONSTANTS.STEPS.TIERS:
        return this.validateStep3(state);
      case APP_CONSTANTS.STEPS.MEDIA:
        return this.validateStep4(state);
      default:
        return false;
    }
  }

  /**
   * Checks if user can proceed to next step
   */
  canProceed(state: OfferingState): boolean {
    return this.isCurrentStepValid(state);
  }

  /**
   * Gets validation errors for current step
   */
  getValidationErrors(state: OfferingState): string[] {
    const errors: string[] = [];

    switch (state.step) {
      case APP_CONSTANTS.STEPS.TYPE:
        if (!state.offeringType) {
          errors.push('Please select an offering type');
        }
        break;

      case APP_CONSTANTS.STEPS.DETAILS:
        if (!state.name.trim()) {
          errors.push('Offering name is required');
        }
        if (!state.tagline.trim()) {
          errors.push('Tagline is required');
        }
        if (state.name.length > APP_CONSTANTS.VALIDATION.MAX_NAME_LENGTH) {
          errors.push(
            `Name must be less than ${APP_CONSTANTS.VALIDATION.MAX_NAME_LENGTH} characters`
          );
        }
        break;

      case APP_CONSTANTS.STEPS.TIERS:
        if (state.tiers.length === 0) {
          errors.push('At least one tier is required');
        }
        state.tiers.forEach((tier, index) => {
          if (!tier.name.trim()) {
            errors.push(`Tier ${index + 1}: Name is required`);
          }
        });
        break;
    }

    return errors;
  }
}
