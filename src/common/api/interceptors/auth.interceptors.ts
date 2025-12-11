import type { InternalAxiosRequestConfig } from 'axios'

export function authInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token
    = localStorage.getItem('authToken')
      ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImI1NDUyZDgxLTg5Y2UtNGI3ZS1iZTJkLTkwZDAxMmNjNGRlNSIsInVuaXF1ZV9uYW1lIjoiR1VTVEFWTyBDQUVUQU5PIiwiZW1haWwiOiJHVVNUQVZPQENBRVRBTk8uQ09NIiwiQ3BmIjoiMTIzNDU2Nzg5MzMiLCJyb2xlIjpbIkFETUlOIiwiR0VSRU5URV9HRUlOT1YiLCJESVJFVE9SX0FETUlOSVNUUkFUSVZPIl0sIm5iZiI6MTczOTIwNzM4NywiZXhwIjoxNzQ5NTc1Mzg3LCJpYXQiOjE3MzkyMDczODd9.9nvtcHSfrW5k_nUpQjMPkuJ18riP0Oc8uC4nnVUwKrA'
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}
