import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { fullName } from '../lib/format'
import type { IDueno } from '../types/domain'

export function OwnersListPage() {
  const [owners, setOwners] = useState<IDueno[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadOwners = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await api.listOwners()
      setOwners(data)
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'No se pudo cargar dueños'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadOwners()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('¿Seguro que querés eliminar este dueño?')
    if (!confirmed) return

    try {
      await api.deleteOwner(id)
      await loadOwners()
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'No se pudo eliminar el dueño'
      setError(message)
    }
  }

  return (
    <section className="panel">
      <h2>Listado de Dueños</h2>

      {loading && <p>Cargando dueños...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="cards-grid">
        {owners.map((owner) => (
          <article key={owner._id} className="item-card">
            <p>
              <strong>Nombre:</strong> {fullName(owner.nombre, owner.apellido)}
            </p>
            <p>
              <strong>Email:</strong> {owner.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {owner.telefono}
            </p>

            <div className="card-actions">
              <Link to={`/duenos/${owner._id}`} className="ghost-btn">
                Ver
              </Link>
              <Link to={`/duenos/${owner._id}/editar`} className="ghost-btn">
                Editar
              </Link>
              <button type="button" className="ghost-btn" onClick={() => handleDelete(owner._id)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="footer-action">
        <Link to="/duenos/nuevo" className="primary-btn-link">
          Crear Dueño
        </Link>
      </div>
    </section>
  )
}
