/**
 * Step Indicator Component
 * Reusable component for displaying step progress
 * Follows Single Responsibility Principle
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StepConfig {
  number: number;
  name: string;
}

@Component({
  selector: 'app-step-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex z-10 justify-between items-center gap-2 mb-10 max-w-3xl m-auto before:content-[''] before:w-full before:block before:bg-red-300 before:absolute relative before:h-[1px]"
    >
      @for (step of steps; track step.number) {
        <div class="z-10 flex flex-col items-center">
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center text-[#909090] z-20 text-sm transition-colors"
            [class.bg-[#DE768A]]="currentStep >= step.number"
            [class.bg-[#F0D5D1]]="currentStep < step.number"
          >
            @if (currentStep < step.number) {
              <span>{{ step.number }}</span>
            }
            @if (currentStep >= step.number) {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 19 17"
                fill="none"
              >
                <path
                  d="M1 8.15806C3.094 10.2541 4.606 12.4641 5.922 15.3161C8.97 9.16406 13.24 4.52206 18 1.00006"
                  stroke="#5E231B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
          </div>
          <span class="absolute -bottom-6 text-xs w-max">{{ step.name }}</span>
        </div>
      }
    </div>
  `,
})
export class StepIndicatorComponent {
  @Input() steps: StepConfig[] = [];
  @Input() currentStep = 1;
}

