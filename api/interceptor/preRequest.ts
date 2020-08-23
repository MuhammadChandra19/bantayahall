import { AxiosRequestConfig } from 'axios'
import { getItemFromStorage } from '../../util/localStorage'
import { STORAGE } from '../../constant/storage'

export const preRequestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = getItemFromStorage(STORAGE.BN_TOKEN);
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
  return config
}