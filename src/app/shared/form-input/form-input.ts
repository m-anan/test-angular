import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  @Input() model = '';
  @Output() modelChange = new EventEmitter<string>();

  onInput(value: string) {
    this.model = value;
    this.modelChange.emit(value);
  }

  get count() {
    return this.model.length;
  }
}
