import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StepperComponent } from '../../steps/stepper';
import { PreviewCardComponent } from '../../preview/preview-card';

@Component({
  selector: 'app-home',
  imports: [CommonModule, StepperComponent, PreviewCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  steps = ['Info', 'Contact', 'Review'];

  currentStep = 1;

  // STATE (single source of truth)
  form = {
    name: '',
    email: '',
  };

  next() {
    if (this.currentStep < 3) this.currentStep++;
  }

  prev() {
    if (this.currentStep > 1) this.currentStep--;
  }

  canProceed(): boolean {
    if (this.currentStep === 1) return this.form.name.trim().length > 0;
    if (this.currentStep === 2) return this.form.email.includes('@');
    return true;
  }
}
