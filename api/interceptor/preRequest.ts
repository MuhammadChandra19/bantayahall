import { AxiosRequestConfig } from 'axios'
import { getItemFromStorage } from '../../util/localStorage'
import { STORAGE } from '../../constant/storage'

export const preRequestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = getItemFromStorage(STORAGE.BN_TOKEN);
  return config
}