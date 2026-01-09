# Quick Reference Card

## 🚀 Essential Commands

```bash
# Development
npm start                 # Start dev server (localhost:4200)
npm run build            # Production build
npm test                 # Run tests
npm run lint             # Lint code

# Git
git status               # Check changes
git add .               # Stage all
git commit -m "msg"     # Commit
git push                # Push to remote
```

---

## 🎯 Key Concepts

### OnPush Change Detection

```typescript
// All components use OnPush
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

// After async operations:
this.cdr.markForCheck();
```

### Store Usage

```typescript
// Read
this.store.value.tiers;

// Write (immutable)
this.store.update({ name: 'New' });

// Methods
this.store.next();
this.store.prev();
this.store.addTier(tier);
```

### Subscribe & Cleanup

```typescript
ngOnInit() {
  this.sub = this.store.state$.subscribe(() => {
    this.cdr.markForCheck();
  });
}

ngOnDestroy() {
  this.sub?.unsubscribe();
}
```

---

## 🛠️ Common Patterns

### Form Input

```html
<app-form-input
  [model]="value"
  (modelChange)="onChange($event)"
  [maxLength]="100"
  [required]="true"
/>
```

### File Upload

```typescript
reader.onload = (e) => {
  const result = e.target?.result as string;
  this.store.update({ thumbnail: result });
  this.cdr.markForCheck(); // ⚠️ Required
};
```

### Validation

```typescript
get canProceed(): boolean {
  return this.validationService.canProceed(
    this.store.value
  );
}
```

---

## 🔒 Security

### Sanitize Input

```typescript
import { sanitizeInput } from './core/utils/sanitization.utils';

const safe = sanitizeInput(userInput, maxLength);
this.store.update({ name: safe });
```

### UUID Generation

```typescript
import { generateUUID } from './core/utils/uuid.utils';

const id = generateUUID(); // Cross-browser
```

---

## 🎨 Styling

### Tailwind Classes

```html
<!-- Layout -->
<div class="flex flex-col gap-4">
  <!-- Spacing -->
  <div class="p-4 m-2">
    <!-- Responsive -->
    <div class="hidden md:block 2xl:flex">
      <!-- Colors -->
      <div class="bg-blue-500 text-white"></div>
    </div>
  </div>
</div>
```

---

## ♿ Accessibility

### Modal

```html
<div role="dialog" aria-modal="true" aria-labelledby="title">
  <div id="title" class="sr-only">Title</div>
</div>
```

### Buttons

```html
<button aria-label="Close" title="Close (Esc)">×</button>
```

---

## 🐛 Debugging

### Check OnPush

```typescript
ngDoCheck() {
  console.log('Checked', this.data);
}
```

### Check State

```typescript
this.store.state$.subscribe(console.log);
```

### Force Update (Use Sparingly)

```typescript
this.cdr.detectChanges();
```

---

## ✅ Checklist

Before committing:

- [ ] No console.logs
- [ ] No `any` types
- [ ] Input sanitized
- [ ] OnPush used
- [ ] Subscriptions cleaned up
- [ ] ARIA labels added
- [ ] Build passes
- [ ] Comments updated

---

## 📁 File Locations

```
Core Utils:
├── uuid.utils.ts           # UUID generation
├── sanitization.utils.ts   # Input sanitization
└── event-helpers.ts        # Event utilities

Constants:
└── app.constants.ts        # All constants

Services:
├── tier.service.ts         # Tier operations
└── offering-validation.service.ts  # Validation

Store:
└── offer.ts                # State management

Components:
├── steps/                  # Wizard steps
├── preview/                # Preview card
└── tier-editor/            # Tier editor
```

---

## 🆘 Quick Fixes

### UI Not Updating?

```typescript
this.cdr.markForCheck();
```

### Cannot Mutate?

```typescript
// Use store.update()
this.store.update({ field: value });
```

### Subscription Leak?

```typescript
// Unsubscribe in ngOnDestroy
this.subscription?.unsubscribe();
```

### Type Error?

```typescript
// Check imports
// Avoid `any`
// Use proper types from models
```

---

## 📊 Performance

- ✅ OnPush everywhere
- ✅ Immutable updates
- ✅ TrackBy in loops
- ✅ Lazy loading ready
- ✅ Bundle optimized

---

## 🔗 Quick Links

- Dev Guide: `DEVELOPER_GUIDE.md`
- This Reference: `QUICK_REFERENCE.md`

---

**Keep this card handy! 📌**
