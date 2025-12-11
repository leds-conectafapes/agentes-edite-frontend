export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001/api/',
  TIMEOUT: 10000,
}

export const MOCK_CONFIG = {
  BASE_URL: import.meta.env.VITE_MOCK_BASE_URL || 'http://localhost:3030',
}
