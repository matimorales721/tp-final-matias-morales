import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { fullName } from '../lib/format'
import type { IDueno } from '../types/domain'

export function OwnerDetailPage() {
  const { id = '' } = useParams()
  const [owner, setOwner] = useState<IDueno | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await api.getOwner(id)
        setOwner(data)
      } catch (caughtError) {
        const message = caughtError instanceof Error ? caughtError.message : 'No se pudo cargar el dueño'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    void run()
  }, [id])

  if (loading) return <p>Cargando dueño...</p>
  if (error) return <p className="error-text">{error}</p>
  if (!owner) return <p>No se encontró el dueño.</p>

  return (
    <section className="panel detail-panel">
      <h2>Detalle de Dueño</h2>
      <p>
        <strong>Nombre:</strong> {fullName(owner.nombre, owner.apellido)}
      </p>
      <p>
        <strong>Email:</strong> {owner.email}
      </p>
      <p>
        <strong>Teléfono:</strong> {owner.telefono}
      </p>
      <p>
        <strong>Dirección:</strong> {owner.direccion || '-'}
      </p>

      <div className="card-actions">
        <Link to={`/duenos/${owner._id}/editar`} className="ghost-btn">
          Editar
        </Link>
        <Link to="/duenos" className="ghost-btn">
          Volver
        </Link>
      </div>
    </section>
  )
}
