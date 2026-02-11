import authFr from './locales/fr/auth.json';
import navigationFr from './locales/fr/navigation.json';
import policiesFr from './locales/fr/policies.json';
import managementFr from './locales/fr/management.json';
import commonFr from './locales/fr/common.json';

export const translations = {
  fr: {
    ...authFr,
    ...navigationFr,
    ...policiesFr,
    ...managementFr,
    ...commonFr,
  },
} as const;

export type Language = 'en' | 'fr';
export type TranslationKey = keyof (typeof translations)['fr'];