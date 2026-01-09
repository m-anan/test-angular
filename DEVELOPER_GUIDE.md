# Developer Guide

## Quick Start

### Prerequisites
- Node.js 18+
- Angular CLI 19+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm start
# Open http://localhost:4200
```

### Build
```bash
npm run build
# Output: dist/test-angular
```

---

## Project Structure

```
src/app/
├── components/          # Reusable UI components
│   ├── preview/        # Preview card component
│   ├── shared/         # Shared form components
│   ├── step-indicator/ # Step progress indicator
│   ├── steps/          # Multi-step wizard components
│   ├── tier-editor/    # Tier editing component
│   ├── tier-tab/       # Tier tab component
│   └── tier-recommendation/ # Tier templates
│
├── core/               # Core business logic
│   ├── constants/      # Application constants
│   ├── models/         # TypeScript interfaces
│   ├── services/       # Business logic services
│   └── utils/          # Utility functions
│
├── pages/              # Page components
│   └── home/          # Main page
│
└── store/              # State management
    └── offer.ts       # Offering store
```

---

## Component Architecture

### OnPush Change Detection

All components use `OnPush` strategy for performance:

```typescript
@Component({
  selector: 'app-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  // Trigger change detection after async operations
  someAsyncOperation() {
    setTimeout(() => {
      this.data = newData;
      this.cdr.markForCheck(); // ⚠️ Required!
    }, 1000);
  }
}
```

**When to call `markForCheck()`**:
- After `setTimeout`/`setInterval`
- After HTTP responses (without async pipe)
- After `FileReader` operations
- After manual DOM manipulation
- After third-party library callbacks

---

## State Management

### Using OfferingStore

```typescript
// Inject store
readonly store = inject(OfferingStore);

// Read state
const currentStep = this.store.value.step;
const tiers = this.store.value.tiers;

// Update state (immutable)
this.store.update({ name: 'New Name' });

// Navigate
this.store.next();      // Next step
this.store.prev();      // Previous step
this.store.goToStep(3); // Jump to step

// Manage tiers
this.store.addTier(tier);
this.store.updateTier(index, tier);
this.store.removeTier(index);

// Subscribe to changes (with OnPush)
ngOnInit() {
  this.subscription = this.store.state$.subscribe(() => {
    this.cdr.markForCheck();
  });
}

ngOnDestroy() {
  this.subscription?.unsubscribe();
}
```

**⚠️ Important Rules**:
1. Never mutate `store.value` directly
2. Always use `store.update()` or specific methods
3. State is deep frozen in development

---

## Common Tasks

### Adding a New Step

1. **Create component**:
```typescript
@Component({
  selector: 'app-step5-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Summary</h2>
    <!-- Your content -->
  `,
})
export class Step5SummaryComponent {
  readonly store = inject(OfferingStore);
}
```

2. **Update constants**:
```typescript
// app.constants.ts
export const APP_CONSTANTS = {
  STEPS: {
    TYPE: 1,
    DETAILS: 2,
    TIERS: 3,
    MEDIA: 4,
    SUMMARY: 5,  // ← Add new step
    TOTAL: 5,     // ← Update total
  },
};
```

3. **Add to stepper**:
```typescript
// stepper.ts
imports: [
  // ...
  Step5SummaryComponent,
],
template: `
  @switch (currentStep) {
    @case (STEPS.SUMMARY) {
      <app-step5-summary />
    }
  }
`,
stepConfigs: [
  // ...
  { number: 5, name: 'Summary' },
];
```

4. **Add validation** (if needed):
```typescript
// offering-validation.service.ts
validateStep5(state: OfferingState): boolean {
  // Your validation logic
  return true;
}
```

---

### Working with Forms

**Use FormInputComponent**:
```html
<app-form-input
  [model]="value"
  (modelChange)="onValueChange($event)"
  [label]="'Input Label'"
  [placeholder]="'Enter value'"
  [maxLength]="100"
  [required]="true"
  [errorMessage]="errorMsg"
/>
```

**In component**:
```typescript
value = '';

onValueChange(newValue: string) {
  // Sanitize input
  const sanitized = sanitizeInput(newValue, 100);

  // Update store
  this.store.update({ name: sanitized });
}
```

---

### Image Upload

**Pattern used in Step4Media**:
```typescript
processFile(file: File, type: 'thumbnail' | 'gallery'): void {
  // Validate
  if (!this.ALLOWED_TYPES.includes(file.type)) {
    this.errorMessage = 'Invalid file type';
    return;
  }

  if (file.size > this.MAX_FILE_SIZE) {
    this.errorMessage = 'File too large';
    return;
  }

  // Read file
  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target?.result as string;

    // Update state
    this.store.update({ thumbnail: result });

    // ⚠️ Trigger change detection
    this.cdr.markForCheck();
  };

  reader.readAsDataURL(file);
}
```

---

### Adding Validation

**In OfferingValidationService**:
```typescript
validateCustomField(state: OfferingState): boolean {
  if (!state.customField) {
    return false;
  }

  if (state.customField.length > 100) {
    return false;
  }

  return true;
}
```

**Use in stepper**:
```typescript
get canProceed(): boolean {
  return this.validationService.canProceed(this.store.value);
}
```

---

## Utilities

### UUID Generation

```typescript
import { generateUUID, isValidUUID } from './core/utils/uuid.utils';

// Generate UUID
const id = generateUUID();

// Validate UUID
if (isValidUUID(someString)) {
  // Valid UUID
}

// Generate short ID
const shortId = generateShortId(8); // 8 characters
```

---

### Input Sanitization

```typescript
import {
  sanitizeHtml,
  sanitizeText,
  sanitizeUrl,
  sanitizeEmail,
  sanitizeInput
} from './core/utils/sanitization.utils';

// Sanitize HTML (removes scripts, events)
const safe = sanitizeHtml(userInput);

// Sanitize plain text (encodes HTML)
const encoded = sanitizeText(userInput);

// Sanitize URL (removes javascript:, data:)
const safeUrl = sanitizeUrl(userInput);

// Sanitize email
const email = sanitizeEmail(userInput);

// General input sanitization
const sanitized = sanitizeInput(userInput, maxLength);
```

**⚠️ Always sanitize user input**:
- Form fields
- File names
- URLs
- Content from APIs

---

## Styling

### Tailwind CSS

Project uses Tailwind CSS for styling:

```html
<!-- Spacing -->
<div class="p-4 m-2">

<!-- Layout -->
<div class="flex flex-col gap-4">

<!-- Colors -->
<div class="bg-blue-500 text-white">

<!-- Responsive -->
<div class="hidden md:block 2xl:flex">
```

### Custom Styles

Global styles in `src/styles.css`:
- Custom checkbox styling
- Form input base styles
- Typography

---

## Best Practices

### Do's ✅

1. **Use OnPush change detection**
2. **Inject services with `inject()`**
3. **Use readonly for store and services**
4. **Sanitize user input**
5. **Call `markForCheck()` after async operations**
6. **Unsubscribe in `ngOnDestroy`**
7. **Use type-safe constants**
8. **Write clear comments**
9. **Handle errors gracefully**
10. **Test in multiple browsers**

### Don'ts ❌

1. **Never mutate store state directly**
2. **Don't use `any` type**
3. **Don't forget to unsubscribe**
4. **Don't skip error handling**
5. **Don't hardcode values (use constants)**
6. **Don't skip input validation**
7. **Don't use inline styles (use Tailwind)**
8. **Don't commit console.logs**
9. **Don't skip accessibility attributes**
10. **Don't use deprecated Angular APIs**

---

## Performance Tips

### 1. OnPush Change Detection
Already implemented ✅

### 2. TrackBy Functions
```typescript
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}
```

### 3. Async Pipe
```typescript
// Component
data$ = this.service.getData();

// Template
{{ data$ | async }}
```

### 4. Lazy Loading
```typescript
// Routes
{
  path: 'admin',
  loadComponent: () => import('./admin/admin.component')
}
```

---

## Debugging

### OnPush Issues

If UI not updating:
```typescript
// Add temporary logging
ngDoCheck() {
  console.log('Check triggered', this.data);
}

// Or force detection
this.cdr.detectChanges(); // Use sparingly!
```

### State Issues

```typescript
// Log state changes
this.store.state$.subscribe(state => {
  console.log('State changed:', state);
});
```

### Check if object is frozen
```typescript
console.log(Object.isFrozen(this.store.value)); // true
```

---

## Testing

### Unit Test Example

```typescript
describe('TierService', () => {
  let service: TierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TierService);
  });

  it('should create tier with valid UUID', () => {
    const tier = service.createTier('Test');
    expect(tier.id).toBeTruthy();
    expect(tier.name).toBe('Test');
  });

  it('should validate tier correctly', () => {
    const tier = service.createTier('Test');
    const result = service.validateTier(tier);
    expect(result.valid).toBe(true);
  });
});
```

### Component Test with OnPush

```typescript
describe('PreviewCardComponent', () => {
  let component: PreviewCardComponent;
  let fixture: ComponentFixture<PreviewCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PreviewCardComponent],
    });

    fixture = TestBed.createComponent(PreviewCardComponent);
    component = fixture.componentInstance;

    // ⚠️ Important with OnPush
    fixture.detectChanges();
  });

  it('should display price label', () => {
    const element = fixture.nativeElement;
    expect(element.textContent).toContain('$');
  });
});
```

---

## Accessibility Checklist

When adding new features:

- [ ] Keyboard navigation works
- [ ] Focus visible on all interactive elements
- [ ] ARIA labels on buttons/icons
- [ ] Alt text on images
- [ ] Form labels properly associated
- [ ] Color contrast meets WCAG AA (minimum)
- [ ] Screen reader tested
- [ ] Focus trap in modals
- [ ] Escape key closes dialogs

---

## Common Errors & Solutions

### Error: Expression changed after checked

**Cause**: Data changed during change detection
**Solution**: Use `markForCheck()` instead of direct assignment

```typescript
// ❌ BAD
ngOnInit() {
  this.data = this.calculateData();
}

// ✅ GOOD
ngOnInit() {
  setTimeout(() => {
    this.data = this.calculateData();
    this.cdr.markForCheck();
  });
}
```

---

### Error: Cannot mutate frozen object

**Cause**: Trying to modify store state directly
**Solution**: Use update method

```typescript
// ❌ BAD
this.store.value.name = 'New Name';

// ✅ GOOD
this.store.update({ name: 'New Name' });
```

---

### UI Not Updating

**Cause**: OnPush not detecting changes
**Solutions**:
1. Call `markForCheck()` after async operations
2. Use observables with async pipe
3. Ensure input references change (not mutate)

---

## Resources

- [Angular Documentation](https://angular.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [RxJS Documentation](https://rxjs.dev)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Getting Help

1. Check IMPROVEMENTS.md for detailed explanations
2. Review existing component implementations
3. Use browser DevTools for debugging
4. Check Angular DevTools extension
5. Review console errors carefully

---

## Version Info

- **Angular**: 19.0.6
- **TypeScript**: 5.6.3
- **RxJS**: 7.8.0
- **Tailwind CSS**: 3.4.17

---

**Happy Coding! 🚀**
