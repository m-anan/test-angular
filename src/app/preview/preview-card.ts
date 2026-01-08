import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferingStore } from '../store/offer';

@Component({
  selector: 'app-preview-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white   shadow rounded-xl overflow-hidden">
      <div
        *ngIf="store.value.thumbnail"
        class="h-32 bg-cover mb-2"
        [style.backgroundImage]="'url(' + store.value.thumbnail + ')'"
      ></div>
      <div
        *ngIf="!store.value.thumbnail"
        class="h-32 mb-2"
        [style.background]="store.value.fallbackColor"
      ></div>
      <div class="p-4">
        @if(store.value.useDisplayNameOverride && store.value.displayNameOverride){
        <h3 class="font-bold">{{ store.value.displayNameOverride }}</h3>
        } @else{
        <h3 class="font-bold">{{ store.value.name }}</h3>
        }
        <p class="text-sm">{{ store.value.description }}</p>

        <ul class="list-disc ml-4 mt-2">
          <li *ngFor="let f of store.value.features">{{ f }}</li>
        </ul>

        <p class="font-semibold mt-3">{{ priceLabel }}</p>
      </div>
    </div>
  `,
})
export class PreviewCardComponent {
  constructor(public store: OfferingStore) {}

  get priceLabel() {
    const prices = this.store.value.tiers
      .filter((t) => !t.requestQuoteOnly)
      .flatMap((t) => [t.minPrice, t.maxPrice].filter(Boolean) as number[]);

    if (!prices.length) return 'Request Quote Only';

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return min === max ? `Starting from $${min}` : `$${min} - $${max}`;
  }
}
