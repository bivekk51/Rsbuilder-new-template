/*
 *
 * App messages
 *
 * Internationalization message key definitions for i18next
 * Add these keys to locales/en.json, locales/ja.json, etc.
 *
 * Usage in component:
 * const { t } = useTranslation();
 * t('app.containers.App.appName')
 */

export const scope = 'app.containers.App';

export const messages = {
  appName: `${scope}.appName`,
  loadingMessage: `${scope}.loadingMessage`,
  darkMode: `${scope}.darkMode`,
  lightMode: `${scope}.lightMode`,
  toggleTheme: `${scope}.toggleTheme`,
} as const;
