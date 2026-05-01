/*
 *
 * App controller
 *
 */

import { defaultAction, toggleTheme as toggleThemeAction, setAppLoaded } from './actions';

/**
 * App Controller
 *
 * Handles all business logic for the App container:
 * - Theme management
 * - App initialization
 * - Default data fetching
 *
 * All state access goes through getters
 * All API/Redux calls go through Promise-based methods
 */
export class AppController {
  private dispatch: any;
  private getState: any;

  constructor(dispatch: any, getState: any) {
    this.dispatch = dispatch;
    this.getState = getState;

    // Bind all methods
    this.onDefaultAction = this.onDefaultAction.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.setAppLoaded = this.setAppLoaded.bind(this);
  }

  /**
   * Get the current theme mode
   */
  get isDarkMode(): boolean {
    return this.getState().app?.isDarkMode || false;
  }

  /**
   * Get the current app data
   */
  get data(): any {
    return this.getState().app?.data || null;
  }

  /**
   * Get the loading state
   */
  get loading(): boolean {
    return this.getState().app?.loading || false;
  }

  /**
   * Get the current error
   */
  get error(): string | null {
    return this.getState().app?.error || null;
  }

  /**
   * Get the app loaded state
   */
  get appLoaded(): boolean {
    return this.getState().app?.appLoaded || false;
  }

  /**
   * Fetch default app data
   *
   * @returns Promise that resolves when action is dispatched
   */
  async onDefaultAction(): Promise<void> {
    return new Promise((resolve) => {
      this.dispatch(defaultAction());
      resolve();
    });
  }

  /**
   * Toggle dark mode theme
   *
   * @returns Promise that resolves when action is dispatched
   */
  async toggleTheme(): Promise<void> {
    return new Promise((resolve) => {
      this.dispatch(toggleThemeAction());
      resolve();
    });
  }

  /**
   * Mark the app as loaded
   *
   * @returns Promise that resolves when action is dispatched
   */
  async setAppLoaded(): Promise<void> {
    return new Promise((resolve) => {
      this.dispatch(setAppLoaded());
      resolve();
    });
  }
}
