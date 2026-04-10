export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  username: string
  expiresAt: number // Unix timestamp (ms)
}

export interface AuthUser {
  token: string
  username: string
  expiresAt: number
}