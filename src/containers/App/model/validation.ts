/*
 *
 * App model validation
 *
 * Form validation logic and data validation
 * Returns { isValid, error } objects
 */

/**
 * Validate app theme preference
 */
export const validateThemePreference = (theme: string): { isValid: boolean; error?: string } => {
  const validThemes = ['light', 'dark'];
  if (!validThemes.includes(theme)) {
    return { isValid: false, error: 'Invalid theme preference' };
  }
  return { isValid: true };
};

/**
 * Generic validation result type
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
