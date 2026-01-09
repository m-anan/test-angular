import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { StepperComponent } from '../../components/steps/stepper';
import { PreviewCardComponent } from '../../components/preview/preview-card';
import { OfferingStore } from '../../store/offer';
import { APP_CONSTANTS } from '../../core/constants/app.constants';

@Component({
  selector: 'app-home',
  imports: [CommonModule, StepperComponent, PreviewCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly store = inject(OfferingStore);
  readonly STEPS = APP_CONSTANTS.STEPS;

  get shouldShowPreviewCard(): boolean {
    return this.store.value.step !== this.STEPS.MEDIA;
  }
}
