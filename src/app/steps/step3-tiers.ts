import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OfferingStore, Tier } from '../store/offer';
import { FormInputComponent } from '../shared/form-input/form-input';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-step3-tiers',
  standalone: true,
  imports: [CommonModule, FormsModule, FormInputComponent, DragDropModule],
  template: `
    <h2 class="text-xl font-semibold ">Tier & Pricing Breakdown</h2>
    <p>Configure your offering price and (optional) tiers</p>
    <div class=" p-8 py-4 bg-white rounded-3xl mt-5">
      <h2 class="font-semibold mb-4">Tiers</h2>
      <div *ngIf="store.value.tiers.length === 0" class="flex gap-6">
        <!-- Recommended -->
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

          <button
            class="bg-red-500 text-white px-4 py-2 rounded-full"
            (click)="useRecommendedStructure()"
          >
            Use This Structure
          </button>
        </div>

        <!-- Build own -->
        <div
          class="border-2 border-dashed border-[#BCBCBC] rounded p-6 w-1/3 flex items-center justify-center "
        >
          <button
            class="border border-red-500 text-red-500 px-4 py-2 rounded-full"
            (click)="buildYourOwn()"
          >
            Add your own Tier
          </button>
        </div>
      </div>

      <div
        *ngIf="store.value.tiers.length > 0"
        class="border border-[#F2F5F9] overflow-hidden rounded-3xl  "
      >
        <!-- Tier Tabs -->
        <div *ngIf="store.value.tiers.length > 0" class="bg-[#F2F5F9] p-2">
          <!-- Tier Tabs (Draggable) -->
          <div cdkDropList class="flex gap-3 " (cdkDropListDropped)="dropTier($event)">
            <button
              *ngFor="let tier of store.value.tiers; let i = index"
              cdkDrag
              (click)="activeTierIndex = i"
              class="px-6 py-3 rounded-2xl  cursor-move select-none flex"
              [class.bg-red-500]="i === activeTierIndex"
              [class.text-white]="i === activeTierIndex"
              cdkDragLockAxis="x"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="black"
                [ngClass]="{ 'fill-white': activeTierIndex == i }"
              >
                <path
                  d="M15.75 13.75C16.7165 13.75 17.5 12.9665 17.5 12C17.5 11.0335 16.7165 10.25 15.75 10.25C14.7835 10.25 14 11.0335 14 12C14 12.9665 14.7835 13.75 15.75 13.75Z"
                />
                <path
                  d="M8.25 13.75C9.2165 13.75 10 12.9665 10 12C10 11.0335 9.2165 10.25 8.25 10.25C7.2835 10.25 6.5 11.0335 6.5 12C6.5 12.9665 7.2835 13.75 8.25 13.75Z"
                />
                <path
                  d="M15.75 21.5C16.7165 21.5 17.5 20.7165 17.5 19.75C17.5 18.7835 16.7165 18 15.75 18C14.7835 18 14 18.7835 14 19.75C14 20.7165 14.7835 21.5 15.75 21.5Z"
                />
                <path
                  d="M15.75 6C16.7165 6 17.5 5.2165 17.5 4.25C17.5 3.2835 16.7165 2.5 15.75 2.5C14.7835 2.5 14 3.2835 14 4.25C14 5.2165 14.7835 6 15.75 6Z"
                />
                <path
                  d="M8.25 21.5C9.2165 21.5 10 20.7165 10 19.75C10 18.7835 9.2165 18 8.25 18C7.2835 18 6.5 18.7835 6.5 19.75C6.5 20.7165 7.2835 21.5 8.25 21.5Z"
                />
                <path
                  d="M8.25 6C9.2165 6 10 5.2165 10 4.25C10 3.2835 9.2165 2.5 8.25 2.5C7.2835 2.5 6.5 3.2835 6.5 4.25C6.5 5.2165 7.2835 6 8.25 6Z"
                />
              </svg>
              {{ tier.name || 'New Tier' }}
            </button>

            <button class="border px-3 rounded" (click)="addTier()">+</button>
          </div>
        </div>

        <!-- Tier Editor -->
        <div class="grid grid-cols-2 gap-6 p-5">
          <!-- LEFT -->
          <div>
            <h3 class="font-semibold mb-2">Tier Details</h3>

            <app-form-input
              placeholder="Tier Name"
              [maxLength]="50"
              [required]="true"
              [(model)]="activeTier.name"
              [counterInside]="true"
            />
            <div class="  mb-6 ">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-medium">Offering Display Name</h3>

                <label class="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    [(ngModel)]="store.value.useDisplayNameOverride"
                    placeholder="[Name of offering added on step 2]"
                  />
                  Overwrite
                </label>
              </div>

              <!-- Read-only name from Step 2 -->
              <input
                *ngIf="!store.value.useDisplayNameOverride"
                class="border p-2 w-full bg-gray-100 text-gray-600"
                [value]="store.value.name"
                placeholder="[Name of offering added on step 2]"
                disabled
              />

              <!-- Editable override -->
              <input
                *ngIf="store.value.useDisplayNameOverride"
                class="border p-2 w-full"
                placeholder="Enter custom display name"
                [(ngModel)]="store.value.displayNameOverride"
              />
            </div>
            <div *ngFor="let b of activeTier.bullets; let i = index">
              <input class="border p-2 w-full mb-1" [(ngModel)]="activeTier.bullets[i]" />
            </div>

            <button class="text-red-500 mt-2" (click)="activeTier.bullets.push('')">
              Add Bullet Point
            </button>
          </div>

          <!-- RIGHT -->
          <div>
            <h3 class="font-semibold mb-2">Tier Pricing</h3>

            <select class="border p-2 w-full mb-3" [(ngModel)]="activeTier.billingType">
              <option value="project">Per Project</option>
              <option value="hourly">Hourly</option>
              <option value="monthly">Monthly Retainer</option>
            </select>

            <div *ngIf="!activeTier.requestQuoteOnly" class="flex gap-2">
              <input
                type="number"
                class="border p-2 w-full"
                placeholder="Min"
                [(ngModel)]="activeTier.minPrice"
              />
              <input
                type="number"
                class="border p-2 w-full"
                placeholder="Max"
                [(ngModel)]="activeTier.maxPrice"
              />
            </div>

            <label class="flex items-center gap-2 mt-3">
              <input type="checkbox" [(ngModel)]="activeTier.requestQuoteOnly" />
              Request Quote Only
            </label>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-between mt-4 p-5 border-t border-[#F2F5F9]">
          <label class="flex items-center gap-2">
            <input type="checkbox" [(ngModel)]="activeTier.popular" />
            Mark as Popular Choice
          </label>

          <button class="text-red-600" (click)="removeTier(activeTierIndex)">Delete Tier</button>
        </div>
      </div>
    </div>
  `,
})
export class Step3TiersComponent {
  activeTierIndex = 0;

