import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError): Promise<Error> => {
  const { response } = error;
  console.log(response)
  return Promise.reject(error)
}