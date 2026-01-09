/**
 * Type-Safe Event Handler Utilities
 * Provides proper TypeScript typing for DOM events
 * Eliminates the need for $any() type casts in templates
 */

// Type definitions for common DOM events
export type InputEvent = Event & { target: HTMLInputElement };
export type TextAreaEvent = Event & { target: HTMLTextAreaElement };
export type SelectEvent = Event & { target: HTMLSelectElement };
export type CheckboxEvent = Event & { target: HTMLInputElement & { checked: boolean } };
export type NumberInputEvent = Event & { target: HTMLInputElement & { valueAsNumber: number } };

/**
 * Safely extracts string value from input event
 */
export function getInputValue(event: Event): string {
  return (event.target as HTMLInputElement).value;
}

/**
 * Safely extracts checked state from checkbox event
 */
export function getCheckboxValue(event: Event): boolean {
  return (event.target as HTMLInputElement).checked;
}

/**
 * Safely extracts numeric value from number input event
 * Returns undefined if value is NaN
 */
export function getNumberValue(event: Event): number | undefined {
  const value = (event.target as HTMLInputElement).valueAsNumber;
  return isNaN(value) ? undefined : value;
}

/**
 * Safely extracts selected value from select dropdown event
 */
export function getSelectValue(event: Event): string {
  return (event.target as HTMLSelectElement).value;
}

/**
 * Safely extracts value from textarea event
 */
export function getTextAreaValue(event: Event): string {
  return (event.target as HTMLTextAreaElement).value;
}