  constructor(public store: OfferingStore) {}

  // -------- TEMPLATE ACTIONS --------

  useRecommendedStructure() {
    const tiers: Tier[] = [
      this.createTier('Starter'),
      this.createTier('Professional', true),
      this.createTier('Enterprise'),
    ];
    this.store.update({ tiers });
  }

  buildYourOwn() {
    this.store.update({ tiers: [this.createTier('')] });
  }

  // -------- CRUD --------

  createTier(name: string, popular = false): Tier {
    return {
      id: crypto.randomUUID(),
      name,
      bullets: [],
      billingType: 'project',
      requestQuoteOnly: false,
      popular,
    };
  }
  get displayName(): string {
    return this.store.value.useDisplayNameOverride
      ? this.store.value.displayNameOverride || ''
      : this.store.value.name;
  }

  addTier() {
    const tier: Tier = {
      id: crypto.randomUUID(),
      name: '',
      bullets: [],
      billingType: 'project',
      requestQuoteOnly: false,
      popular: false,
    };

    this.store.update({
      tiers: [...this.store.value.tiers, tier],
    });

    this.activeTierIndex = this.store.value.tiers.length - 1;
  }

  removeTier(index: number) {
    const tiers = this.store.value.tiers.filter((_, i) => i !== index);
    this.store.update({ tiers });
    this.activeTierIndex = Math.max(0, this.activeTierIndex - 1);
  }
  dropTier(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.store.value.tiers, event.previousIndex, event.currentIndex);

    // keep active tab in sync
    this.activeTierIndex = event.currentIndex;
  }
  get activeTier(): Tier {
    return this.store.value.tiers[this.activeTierIndex];
  }
}
