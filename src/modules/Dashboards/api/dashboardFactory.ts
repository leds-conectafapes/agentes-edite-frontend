import { apiProvider } from '@/common/api/provider'

import type { DashboardServiceInterface } from './types'

import { DashboardService } from './dashboardService'

export class DashboardServiceFactory {
  private static instance: DashboardServiceInterface

  static getService(): DashboardServiceInterface {
    if (!DashboardServiceFactory.instance) {
      const httpClient = apiProvider.getHttpClient()
      DashboardServiceFactory.instance = new DashboardService(httpClient)
    }
    return DashboardServiceFactory.instance
  }
}

export const dashboardService = DashboardServiceFactory.getService()
