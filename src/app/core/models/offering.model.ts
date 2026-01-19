/**
 * Offering-related type definitions and interfaces
 * Centralized type definitions for the offering domain
 */

import { Tier } from './tier.model';

export type OfferingType = 'product' | 'service' | 'subscription';
export type ProductType = 'physical' | 'digital';

export interface OfferingState {
  step: number;
  offeringType?: OfferingType;
  productType?: ProductType;

  name: string;
  displayNameOverride?: string;
  useDisplayNameOverride: boolean;
  tagline: string;
  description: string;
  features: string[];
  tags: string[];

  tiers: Tier[];

  thumbnail?: string;
  gallery: string[];
  fallbackColor?: string;
}

export interface StepInfo {
  number: number;
  name: string;
  completed: boolean;
}

export interface OfferingFormValidation {
  step1Valid: boolean;
  step2Valid: boolean;
  step3Valid: boolean;
  step4Valid: boolean;
}
