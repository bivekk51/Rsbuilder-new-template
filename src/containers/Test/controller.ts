/*
 *
 * Test controller
 *
 */

import { defaultAction } from './actions';

/**
 * Test Controller
 *
 * Handles all business logic for the Test container:
 * - State management coordination
 * - Business logic orchestration
 * - Error handling
 *
 * All state access goes through getters
 * All API/Redux calls go through Promise-based methods
 */
export class TestController {
  private dispatch: any;
  private getState: any;

  constructor(dispatch: any, getState: any) {
    this.dispatch = dispatch;
    this.getState = getState;

    // Bind all methods
    this.onDefaultAction = this.onDefaultAction.bind(this);
  }

  /**
   * Get the current data
   */
  get data(): any {
    return this.getState().test?.data || null;
  }

  /**
   * Get the loading state
   */
  get loading(): boolean {
    return this.getState().test?.loading || false;
  }

  /**
   * Get the current error
   */
  get error(): string | null {
    return this.getState().test?.error || null;
  }

  /**
   * Fetch default test data
   *
   * @returns Promise that resolves when action is dispatched
   */
  async onDefaultAction(): Promise<void> {
    return new Promise((resolve) => {
      this.dispatch(defaultAction());
      resolve();
    });
  }
}