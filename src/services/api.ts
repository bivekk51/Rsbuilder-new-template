// src/services/api.ts
import { handleApiError } from '../utils/errorHandler';

/**
 * Generic API client for fetch-based requests.
 * - Accepts full URL (no baseURL logic inside the client)
 * - Allows passing custom headers and options from saga
 */
class ApiClient {
  async request<T>(
    url: string,
    options: RequestInit = {},
    timeout: number = 10000,
  ): Promise<T> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        // Try to parse error body if possible
        let errorBody = '';
        try {
          errorBody = await response.text();
        } catch {}
        throw new Error(
          `HTTP ${response.status}: ${response.statusText}${
            errorBody ? ' - ' + errorBody : ''
          }`
        );
      }
      // Try to parse JSON, fallback to text
      try {
        return await response.json();
      } catch {
        return (await response.text()) as any;
      }
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }

  get<T>(url: string, options: RequestInit = {}, timeout?: number): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' }, timeout);
  }

  post<T>(
    url: string,
    data: any,
    options: RequestInit = {},
    timeout?: number
  ): Promise<T> {
    return this.request<T>(
      url,  
      {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
      },
      timeout
    );
  }

  put<T>(
    url: string,
    data: any,
    options: RequestInit = {},
    timeout?: number
  ): Promise<T> {
    return this.request<T>(
      url,
      {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data),
      },
      timeout
    );
  }

  delete<T>(url: string, options: RequestInit = {}, timeout?: number): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' }, timeout);
  }
}

export const apiClient = new ApiClient();
export * from './apiConstants';
