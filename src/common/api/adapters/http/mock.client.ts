import type { AxiosInstance } from 'axios'

import axios from 'axios'

import type { HttpClientInterface } from '@/common/api/interface'

export class MockAxiosHttpClient implements HttpClientInterface {
  private client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL })
  }

  async get<T>(url: string, params?: object, headers?: Record<string, string>): Promise<T> {
    const response = await this.client.get(url, { params, headers })
    return response.data
  }

  async post<T>(url: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
    const response = await this.client.post(url, data, { headers })
    return response.data
  }

  async put<T>(url: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
    const response = await this.client.put(url, data, { headers })
    return response.data
  }

  async patch<T>(url: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
    const response = await this.client.patch(url, data, { headers })
    return response.data
  }

  async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const response = await this.client.delete(url, { headers })
    return response.data
  }
}
