import type { AxiosError } from 'axios'

import { errorFactory } from '../factory/error.factory'

export function errorInterceptor(error: AxiosError): Promise<never> {
  return Promise.reject(errorFactory(error.response?.status))
}
