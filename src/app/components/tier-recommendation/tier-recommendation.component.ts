/**
 * Tier Recommendation Component
 * Displays recommended tier structure with option to use or build custom
 * Reusable component for tier initialization
 */

import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tier-recommendation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-6">
      <!-- Recommended Structure -->
      <div class="bg-[#CCE8F3] p-6 rounded w-2/3 flex flex-col items-center">
        <h3 class="font-medium mb-3">
          Recommended tier structure for <span class="font-bold">Services</span>:
        </h3>

        <div class="flex gap-3 mb-4">
          <span class="px-6 py-2 bg-white rounded-2xl">Starter</span>
          <span class="px-6 py-2 bg-white rounded-2xl border border-red-400">Professional</span>
          <span class="px-6 py-2 bg-white rounded-2xl">Enterprise</span>
        </div>

        <p class="text-sm text-gray-600 mb-4">
          Service packages based on scope, deliverables, and support level.
        </p>

        <button class="bg-red-500 text-white px-4 py-2 rounded-full" (click)="useRecommended.emit()">
          Use This Structure
        </button>
      </div>

      <!-- Build Own -->
      <div
        class="border-2 border-dashed border-[#BCBCBC] rounded p-6 w-1/3 flex items-center justify-center"
      >
        <button
          class="border border-red-500 text-red-500 px-4 py-2 rounded-full"
          (click)="buildCustom.emit()"
        >
          Add your own Tier
        </button>
      </div>
    </div>
  `,
})
export class TierRecommendationComponent {
  @Output() useRecommended = new EventEmitter<void>();
  @Output() buildCustom = new EventEmitter<void>();
}

