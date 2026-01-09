import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getInputValue } from '../../../core/utils/event-helpers';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.html',
  imports: [FormsModule],
})
export class FormInputComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() maxLength = 100;
  @Input() required = false;
  @Input() counterInside = false;
  @Input() errorMessage?: string;

  @Input() model = '';
  @Output() modelChange = new EventEmitter<string>();

  // Generate unique ID for accessibility
  private static nextId = 0;
  readonly inputId = `form-input-${FormInputComponent.nextId++}`;

  onInput(event: Event): void {
    this.model = getInputValue(event);
    this.modelChange.emit(this.model);
  }

  get count(): number {
    return this.model.length;
  }

  get isInvalid(): boolean {
    return !!this.errorMessage;
  }
}
