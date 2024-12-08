import 'react-i18next';
import { resources } from './i18n';
import { TranslationResources } from './lang';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: TranslationResources;
  }
}
