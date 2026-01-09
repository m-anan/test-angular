import { Component, HostListener } from '@angular/core';
import { PreviewCardComponent } from '../preview/preview-card';

@Component({
  selector: 'app-preview-button',
  templateUrl: './preview-button.html',
  imports: [PreviewCardComponent],
})
export class PreviewButtonComponent {
  isOpen = false;

  open() {
    this.isOpen = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen = false;
    // Restore body scroll
    document.body.style.overflow = '';
  }

  /**
   * Handle escape key to close modal
   */
  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    if (this.isOpen) {
      this.close();
    }
  }
}
