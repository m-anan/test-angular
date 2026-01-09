/**
 * Tier Tab Component
 * Reusable draggable tab for tier selection
 * Follows Single Responsibility Principle
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tier-tab',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  template: `
    <button
      cdkDrag
      (click)="tabClick.emit()"
      class="px-8 py-3 rounded-2xl cursor-move select-none flex items-center gap-1 transition-colors"
      [class.bg-[#FC5450]]="active"
      [class.text-white]="active"
      [class.bg-white]="!active"
      cdkDragLockAxis="x"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="24"
        viewBox="0 0 24 24"
        fill="black"
        [ngClass]="{ 'fill-white': active }"
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
      {{ label }}
    </button>
  `,
})
export class TierTabComponent {
  @Input() label = 'New Tier';
  @Input() active = false;
  @Output() tabClick = new EventEmitter<void>();
}
