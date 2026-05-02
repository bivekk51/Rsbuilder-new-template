/*
 *
 * Test messages
 *
 * Internationalization message key definitions for i18next
 * Add these keys to locales/en.json, locales/ja.json, etc.
 *
 * Usage in component:
 * const { t } = useTranslation();
 * t('app.containers.Test.key')
 */

export const scope = 'app.containers.Test';

export const messages = {
  title: `${scope}.title`,
  description: `${scope}.description`,
  loading: `${scope}.loading`,
  error: `${scope}.error`,
} as const;