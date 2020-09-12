import { AxiosRequestConfig } from 'axios'
import { getItemFromStorage } from '../../util/localStorage'
import { STORAGE } from '../../constant/storage'
import { cookieUtil } from '../../util/cookie';

export const preRequestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const { getCookie } = cookieUtil();
  const token = getCookie(STORAGE.BN_TOKEN) || null
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
  return config
}