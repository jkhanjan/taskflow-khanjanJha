// AuthContext.tsx
import {
  createContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"
import type { AuthUser, LoginCredentials, LoginResponse } from "@/types/auth"
import { mockFetch } from "@/lib/api"

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  isInitialized: boolean   // 👈 new
  error: string | null
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)  // 👈 new
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("auth")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // expiresAt is a Unix ms timestamp — compare directly
        if (parsed.expiresAt > Date.now()) {
          setUser(parsed)
        } else {
          localStorage.removeItem("auth")
        }
      } catch {
        localStorage.removeItem("auth")
      }
    }
    setIsInitialized(true)  // 👈 always mark done, even if no session
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await mockFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      })

      const data = await res.json()

      if (!res.ok) {
        setError((data as { message: string }).message)
        return false
      }

      const loginData = data as LoginResponse

      const userData: AuthUser = {
        token: loginData.token,
        username: loginData.username,
        expiresAt: Date.now() + 60 * 60 * 1000, 
      }

      localStorage.setItem("auth", JSON.stringify(userData))
      setUser(userData)
      return true
    } catch {
      setError("Something went wrong. Please try again.")
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("auth")
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, isInitialized, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }