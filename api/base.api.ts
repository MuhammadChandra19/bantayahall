import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  Method,
} from 'axios';
import { AppConfig } from '../constant/app';
import { preRequestInterceptor } from './interceptor/preRequest';
import { errorInterceptor } from './interceptor/error';

export class BaseApi {
  private baseUrl: string;
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create();

    this.axiosInstance.interceptors.request.use(
      preRequestInterceptor,
      (err) => Promise.reject(err),
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response.data,
      errorInterceptor,
    );

  }

  async make<T>(method: Method, url: string, data: any = {}, addtionalConfig = {}, headers: object = {}): Promise<T> {
    let header: object = {
      'Content-Type': 'application/json'
    }

    if (Object.keys(headers).length > 0) {
      header = headers
    }

    const config: AxiosRequestConfig = {
      baseURL: this.baseUrl,
      method: <Method>method,
      url: `${url}`,
      headers: header,
      ...addtionalConfig,
    };

    if (method === 'GET') {
      Object.keys(data).forEach((key) => {
        if (data[key] === null || data[key] === '') {
          delete data[key];
        }
      });
      config.params = data;
    } else {
      config.data = data;
    }

    return this.axiosInstance.request(config);
  }
}