export type HttpClientInterface = {
  get: <T>(
    url: string,
    params?: Record<string, unknown>,
    headers?: Record<string, string>,
  ) => Promise<T>;
  post: <T, D = unknown>(url: string, data?: D, headers?: Record<string, string>) => Promise<T>;
  put: <T, D = unknown>(url: string, data?: D, headers?: Record<string, string>) => Promise<T>;
  patch: <T, D = unknown>(url: string, data?: D, headers?: Record<string, string>) => Promise<T>;
  delete: <T>(url: string, headers?: Record<string, string>) => Promise<T>;
}
