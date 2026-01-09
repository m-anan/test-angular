import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StepperComponent } from '../../components/steps/stepper';
import { PreviewCardComponent } from '../../components/preview/preview-card';

@Component({
  selector: 'app-home',
  imports: [CommonModule, StepperComponent, PreviewCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
