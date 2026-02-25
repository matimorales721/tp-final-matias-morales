import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { fullName, roleLabel } from '../lib/format'
import type { IUsuario } from '../types/domain'

function getRoles(roles: IUsuario['roles']) {
  return roles.map((role) => (typeof role === 'string' ? role : role.name)).map(roleLabel).join(', ')
}

export function UsersListPage() {
  const [users, setUsers] = useState<IUsuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadUsers = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await api.listUsers()
      setUsers(data)
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'No se pudo cargar usuarios'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadUsers()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('¿Seguro que querés eliminar este usuario?')
    if (!confirmed) return

    try {
      await api.deleteUser(id)
      await loadUsers()
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'No se pudo eliminar el usuario'
      setError(message)
    }
  }

  return (
    <section className="panel">
      <h2>Home (usuarios tipo ADMIN)</h2>
      <h3>Listado de Usuarios</h3>

      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="cards-grid">
        {users.map((user) => (
          <article key={user._id} className="item-card">
            <p>
              <strong>Nombre:</strong> {fullName(user.nombre, user.apellido)}
            </p>
            <p>
              <strong>Roles:</strong> {getRoles(user.roles)}
            </p>
            <div className="card-actions">
              <Link to={`/admin/usuarios/${user._id}`} className="ghost-btn">
                Ver
              </Link>
              <Link to={`/admin/usuarios/${user._id}/editar`} className="ghost-btn">
                Editar
              </Link>
              <button type="button" className="ghost-btn" onClick={() => handleDelete(user._id)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="footer-action">
        <Link to="/admin/usuarios/nuevo" className="primary-btn-link">
          Crear Usuario
        </Link>
      </div>
    </section>
  )
}
