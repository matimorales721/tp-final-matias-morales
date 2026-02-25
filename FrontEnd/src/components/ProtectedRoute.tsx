import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../modules/auth/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, loading, hasAnyRole } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="page-centered">Cargando sesión...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles && allowedRoles.length > 0 && !hasAnyRole(allowedRoles)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
