import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../../lib/api'
import type { IUsuario } from '../../types/domain'

const STORAGE_KEY = 'vet_front_current_user'

interface LoginPayload {
  email: string
  password: string
}

interface AuthContextValue {
  user: IUsuario | null
  isAuthenticated: boolean
  loading: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => Promise<void>
  hasAnyRole: (roles: string[]) => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

function normalizeRole(role: IUsuario['roles'][number]): string {
  if (typeof role === 'string') {
    return role.toUpperCase()
  }

  return role.name.toUpperCase()
}

function getStoredUser(): IUsuario | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as IUsuario
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

function buildFallbackUser(email: string): IUsuario {
  return {
    _id: email,
    username: email,
    email,
    nombre: email.split('@')[0],
    apellido: '',
    roles: ['RECEPCIONISTA'],
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUsuario | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }
    setLoading(false)
  }, [])

    const login = async ({ email, password }: LoginPayload) => {
      console.log('AuthContext. Login called with', { email, password })
    await api.login({ email, password })

    let resolvedUser: IUsuario | null = null

    try {
      const users = await api.listUsers()
      resolvedUser = users.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase()) || null
    } catch {
      resolvedUser = null
    }

    const finalUser = resolvedUser || buildFallbackUser(email)
    setUser(finalUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalUser))
  }

  const logout = async () => {
    try {
      await api.logout()
    } finally {
      setUser(null)
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const hasAnyRole = (roles: string[]) => {
    if (!user) return false
    const currentRoles = user.roles.map(normalizeRole)
    return roles.some((requiredRole) => currentRoles.includes(requiredRole.toUpperCase()))
  }

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), loading, login, logout, hasAnyRole }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}
