import { appConstants } from '@constants/appConstants';
import axios from 'axios';
import { LocalStorageService } from './LocalStorageService';

const apiClient = axios.create({
  baseURL: appConstants.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(async (config) => {
  const token = await LocalStorageService.LoadObj<string>('TOKEN');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { apiClient };
