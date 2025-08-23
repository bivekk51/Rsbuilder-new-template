// src/services/apiConstants.ts

// Use import.meta.env for Rspack/Vite/ESM environments
export const BASE_API =
  process.env.API_BASE_URL || 'http://localhost:3000/api/sectest';
export const V1_API = `${BASE_API}/v1`;
export const CURRENT_API = V1_API;

// External API constants
export const FAKE_STORE_API = 'https://fakestoreapi.com';

export const APIEndPoints = {
  auth: {
    USER_LOGIN: `/auth/merchant/login`,
    USER_LOGOUT: `/auth/merchant/logout`,
  },
  test: {
    DUMMY_API: `/test`,
    PUBLIC_TEST_API: 'https://jsonplaceholder.typicode.com/todos/8',
  },
  products: {
    GET_ALL_PRODUCTS: `${FAKE_STORE_API}/products`,
    GET_PRODUCT_BY_ID: `${FAKE_STORE_API}/products`,
    GET_CATEGORIES: `${FAKE_STORE_API}/products/categories`,
  },
};

export const APIHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const APIHeadersWithAuth = (token?: string) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});
