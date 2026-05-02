/*
 *
 * Test model validation
 *
 * Form validation logic and data validation
 * Returns { isValid, error } objects
 */

/**
 * Generic validation result type
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate test data
 */
export const validateTest = (data: any): ValidationResult => {
  if (!data) {
    return { isValid: false, error: 'Test data is required' };
  }
  return { isValid: true };
};