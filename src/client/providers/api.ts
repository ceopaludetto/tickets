import axios, { AxiosInstance } from 'axios';
import { createContext } from 'react';
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

export function createApi() {
  return axios.create({
    baseURL: `${process.env.URL}/api`,
    adapter: !axios.defaults.adapter
      ? undefined
      : throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter)),
  });
}

export const ApiContext = createContext<{ api: AxiosInstance }>({ api: axios });
