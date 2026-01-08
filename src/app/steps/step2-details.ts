import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OfferingStore } from '../store/offer';
import { FormInputComponent } from '../shared/form-input/form-input';

@Component({
  selector: 'app-step2-details',
  standalone: true,
  imports: [CommonModule, FormsModule, FormInputComponent],
  template: `
    <h2 class="text-2xl font-semibold ">Offering Details</h2>
    <span>Describe your offering’s charachteristics</span>
    <div class="bg-white p-5 rounded-2xl">
      <h3 class="font-medium">Core Details</h3>
      <div class="flex gap-4">
        <div class="w-1/2">
          <app-form-input
            label="Offering Name"
            placeholder="Insert name..."
            [maxLength]="85"
            [required]="true"
            [(model)]="store.value.name"
          >
          </app-form-input>
          <app-form-input
            label="Tagline"
            placeholder="Tagline"
            [maxLength]="100"
            [required]="true"
            [(model)]="store.value.tagline"
          >
          </app-form-input>
        </div>
        <div class="w-1/2">
          <label class="font-medium"
            >Key Features
            <span class="font-light text-gray-600">(shown as bullet points)</span></label
          >
          <div *ngFor="let f of store.value.features; let i = index; trackBy: trackByIndex">
            <app-form-input
              [maxLength]="50"
              [(model)]="store.value.features[i]"
              [counterInside]="true"
            />
          </div>
          <button
            (click)="addFeature()"
            class="border p-2 rounded-full border-[#D84253] text-[#D84253] px-6"
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
          <textarea class="border p-2 w-full" [(ngModel)]="store.value.description"></textarea>
        </div>
        <div>
          <h3>Tags</h3>
          <div class="flex gap-2">
            <div *ngFor="let t of store.value.tags; let i = index; trackBy: trackByIndex">
              <input
                class="border-2 p-1 !rounded-full min-w-20 px-4 !border-[#678CA7] focus:border-[#1A5885] text-[#1A5885] text-center field-sizing-content"
                [(ngModel)]="store.value.tags[i]"
              />
            </div>
            <button class="border p-1 rounded-full w-10 bg-[#1A5885] text-white" (click)="addTag()">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Step2DetailsComponent {
  constructor(public store: OfferingStore) {}
  addFeature() {
    this.store.update({ features: [...this.store.value.features, ''] });
  }
  addTag() {
    this.store.update({ tags: [...this.store.value.tags, ''] });
  }
  trackByIndex(index: number) {
    return index;
  }
}
