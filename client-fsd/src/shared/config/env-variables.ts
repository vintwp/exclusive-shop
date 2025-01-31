function getEnvVar(key: string) {
  const envVar = process.env[key];

  if (envVar === undefined) {
    return '';
  }

  return envVar;
}

export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
export const LOGIN_URL = getEnvVar('USER_LOGIN');
export const LOGIN_REG = getEnvVar('USER_REG');
export const LOGIN_REFRESH = getEnvVar('USER_REFRESH');
export const AUTH_SECRET = getEnvVar('AUTH_SECRET');
export const AUTH_GOOGLE_ID = getEnvVar('AUTH_GOOGLE_ID');
export const AUTH_GOOGLE_SECRET = getEnvVar('AUTH_GOOGLE_SECRET');
export const CATEGORY_API = getEnvVar('CATEGORY_API');
export const STORE_API = getEnvVar('STORE_API');
export const USER_API = getEnvVar('USER_API');
export const SEARCH_API = getEnvVar('SEARCH_API');
export const ITEM_API = getEnvVar('ITEM_API');
export const ITEM_SALES = getEnvVar('ITEM_SALES');
export const ITEM_BEST_SELLING = getEnvVar('ITEM_BEST_SELLING');
export const ITEM_OUR = getEnvVar('ITEM_OUR');
export const PROMO_BANNER_API = getEnvVar('PROMO_BANNER_API');
export const PROMO_CATEGORY_API = getEnvVar('PROMO_CATEGORY_API');
export const PROMO_NEW_ARRIVAL_API = getEnvVar('PROMO_NEW_ARRIVAL_API');

export const ALL_USERS = getEnvVar('USER_GETALL');
