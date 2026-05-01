const config = {
  localUrl:
    (window as any)?._env_?.REACT_APP_LOCAL_URL ||
    process.env.REACT_APP_LOCAL_URL ||
    'http://localhost:3000',
  BASE_API:
    (window as any)?._env_?.REACT_APP_API_BASE_URL ||
    process.env.REACT_APP_API_BASE_URL ||
    'http://localhost:3001',
  SSS_URL:
    (window as any)?._env_?.REACT_APP_SSS_URL ||
    process.env.REACT_APP_SSS_URL ||
    'http://localhost:4000',
  SSS_API_BASE_URL:
    (window as any)?._env_?.REACT_APP_SSS_API_BASE_URL ||
    process.env.REACT_APP_SSS_API_BASE_URL ||
    'http://localhost:4001',

  NODE_ENV: (window as any)?._env_?.NODE_ENV || process.env.NODE_ENV || 'development',
  APP_ENV: (window as any)?._env_?.APP_ENV || process.env.APP_ENV || 'development',
};

export const getLocalUrl = (countryCode: string) => {
  if (config.APP_ENV !== 'production') return config.localUrl;
  switch (countryCode) {
    case 'BR':
      return config.localUrl;
    case 'KH':
      return config.localUrl;
    default:
      return config.localUrl;
  }
};

export default config;
