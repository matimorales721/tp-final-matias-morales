import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { formatDate, fullName, roleLabel } from '../lib/format'
import type { IUsuario } from '../types/domain'

export function UserDetailPage() {
  const { id = '' } = useParams()
  const [user, setUser] = useState<IUsuario | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await api.getUser(id)
        setUser(data)
      } catch (caughtError) {
        const message = caughtError instanceof Error ? caughtError.message : 'No se pudo cargar el usuario'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    void run()
  }, [id])

  if (loading) return <p>Cargando usuario...</p>
  if (error) return <p className="error-text">{error}</p>
  if (!user) return <p>No se encontró el usuario.</p>

  return (
    <section className="panel detail-panel">
      <h2>Detalle de Usuario</h2>
      <p>
        <strong>Nombre:</strong> {fullName(user.nombre, user.apellido)}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Fecha de nacimiento:</strong> {formatDate(user.fechaNacimiento)}
      </p>
      <p>
        <strong>Roles:</strong>{' '}
        {user.roles.map((role) => (typeof role === 'string' ? role : role.name)).map(roleLabel).join(', ')}
      </p>

      <div className="card-actions">
        <Link to={`/admin/usuarios/${user._id}/editar`} className="ghost-btn">
          Editar
        </Link>
        <Link to="/admin/usuarios" className="ghost-btn">
          Volver
        </Link>
      </div>
    </section>
  )
}
