import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../modules/auth/AuthContext'

function isAdminRole(roles: Array<string | { name: string }>) {
  return roles.some((role) => (typeof role === 'string' ? role : role.name).toUpperCase() === 'ADMIN')
}

export function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const isAdmin = user ? isAdminRole(user.roles) : false

  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>Veterinaria - Gestión</h1>
        <div className="topbar-actions">
          <span className="user-chip">{user?.email}</span>
          <button type="button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <nav className="tabs">
        <NavLink to="/duenos" className={({ isActive }) => (isActive ? 'tab-link active' : 'tab-link')}>
          Dueños
        </NavLink>
        <NavLink to="/mascotas" className={({ isActive }) => (isActive ? 'tab-link active' : 'tab-link')}>
          Mascotas
        </NavLink>
        {isAdmin && (
          <NavLink to="/admin/usuarios" className={({ isActive }) => (isActive ? 'tab-link active' : 'tab-link')}>
            Usuarios
          </NavLink>
        )}
      </nav>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  )
}
