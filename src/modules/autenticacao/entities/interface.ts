/* eslint-disable ts/consistent-type-definitions */
import type { LoginRequest, LoginResponse, RegisterRequest } from './authTypes'
import type { User, UserApi } from './userTypes'

export interface AuthServiceInterface {
  login: (data: LoginRequest) => Promise<LoginResponse>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  isAuthenticated: (token?: string) => boolean;
}

export interface TokenServiceInterface {
  getAuthToken: () => string | null;
  saveAuthToken: (token: string) => void;
  removeAuthToken: () => void;
  getRefreshToken: () => string | null;
  saveRefreshToken: (token: string) => void;
  removeRefreshToken: () => void;
}

export interface UserServiceInterface {
  getUser: () => User | null;
  getUserDataFromToken: (token: string) => UserApi | null;
  saveUser: (user: UserApi) => void;
  removeUser: () => void;
}

export interface IUserAdapter {
  adapt: (user: UserApi) => User;
}
