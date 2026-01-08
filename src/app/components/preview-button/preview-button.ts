import { Component } from '@angular/core';
import { PreviewCardComponent } from '../../preview/preview-card';

@Component({
  selector: 'app-preview-button',
  templateUrl: './preview-button.html',
  imports: [PreviewCardComponent],
})
export class PreviewButtonComponent {
  isOpen = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
