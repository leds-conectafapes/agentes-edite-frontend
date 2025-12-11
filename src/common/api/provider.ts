import { inject, provide } from 'vue'

import { AxiosHttpClient } from '@/common/api/adapters/http/axios.client'
import { MockAxiosHttpClient } from '@/common/api/adapters/http/mock.client'

import type { HttpClientInterface } from './interface'

import { API_CONFIG, MOCK_CONFIG } from './config'

export const API_CLIENT_KEY = Symbol('apiClient')

export class ApiProvider {
  private static instance: ApiProvider
  private httpClient: HttpClientInterface

  private constructor(httpClient: HttpClientInterface) {
    this.httpClient = httpClient
  }

  public static getInstance(): ApiProvider {
    if (!ApiProvider.instance) {
      ApiProvider.instance = new ApiProvider(new AxiosHttpClient(API_CONFIG.BASE_URL))
    }
    return ApiProvider.instance
  }

  getHttpClient(): HttpClientInterface {
    return this.httpClient
  }
}

export const apiProvider = ApiProvider.getInstance()

export function provideApiServices() {
  const httpClient = apiProvider.getHttpClient()
  provide(API_CLIENT_KEY, httpClient)
}

export function useApiClient(): HttpClientInterface {
  return inject(API_CLIENT_KEY) as HttpClientInterface
}

export class MockProvider {
  private static instance: MockProvider
  private httpClient: MockAxiosHttpClient

  private constructor(httpClient: MockAxiosHttpClient) {
    this.httpClient = httpClient
  }

  public static getInstance(): MockProvider {
    if (!MockProvider.instance) {
      MockProvider.instance = new MockProvider(new MockAxiosHttpClient(MOCK_CONFIG.BASE_URL))
    }
    return MockProvider.instance
  }

  getHttpClient(): HttpClientInterface {
    return this.httpClient
  }
}

export const mockProvider = MockProvider.getInstance()
