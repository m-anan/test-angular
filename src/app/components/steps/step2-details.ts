/**
 * Step 2: Details Component
 * Handles offering details input (name, tagline, features, tags)
 * Refactored to use store methods instead of direct state manipulation
 */

import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OfferingStore } from '../../store/offer';
import { FormInputComponent } from '../shared/form-input/form-input';
import { APP_CONSTANTS } from '../../core/constants/app.constants';
import { PreviewButtonComponent } from '../preview-button/preview-button';
import { getInputValue } from '../../core/utils/event-helpers';

@Component({
  selector: 'app-step2-details',
  standalone: true,
  imports: [CommonModule, FormsModule, FormInputComponent, PreviewButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex justify-between max-sm:flex-wrap items-center w-full">
      <div class="">
        <h2 class="text-2xl font-semibold ">Offering Details</h2>
        <span>Describe your offering's characteristics</span>
      </div>
      <app-preview-button />
    </div>

    <div class="bg-white p-5 rounded-2xl mt-8">
      <div class="flex justify-between max-sm:flex-wrap items-center mb-4">
        <h3 class="font-semibold ">Core Details</h3>
        <span
          class="text-xs text-gray-600 bg-[#CCE8F3] p-2 px-3 rounded-full flex gap-2 items-center w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M9 16.25C13.004 16.25 16.25 13.004 16.25 9C16.25 4.996 13.004 1.75 9 1.75C4.996 1.75 1.75 4.996 1.75 9C1.75 13.004 4.996 16.25 9 16.25Z"
              stroke="#24799A"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 12.75V9.25C9 8.9739 8.7761 8.75 8.5 8.75H7.75"
              stroke="#24799A"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 6.75C8.448 6.75 8 6.301 8 5.75C8 5.199 8.448 4.75 9 4.75C9.552 4.75 10 5.199 10 5.75C10 6.301 9.552 6.75 9 6.75Z"
              fill="#24799A"
            />
          </svg>
          These details will show on the card</span
        >
      </div>
      <div class="flex max-sm:flex-wrap gap-2 gap-x-4">
        <div class="md:w-1/2 max-sm:w-full">
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
        <div class="md:w-1/2 flex flex-col ">
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
          @if(i==2&&features.length>3){
          <hr class="my-2 border-dashed border-[#C3CAD8]" />
          } }
          <div class="flex max-sm:flex-wrap gap-2 items-center mt-3">
            <button
              (click)="onAddFeature()"
              class="border p-2 rounded-full border-[#D84253] text-[#D84253] px-4 w-fit  text-sm flex-none"
            >
              Add Bullet Point
            </button>
            <span
              class="text-xs text-gray-600 bg-[#CCE8F3] p-2 px-3 rounded-full flex gap-2 items-center w-auto"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9 16.25C13.004 16.25 16.25 13.004 16.25 9C16.25 4.996 13.004 1.75 9 1.75C4.996 1.75 1.75 4.996 1.75 9C1.75 13.004 4.996 16.25 9 16.25Z"
                  stroke="#24799A"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 12.75V9.25C9 8.9739 8.7761 8.75 8.5 8.75H7.75"
                  stroke="#24799A"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 6.75C8.448 6.75 8 6.301 8 5.75C8 5.199 8.448 4.75 9 4.75C9.552 4.75 10 5.199 10 5.75C10 6.301 9.552 6.75 9 6.75Z"
                  fill="#24799A"
                />
              </svg>
              Features past the first 3 only show on quickview and product view!</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white p-5 rounded-2xl mt-8  ">
      <div class="flex max-sm:flex-wrap gap-8 items-center w-full">
        <h2 class="font-semibold ">Description</h2>
        <span
          class="text-xs text-gray-600 bg-[#CCE8F3] p-2 px-3 rounded-full flex gap-2 items-center "
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M9 16.25C13.004 16.25 16.25 13.004 16.25 9C16.25 4.996 13.004 1.75 9 1.75C4.996 1.75 1.75 4.996 1.75 9C1.75 13.004 4.996 16.25 9 16.25Z"
              stroke="#24799A"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 12.75V9.25C9 8.9739 8.7761 8.75 8.5 8.75H7.75"
              stroke="#24799A"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 6.75C8.448 6.75 8 6.301 8 5.75C8 5.199 8.448 4.75 9 4.75C9.552 4.75 10 5.199 10 5.75C10 6.301 9.552 6.75 9 6.75Z"
              fill="#24799A"
            />
          </svg>
          Can be added or edited later from the Offering’s page</span
        >
      </div>
      <div class="  mt-3 flex max-sm:flex-wrap gap-4">
        <div class="md:w-1/2 max-sm:w-full">
          <label for="offering-description">Offering Description</label>
          <textarea
            id="offering-description"
            class="border p-2 w-full"
            [value]="store.value.description"
            (input)="onDescriptionChange($event)"
            aria-label="Offering description"
          ></textarea>
        </div>
        <div>
          <h3 class="text-sm">Tags</h3>
          <div class="flex flex-wrap gap-2">
            @for (tag of tags; track $index; let i = $index) {
            <input
              [id]="'tag-' + i"
              class="border-2 p-1 rounded-full! min-w-20 px-4 border-[#678CA7]! focus:border-[#1A5885] text-[#1A5885] text-center field-sizing-content"
              [value]="tag"
              (input)="onTagChange(i, $event)"
              [attr.aria-label]="'Tag ' + (i + 1)"
            />
            }
            <button
              type="button"
              class="border p-1 rounded-full w-10 bg-[#1A5885] text-white"
              (click)="onAddTag()"
              aria-label="Add tag"
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

  /**
   * Updates the description
   */
  onDescriptionChange(event: Event): void {
    this.store.update({ description: getInputValue(event) });
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

  /**
   * Removes a feature at specific index
   */
  removeFeature(index: number): void {
    this.store.removeFeature(index);
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
  onTagChange(index: number, event: Event): void {
    this.store.updateTag(index, getInputValue(event));
  }
}
