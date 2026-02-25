import { Navigate } from 'react-router-dom'
import { useAuth } from '../modules/auth/AuthContext'

function isAdminRole(roles: Array<string | { name: string }>) {
  return roles.some((role) => (typeof role === 'string' ? role : role.name).toUpperCase() === 'ADMIN')
}

export function HomeRedirectPage() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (isAdminRole(user.roles)) {
    return <Navigate to="/admin/usuarios" replace />
  }

  return <Navigate to="/mascotas" replace />
}
