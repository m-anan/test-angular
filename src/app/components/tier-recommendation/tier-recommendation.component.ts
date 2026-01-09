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
          <span class="px-4 py-2 bg-white rounded-xl">Starter</span>
          <span class="px-4 py-2  rounded-xl border flex gap-2 border-red-400 bg-[#FCF4C9]"
            >Professional
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M19.8947 6.85592L16.9567 3.73168C16.552 3.30133 15.9798 3.05432 15.3865 3.05432H6.61375C6.02049 3.05432 5.44824 3.30133 5.04357 3.73168L2.10559 6.85592C2.10559 6.85592 2.10498 6.85653 2.10437 6.85653C1.39597 7.61272 1.33327 8.76088 1.95574 9.58747L9.28015 19.3116C9.68899 19.8546 10.315 20.1668 10.9984 20.1668H10.9996C11.6829 20.1668 12.3102 19.8552 12.7201 19.3116L20.0445 9.58747C20.6676 8.75978 20.6049 7.61089 19.8947 6.85592ZM15.388 10.4522L13.5363 11.0749L12.9191 12.9395C12.8176 13.2412 12.5377 13.4444 12.2224 13.4444C11.9071 13.4444 11.626 13.2412 11.5257 12.9395L10.9085 11.0749L9.05685 10.4522C8.75729 10.3526 8.55574 10.069 8.55574 9.75161C8.55574 9.4342 8.75741 9.15089 9.05685 9.05128L10.9085 8.42856L11.5257 6.56357C11.7262 5.96016 12.7174 5.96016 12.9179 6.56357L13.5351 8.42856L15.3867 9.05128C15.6862 9.15211 15.8891 9.43408 15.8891 9.75161C15.8891 10.0691 15.6874 10.3526 15.388 10.4522Z"
                fill="url(#paint0_linear_1_289)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_289"
                  x1="1.52783"
                  y1="11.6105"
                  x2="20.4728"
                  y2="11.6105"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F0895E" />
                  <stop offset="1" stop-color="#DE768A" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span class="px-4 py-2 bg-white rounded-xl">Enterprise</span>
        </div>

        <p class="text-sm text-gray-600 mb-4">
          Service packages based on scope, deliverables, and support level.
        </p>

        <button
          class="bg-[#D84253] text-white px-4 py-2 rounded-full"
          (click)="useRecommended.emit()"
        >
          Use This Structure
        </button>
      </div>

      <!-- Build Own -->
      <div
        class="border-2 border-dashed border-[#BCBCBC] rounded p-6 w-1/3 flex flex-col gap-2 items-center justify-center"
      >
        <span class="text-xl">Build your own:</span>
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
