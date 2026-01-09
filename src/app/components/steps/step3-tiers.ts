/**
 * Step 3: Tiers Component
 * Manages tier configuration for the offering
 * Refactored for modularity and single responsibility
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OfferingStore, Tier } from '../../store/offer';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { TierService } from '../../core/services/tier.service';
import { TierTabComponent } from '../tier-tab/tier-tab.component';
import { TierEditorComponent } from '../tier-editor/tier-editor.component';
import { TierRecommendationComponent } from '../tier-recommendation/tier-recommendation.component';
import { TIER_TEMPLATES } from '../../core/constants/app.constants';
import { PreviewButtonComponent } from '../preview-button/preview-button';

@Component({
  selector: 'app-step3-tiers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    TierTabComponent,
    TierEditorComponent,
    TierRecommendationComponent,
    PreviewButtonComponent,
  ],
  template: `
    <div class="flex justify-between items-center w-full">
      <div class="">
        <h2 class="text-2xl font-semibold">Tier & Pricing Breakdown</h2>
        <p>Configure your offering price and (optional) tiers</p>
      </div>
      <app-preview-button />
    </div>

    <div class="p-8 py-4 bg-white rounded-3xl mt-5">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-semibold ">Tiers</h2>
        <span class="text-sm text-[#303030]">
          Selected offering type:
          <span class="text-[#DE768A] capitalize font-medium">{{ offeringType }}</span></span
        >
      </div>
      <!-- Tier Recommendation (shown when no tiers exist) -->
      @if (hasTiers === false) {
      <app-tier-recommendation
        (useRecommended)="useRecommendedStructure()"
        (buildCustom)="buildYourOwn()"
      />
      }

      <!-- Tier Editor (shown when tiers exist) -->
      @if (hasTiers) {
      <div class="border border-[#F2F5F9] overflow-hidden rounded-3xl">
        <!-- Tier Tabs -->
        <div class="bg-[#F2F5F9] p-2">
          <div cdkDropList class="flex gap-3" (cdkDropListDropped)="onTierDrop($event)">
            @for (tier of tiers; track tier.id; let i = $index) {
            <app-tier-tab
              [popular]="tier.popular"
              [label]="tier.name || 'New Tier'"
              [active]="i === activeTierIndex"
              (tabClick)="activeTierIndex = i"
            />
            }
            <button class="border px-3 rounded" (click)="onAddTier()">+</button>
          </div>
        </div>

        <!-- Tier Editor Component -->
        @if (activeTier) {
        <app-tier-editor
          [tier]="activeTier"
          [offeringName]="offeringName"
          [offeringType]="offeringType"
          [useDisplayNameOverride]="useDisplayNameOverride"
          [displayNameOverride]="displayNameOverride"
          (tierChange)="onTierChange($event)"
          (displayNameOverrideChange)="onDisplayNameOverrideChange($event)"
          (useDisplayNameOverrideChange)="onUseDisplayNameOverrideChange($event)"
          (addBullet)="onAddBullet()"
          (deleteTier)="onDeleteTier()"
        />
        }
      </div>
      }
    </div>
  `,
})
export class Step3TiersComponent {
  // Dependency injection using modern inject() function
  private readonly tierService = inject(TierService);
  readonly store = inject(OfferingStore);

  // Component state
  activeTierIndex = 0;

  // Computed properties for template
  get hasTiers(): boolean {
    return this.store.value.tiers.length > 0;
  }

  get tiers(): Tier[] {
    return this.store.value.tiers;
  }

  get activeTier(): Tier | undefined {
    return this.tiers[this.activeTierIndex];
  }

  get offeringName(): string {
    return this.store.value.name;
  }

  get useDisplayNameOverride(): boolean {
    return this.store.value.useDisplayNameOverride;
  }

  get displayNameOverride(): string {
    return this.store.value.displayNameOverride || '';
  }

  get offeringType() {
    return this.store.value.offeringType;
  }

  // -------- TEMPLATE ACTIONS --------

  /**
   * Uses recommended tier structure
   */
  useRecommendedStructure(): void {
    const tiers = this.tierService.createTiersFromTemplates(TIER_TEMPLATES.RECOMMENDED_SERVICE);
    this.store.setTiers(tiers);
    this.activeTierIndex = 0;
  }

  /**
   * Starts with a blank tier
   */
  buildYourOwn(): void {
    const tier = this.tierService.createTier('');
    this.store.setTiers([tier]);
    this.activeTierIndex = 0;
  }

  /**
   * Adds a new tier
   */
  onAddTier(): void {
    const tier = this.tierService.createTier('');
    this.store.addTier(tier);
    this.activeTierIndex = this.tiers.length - 1;
  }

  /**
   * Handles tier changes from editor
   */
  onTierChange(updatedTier: Tier): void {
    this.store.updateTier(this.activeTierIndex, updatedTier);
  }

  /**
   * Handles display name override changes
   */
  onDisplayNameOverrideChange(value: string): void {
    this.store.update({ displayNameOverride: value });
  }

  /**
   * Handles use display name override toggle
   */
  onUseDisplayNameOverrideChange(value: boolean): void {
    this.store.update({ useDisplayNameOverride: value });
  }

  /**
   * Adds a bullet point to active tier
   */
  onAddBullet(): void {
    if (this.activeTier) {
      const updatedTier = this.tierService.addBulletPoint(this.activeTier);
      this.store.updateTier(this.activeTierIndex, updatedTier);
    }
  }

  /**
   * Deletes the active tier
   */
  onDeleteTier(): void {
    this.store.removeTier(this.activeTierIndex);
    this.activeTierIndex = Math.max(0, this.activeTierIndex - 1);
  }

  /**
   * Handles drag and drop reordering
   */
  onTierDrop(event: CdkDragDrop<Tier[]>): void {
    this.store.reorderTiers(event.previousIndex, event.currentIndex);
    this.activeTierIndex = event.currentIndex;
  }
}
