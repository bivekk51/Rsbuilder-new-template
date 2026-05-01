import config from './config';
import { CreateUUID } from './utils/helper';
import SessionDB from './utils/sessionStorage';

const BASE_API = `${config.BASE_API}/api`;
// Legacy/exported base for compatibility with older imports
export const BASE_API_URL = BASE_API;

// External APIs used in the template
export const FAKE_STORE_API = 'https://fakestoreapi.com';


export const V1_API = `${BASE_API}/v1`;
export const CURRENT_API = V1_API;

export const API_ENDPOINTS = {
  auth: {
    LOGIN: `${CURRENT_API}/login`,
    FORGOT_PASSWORD: `${CURRENT_API}/forgot-password`,
    REFRESH_TOKEN: `${CURRENT_API}/auth/refresh`,
    LOGOUT: `${CURRENT_API}/logout`,
  },
  test: {
    DUMMY_API: `/test`,
    PUBLIC_TEST_API: 'https://jsonplaceholder.typicode.com/todos/1',
  },
  products: {
    GET_ALL_PRODUCTS: `${FAKE_STORE_API}/products`,
    GET_PRODUCT_BY_ID: (id?: string) => `${FAKE_STORE_API}/products${id ? `/${id}` : ''}`,
    GET_CATEGORIES: `${FAKE_STORE_API}/products/categories`,
  },
} as const;

// Provide a camelCase alias to match older `APIEndPoints` export
export const APIEndPoints = API_ENDPOINTS;

export const DEFAULT_AVATAR = 'https://randomuser.me/api/portraits/men/32.jpg';

type Token = string | null;

export const APIHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Debug-Id': CreateUUID().replace(/-/g, ''),
};

export const APIHeadersForMultipartFormData = {
  Accept: 'application/json',
  'Debug-Id': CreateUUID().replace(/-/g, ''),
};

export const APIHeadersWithAuth = (token?: Token) => {
  const t = token || SessionDB.getAccessToken();
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Debug-Id': CreateUUID().replace(/-/g, ''),
  };
  if (t) headers.Authorization = `Bearer ${t}`;
  return headers;
};

export const getRegisterFlowEndpoints = (countryCode?: string) => {
  // simple default mapping for template
  return API_ENDPOINTS;
};


export default API_ENDPOINTS;
