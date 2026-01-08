import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type OfferingType = 'product' | 'service' | 'subscription';
export type ProductType = 'physical' | 'digital';
export type BillingType = 'project' | 'hourly' | 'monthly';

export interface Tier {
  id: string;
  name: string;
  bullets: string[];
  billingType: BillingType;
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  requestQuoteOnly: boolean;
  popular: boolean;
}

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

@Injectable({ providedIn: 'root' })
export class OfferingStore {
  private state = new BehaviorSubject<OfferingState>({
    step: 1,
    name: '',
    displayNameOverride: '',
    useDisplayNameOverride: false,
    tagline: '',
    description: '',
    features: [],
    tags: [],
    tiers: [],
    gallery: [],
  });

  state$ = this.state.asObservable();

  get value() {
    return this.state.value;
  }

  update(partial: Partial<OfferingState>) {
    this.state.next({ ...this.value, ...partial });
  }

  next() {
    this.update({ step: this.value.step + 1 });
  }

  prev() {
    this.update({ step: this.value.step - 1 });
  }
}
