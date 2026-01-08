/**
 * Step 2: Details Component
 * Handles offering details input (name, tagline, features, tags)
 * Refactored to use store methods instead of direct state manipulation
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OfferingStore } from '../../store/offer';
import { FormInputComponent } from '../../shared/form-input/form-input';
import { APP_CONSTANTS } from '../../core/constants/app.constants';

@Component({
  selector: 'app-step2-details',
  standalone: true,
  imports: [CommonModule, FormsModule, FormInputComponent],
  template: `
    <h2 class="text-2xl font-semibold ">Offering Details</h2>
    <span>Describe your offering’s charachteristics</span>
    <div class="bg-white p-5 rounded-2xl mt-8">
      <h3 class="font-medium">Core Details</h3>
      <div class="flex gap-4">
        <div class="w-1/2">
          <app-form-input
            label="Offering Name"
            placeholder="Insert name..."
            [maxLength]="85"
            [required]="true"
            [model]="offeringName"
            (modelChange)="onNameChange($event)"
          >
          </app-form-input>
          <app-form-input
            label="Tagline"
            placeholder="Tagline"
            [maxLength]="100"
            [required]="true"
            [model]="tagline"
            (modelChange)="onTaglineChange($event)"
          >
          </app-form-input>
        </div>
        <div class="w-1/2 flex flex-col ">
          <label class="font-medium"
            >Key Features
            <span class="font-light text-gray-600">(shown as bullet points)</span></label
          >
          @for (feature of features; track $index; let i = $index) {
          <div class="flex gap-2 w-full justify-center items-center">
            <app-form-input
              class="w-full"
              [maxLength]="maxFeatureLength"
              [model]="feature"
              (modelChange)="onFeatureChange(i, $event)"
              [counterInside]="true"
            />
            <span (click)="removeFeature(i)" class="text-red-500 cursor-pointer text-xs"
              >Remove</span
            >
          </div>
          @if(i==2){
          <hr class="my-2 border-dashed border-[#C3CAD8]" />
          } }
          <button
            (click)="onAddFeature()"
            class="border p-2 rounded-full border-[#D84253] text-[#D84253] px-6 w-max mt-3"
          >
            Add Bullet Point
          </button>
        </div>
      </div>
    </div>
    <div class="bg-white p-5 rounded-2xl mt-8  ">
      <h2 class="font-semibold ">Description</h2>
      <div class="  mt-3 flex gap-4">
        <div>
          <label>Offering Description</label>
          <textarea
            class="border p-2 w-full"
            [(ngModel)]="store.value.description"
            (input)="onDescriptionChange($any($event.target).value)"
          ></textarea>
        </div>
        <div>
          <h3>Tags</h3>
          <div class="flex gap-2">
            @for (tag of tags; track $index; let i = $index) {
            <input
              class="border-2 p-1 !rounded-full min-w-20 px-4 !border-[#678CA7] focus:border-[#1A5885] text-[#1A5885] text-center field-sizing-content"
              [value]="tag"
              (input)="onTagChange(i, $any($event.target).value)"
            />
            }
            <button
              class="border p-1 rounded-full w-10 bg-[#1A5885] text-white"
              (click)="onAddTag()"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Step2DetailsComponent {
  readonly store = inject(OfferingStore);

  // Constants for validation
  readonly maxFeatureLength = APP_CONSTANTS.VALIDATION.MAX_FEATURE_LENGTH;

  // Computed properties for template
  get offeringName(): string {
    return this.store.value.name;
  }

  get tagline(): string {
    return this.store.value.tagline || '';
  }

  get features(): string[] {
    return this.store.value.features;
  }

  get tags(): string[] {
    return this.store.value.tags;
  }

  /**
   * Updates the offering name
   */
  onNameChange(value: string): void {
    this.store.update({ name: value });
  }
  onDescriptionChange(value: string): void {
    this.store.update({ description: value });
  }
  /**
   * Updates the tagline
   */
  onTaglineChange(value: string): void {
    this.store.update({ tagline: value });
  }

  /**
   * Adds a new feature
   */
  onAddFeature(): void {
    this.store.addFeature('');
  }

  /**
   * Updates a feature at specific index
   */
  onFeatureChange(index: number, value: string): void {
    this.store.updateFeature(index, value);
  }
  removeFeature(index: number) {
    this.store.removeFeature(index); // removes 1 item at this index
  }
  /**
   * Adds a new tag
   */
  onAddTag(): void {
    this.store.addTag('');
  }

  /**
   * Updates a tag at specific index
   */
  onTagChange(index: number, value: string): void {
    this.store.updateTag(index, value);
  }
}
