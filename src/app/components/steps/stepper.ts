/**
 * Stepper Component
 * Main container for the multi-step offering creation flow
 * Refactored to use reusable components and constants
 */

import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferingStore } from '../../store/offer';
import { Step1TypeComponent } from './step1-type';
import { Step2DetailsComponent } from './step2-details';
import { Step3TiersComponent } from './step3-tiers';
import { Step4MediaComponent } from './step4-media';
import { StepIndicatorComponent, StepConfig } from '../step-indicator/step-indicator.component';
import { APP_CONSTANTS } from '../../core/constants/app.constants';
import { OfferingValidationService } from '../../core/services/offering-validation.service';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    CommonModule,
    Step1TypeComponent,
    Step2DetailsComponent,
    Step3TiersComponent,
    Step4MediaComponent,
    StepIndicatorComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Step Progress Indicator -->
    <app-step-indicator [steps]="stepConfigs" [currentStep]="currentStep" />

    <!-- Step Content -->
    @switch (currentStep) { @case (STEPS.TYPE) {
    <app-step1-type />
    } @case (STEPS.DETAILS) {
    <app-step2-details />
    } @case (STEPS.TIERS) {
    <app-step3-tiers />
    } @case (STEPS.MEDIA) {
    <app-step4-media />
    } }

    <!-- Navigation Footer -->
    <div
      class="flex justify-between max-sm:flex-wrap-reverse items-center mt-6 bg-white rounded-2xl py-2 px-2"
    >
      <span class="px-8 cursor-pointer hover:text-red-500 transition-colors">Cancel</span>
      <div class="flex max-sm:flex-wrap gap-4">
        <button
          class="border rounded-xl px-8 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          (click)="onPrevious()"
          [disabled]="isFirstStep"
        >
          Previous
        </button>
        <button
          class="bg-[#D84253] text-white py-2 rounded-xl px-8 hover:bg-[#C23545] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
          (click)="onNext()"
          [disabled]="!canProceed"
        >
          {{ isLastStep ? 'Finish' : 'Continue' }}
        </button>
      </div>
    </div>
  `,
})
export class StepperComponent {
  readonly store = inject(OfferingStore);
  private readonly validationService = inject(OfferingValidationService);
  readonly STEPS = APP_CONSTANTS.STEPS;

  readonly stepConfigs: StepConfig[] = [
    { number: 1, name: 'Offering Type' },
    { number: 2, name: 'Details' },
    { number: 3, name: 'Tiers' },
    { number: 4, name: 'Media' },
  ];

  get currentStep(): number {
    return this.store.value.step;
  }

  get isFirstStep(): boolean {
    return this.currentStep === APP_CONSTANTS.STEPS.TYPE;
  }

  get isLastStep(): boolean {
    return this.currentStep === APP_CONSTANTS.STEPS.TOTAL;
  }

  /**
   * Check if user can proceed to next step
   * Uses validation service to validate current step
   */
  get canProceed(): boolean {
    return this.validationService.canProceed(this.store.value);
  }

  onNext(): void {
    // Only proceed if validation passes
    if (this.canProceed) {
      this.store.next();
    }
  }

  onPrevious(): void {
    this.store.prev();
  }
}
