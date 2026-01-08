import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferingStore } from '../store/offer';

@Component({
  selector: 'app-step4-media',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="font-semibold">Images & Media</h2>

    <input class="border p-2 w-full" placeholder="Thumbnail URL" (change)="setThumb($event)" />

    <h3 class="mt-2">Fallback Color</h3>
    <div class="flex gap-2">
      <div
        *ngFor="let c of colors"
        class="w-8 h-8 rounded cursor-pointer"
        [style.background]="c"
        (click)="setColor(c)"
      ></div>
    </div>
  `,
})
export class Step4MediaComponent {
  colors = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA', '#F472B6'];
  constructor(public store: OfferingStore) {}
  setThumb(e: any) {
    this.store.update({ thumbnail: e.target.value });
  }
  setColor(c: string) {
    this.store.update({ fallbackColor: c });
  }
}
