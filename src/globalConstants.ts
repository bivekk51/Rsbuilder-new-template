import config from './config';
import { CreateUUID } from './utils/helper';
import SessionDB from './utils/sessionStorage';

const BASE_API = `${config.BASE_API}/api`;
const SSS_BASE_API = `${config.SSS_API_BASE_URL}/api`;

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
} as const;

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

export const COUNTRY_API_CONFIG = {
  DEFAULT: {
    dashboardPage: {},
  },
} as const;

export const getCountryApiEndpoints = <T extends keyof typeof COUNTRY_API_CONFIG.DEFAULT>(
  countryCode: string | undefined,
  page: T,
) => {
  return COUNTRY_API_CONFIG.DEFAULT as any;
};

export default API_ENDPOINTS;
