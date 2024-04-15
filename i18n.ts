export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'es'],
} as const;

export type Locale = (typeof i18nConfig)['locales'][number];
