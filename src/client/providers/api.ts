import axios from 'axios';
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

export const api = axios.create({
  baseURL: '/api',
  adapter: axios.defaults.adapter ? throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter)) : undefined,
});
