import { createContext } from 'react';

import axios, { AxiosInstance, AxiosError } from 'axios';
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

import { ApiError } from '@/client/utils/error';

function injectErrorType(error: AxiosError) {
  return Promise.reject(new ApiError(error.response?.data));
}

export function createApi() {
  const api = axios.create({
    xsrfCookieName: 'XSRF-TOKEN',
    baseURL: `${process.env.URL}/api`,
    adapter: !axios.defaults.adapter
      ? undefined
      : throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter)),
  });

  api.interceptors.response.use(res => res, injectErrorType);

  return api;
}

export const ApiContext = createContext<{ api: AxiosInstance }>({ api: axios });
