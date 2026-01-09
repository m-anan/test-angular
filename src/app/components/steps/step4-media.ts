/**
 * Step 4: Media Component
 * Handles media configuration (thumbnail, gallery images, fallback color)
 * Features: File upload with drag-and-drop, image preview, validation
 */

import { Component, inject, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferingStore } from '../../store/offer';
import { MEDIA_COLORS } from '../../core/constants/app.constants';
import { PreviewButtonComponent } from '../preview-button/preview-button';
import { PreviewCardComponent } from '../preview/preview-card';

@Component({
  selector: 'app-step4-media',
  standalone: true,
  imports: [CommonModule, PreviewCardComponent],
  template: `
    <div class="flex justify-between items-center w-full">
      <div class="">
        <h2 class="text-2xl font-semibold">Images & Media</h2>
        <span class="text-gray-600">Add images to your offering</span>
      </div>
    </div>
    <div class="flex gap-4">
      <div class="w-2/3">
        <div class="mt-8 p-6 rounded-2xl border-2 border-blue-400 bg-white">
          <h3 class="text-lg font-semibold mb-4">Add Images</h3>

          <div class="grid grid-cols-3 gap-6">
            <!-- Thumbnail Upload -->
            <div class="col-span-2">
              <label class="block text-sm font-medium mb-2">Thumbnail</label>
              <div
                class="relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer hover:border-blue-500 hover:bg-blue-50 bg-[#F2F5F9]"
                [class.border-blue-500]="isDraggingThumbnail"
                [class.bg-blue-50]="isDraggingThumbnail"
                [class.border-gray-300]="!isDraggingThumbnail"
                (click)="thumbnailInput.click()"
                (dragover)="onDragOver($event, 'thumbnail')"
                (dragleave)="onDragLeave($event, 'thumbnail')"
                (drop)="onDrop($event, 'thumbnail')"
              >
                @if (thumbnailPreview) {
                <!-- Thumbnail Preview -->
                <div class="relative">
                  <img
                    [src]="thumbnailPreview"
                    alt="Thumbnail preview"
                    class="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                    (click)="removeThumbnail($event)"
                    title="Remove thumbnail"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                } @else {
                <!-- Upload Placeholder -->
                <div class="flex flex-col items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p class="text-sm font-medium text-gray-700">
                    Drop or click to upload Thumbnail Image
                  </p>
                  <p class="text-xs text-gray-500">PNG, JPG and WEBP supported</p>
                </div>
                }
                <input
                  #thumbnailInput
                  type="file"
                  class="hidden"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                  (change)="onFileSelected($event, 'thumbnail')"
                />
              </div>
            </div>

            <!-- Gallery Upload -->
            <div>
              <label class="block text-sm font-medium mb-2">More Gallery Images</label>
              <div class="space-y-4">
                @for (preview of galleryPreviews; track $index) {
                <!-- Gallery Image Preview -->
                <div
                  class="relative border-2 border-dashed border-gray-300  rounded-xl p-4 text-center"
                >
                  <div class="relative">
                    <img
                      [src]="preview"
                      alt="Gallery image {{ $index + 1 }}"
                      class="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                      (click)="removeGalleryImage($index)"
                      title="Remove image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                }

                <!-- Add More Gallery Images Button -->
                @if (galleryPreviews.length < 5) {
                <div
                  class="relative border-2 border-dashed rounded-xl p-6 text-center transition-all bg-[#F2F5F9] cursor-pointer hover:border-blue-500 hover:bg-blue-50"
                  [class.border-blue-500]="isDraggingGallery"
                  [class.bg-blue-50]="isDraggingGallery"
                  [class.border-gray-300]="!isDraggingGallery"
                  (click)="galleryInput.click()"
                  (dragover)="onDragOver($event, 'gallery')"
                  (dragleave)="onDragLeave($event, 'gallery')"
                  (drop)="onDrop($event, 'gallery')"
                >
                  <div class="flex flex-col items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p class="text-sm font-medium text-gray-700">Add</p>
                  </div>
                  <input
                    #galleryInput
                    type="file"
                    class="hidden"
                    accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                    (change)="onFileSelected($event, 'gallery')"
                  />
                </div>
                }
              </div>
            </div>
          </div>
          <!-- Error Message -->
          @if (errorMessage) {
          <div class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {{ errorMessage }}
          </div>
          }

          <!-- Fallback Color Section -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <h3 class="text-base  mb-3">No Images? Choose a fallback color:</h3>
            <div class="flex gap-3">
              @for (color of availableColors; track color) {
              <div
                class="w-16 h-16 rounded-lg cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
                [class.ring-4]="color === selectedColor"
                [class.ring-offset-2]="color === selectedColor"
                [class.ring-blue-500]="color === selectedColor"
                [style.background]="color"
                (click)="onColorSelect(color)"
                [title]="'Select color ' + color"
              ></div>
              }
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <app-preview-card />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class Step4MediaComponent {
  @ViewChild('thumbnailInput') thumbnailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('galleryInput') galleryInput!: ElementRef<HTMLInputElement>;

  readonly store = inject(OfferingStore);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly availableColors = MEDIA_COLORS;

  // State
  thumbnailPreview: string | null = null;
  galleryPreviews: string[] = [];
  isDraggingThumbnail = false;
  isDraggingGallery = false;
  errorMessage = '';

  // Constants
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private readonly ALLOWED_TYPES = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/gif',
  ];
  private readonly MAX_GALLERY_IMAGES = 5;

  constructor() {
    // Initialize previews from store
    this.initializePreviews();
  }

  /**
   * Initialize image previews from store
   */
  private initializePreviews(): void {
    const thumbnail = this.store.value.thumbnail;
    const gallery = this.store.value.gallery || [];

    if (thumbnail) {
      this.thumbnailPreview = thumbnail;
    }

    this.galleryPreviews = [...gallery];
  }

  get selectedColor(): string | undefined {
    return this.store.value.fallbackColor;
  }

  /**
   * Handle file selection from input
   */
  onFileSelected(event: Event, type: 'thumbnail' | 'gallery'): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.processFile(file, type);
    }

    // Reset input value to allow selecting the same file again
    input.value = '';
  }

  /**
   * Handle drag over event
   */
  onDragOver(event: DragEvent, type: 'thumbnail' | 'gallery'): void {
    event.preventDefault();
    event.stopPropagation();

    if (type === 'thumbnail') {
      this.isDraggingThumbnail = true;
    } else {
      this.isDraggingGallery = true;
    }
  }

  /**
   * Handle drag leave event
   */
  onDragLeave(event: DragEvent, type: 'thumbnail' | 'gallery'): void {
    event.preventDefault();
    event.stopPropagation();

    if (type === 'thumbnail') {
      this.isDraggingThumbnail = false;
    } else {
      this.isDraggingGallery = false;
    }
  }

  /**
   * Handle drop event
   */
  onDrop(event: DragEvent, type: 'thumbnail' | 'gallery'): void {
    event.preventDefault();
    event.stopPropagation();

    this.isDraggingThumbnail = false;
    this.isDraggingGallery = false;

    const file = event.dataTransfer?.files[0];
    if (file) {
      this.processFile(file, type);
    }
  }

  /**
   * Process and validate uploaded file
   */
  private processFile(file: File, type: 'thumbnail' | 'gallery'): void {
    this.errorMessage = '';

    // Validate file type
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      this.errorMessage = 'Invalid file type. Please upload PNG, JPG, WEBP, or GIF images.';
      return;
    }

    // Validate file size
    if (file.size > this.MAX_FILE_SIZE) {
      this.errorMessage = 'File size exceeds 5MB. Please upload a smaller image.';
      return;
    }

    // Check gallery limit
    if (type === 'gallery' && this.galleryPreviews.length >= this.MAX_GALLERY_IMAGES) {
      this.errorMessage = `Maximum ${this.MAX_GALLERY_IMAGES} gallery images allowed.`;
      return;
    }

    // Read and convert file to base64
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result as string;

      if (type === 'thumbnail') {
        this.thumbnailPreview = result;
        this.store.update({ thumbnail: result });
      } else {
        this.galleryPreviews.push(result);
        this.store.update({ gallery: [...this.galleryPreviews] });
      }

      // Trigger change detection to update the view immediately
      this.cdr.detectChanges();
    };

    reader.onerror = () => {
      this.errorMessage = 'Failed to read file. Please try again.';
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  /**
   * Remove thumbnail image
   */
  removeThumbnail(event: Event): void {
    event.stopPropagation();
    this.thumbnailPreview = null;
    this.store.update({ thumbnail: undefined });
  }

  /**
   * Remove gallery image by index
   */
  removeGalleryImage(index: number): void {
    this.galleryPreviews.splice(index, 1);
    this.store.update({ gallery: [...this.galleryPreviews] });
  }

  /**
   * Handle color selection
   */
  onColorSelect(color: string): void {
    this.store.update({ fallbackColor: color });
  }
}
