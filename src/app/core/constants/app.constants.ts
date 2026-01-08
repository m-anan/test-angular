/**
 * Application-wide constants
 * Centralized configuration for magic numbers, strings, and default values
 */

export const APP_CONSTANTS = {
  STEPS: {
    TYPE: 1,
    DETAILS: 2,
    TIERS: 3,
    MEDIA: 4,
    TOTAL: 4,
  },
  VALIDATION: {
    MAX_NAME_LENGTH: 85,
    MAX_TAGLINE_LENGTH: 100,
    MAX_FEATURE_LENGTH: 50,
    MAX_TIER_NAME_LENGTH: 50,
  },
  DEFAULTS: {
    BILLING_TYPE: 'project' as const,
  },
} as const;

export const TIER_TEMPLATES = {
  RECOMMENDED_SERVICE: [
    { name: 'Starter', popular: false },
    { name: 'Professional', popular: true },
    { name: 'Enterprise', popular: false },
  ],
} as const;

export const MEDIA_COLORS = [
  '#F87171',
  '#FBBF24',
  '#34D399',
  '#60A5FA',
  '#A78BFA',
  '#F472B6',
] as const;

export const OFFERING_TYPE_INFO = {
  product: {
    label: 'Product',
    description: 'Goods to sell, physical or digital',
  },
  service: {
    label: 'Service',
    description: 'Work you provide, project-based or in installments',
    suggested: true,
  },
  subscription: {
    label: 'Subscription',
    description: 'Recurring access to your offering',
  },
} as const;

