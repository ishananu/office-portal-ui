import { En } from './en';
import { Fr } from './fr';

export const i18nResources = {
  en: {
    translation: En.app
  },
  fr: {
    translation: Fr.app
  }
};

export type TranslationResources = (typeof i18nResources)['en'];
