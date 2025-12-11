import type { User } from './userTypes'

export type AuthData = {
  email: string;
  password: string;
}

export type AuthTokens = {
  authToken: string;
}

export type RefreshTokenResponse = {
  refreshToken: string;
  token: string;
}

export type LoginRequest = {
  email: string;
  password: string;
}

export type LoginResponse = {
  token: string;
  refreshToken?: string;
  user: User;
}

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
