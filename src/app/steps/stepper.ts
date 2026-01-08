import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferingStore } from '../store/offer';
import { Step1TypeComponent } from './step1-type';
import { Step2DetailsComponent } from './step2-details';
import { Step3TiersComponent } from './step3-tiers';
import { Step4MediaComponent } from './step4-media';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    CommonModule,
    Step1TypeComponent,
    Step2DetailsComponent,
    Step3TiersComponent,
    Step4MediaComponent,
  ],
  template: `
    <div
      class="flex z-10 justify-between items-center gap-2 mb-10 max-w-3xl m-auto before:content-[''] before:w-full before:block before:bg-red-300 before:absolute relative  before:h-[1px]"
    >
      <div
        class="z-10 flex flex-col items-center"
        *ngFor="
          let s of [
            { number: 1, name: 'Offering Type' },
            { number: 2, name: 'Details' },
            { number: 3, name: 'Tiers' },
            { number: 4, name: 'Media' }
          ]
        "
      >
        <div
          class="w-16 h-16 rounded-full flex items-center justify-center text-[#909090] z-20 text-sm"
          [class.bg-[#DE768A]]="store.value.step >= s.number"
          [class.bg-[#F0D5D1]]="store.value.step < s.number"
        >
          <span *ngIf="store.value.step < s.number">{{ s.number }}</span>
          <svg
            *ngIf="store.value.step >= s.number"
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
        </div>
        <span class="absolute -bottom-6 text-xs w-max">{{ s.name }}</span>
      </div>
    </div>

    <app-step1-type *ngIf="store.value.step === 1" />
    <app-step2-details *ngIf="store.value.step === 2" />
    <app-step3-tiers *ngIf="store.value.step === 3" />
    <app-step4-media *ngIf="store.value.step === 4" />

    <div class="flex justify-between items-center mt-6 bg-white rounded-2xl  py-2 px-2">
      <span class="px-8"> Cancel</span>
      <div class="flex gap-4">
        <button
          class="border rounded-xl px-8"
          (click)="store.prev()"
          [disabled]="store.value.step === 1"
        >
          Previous
        </button>
        <button class="bg-[#D84253] text-white  py-2 rounded-xl px-8" (click)="store.next()">
          {{ store.value.step === 4 ? 'Finish' : 'Continue' }}
        </button>
      </div>
    </div>
  `,
})
export class StepperComponent {
  constructor(public store: OfferingStore) {}
}
