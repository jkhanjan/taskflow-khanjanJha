// ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"

export function ProtectedRoute() {
  const { user, logout, isInitialized } = useAuth()
  if (!isInitialized) {
    return null  
  }

  const isExpired = user && user.expiresAt < Date.now()

  if (isExpired) {
    logout()
    return <Navigate to="/login" replace />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}