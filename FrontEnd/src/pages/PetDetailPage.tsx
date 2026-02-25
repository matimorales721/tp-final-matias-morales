import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { formatDate } from '../lib/format'
import type { IHistorialClinico, IMascota } from '../types/domain'

export function PetDetailPage() {
  const { id = '' } = useParams()
  const [pet, setPet] = useState<IMascota | null>(null)
  const [histories, setHistories] = useState<IHistorialClinico[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setError('')

      try {
        const [petData, historyData] = await Promise.all([api.getPet(id), api.listHistoriesByPet(id)])
        setPet(petData)
        setHistories(historyData)
      } catch (caughtError) {
        const message = caughtError instanceof Error ? caughtError.message : 'No se pudo cargar la mascota'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    void run()
  }, [id])

  if (loading) return <p>Cargando mascota...</p>
  if (error) return <p className="error-text">{error}</p>
  if (!pet) return <p>No se encontró la mascota.</p>

  return (
    <section className="panel detail-panel">
      <h2>Mascota</h2>

      <p>
        <strong>Nombre:</strong> {pet.nombre}
      </p>
      <p>
        <strong>Especie:</strong> {pet.especie}
      </p>
      <p>
        <strong>Raza:</strong> {pet.raza}
      </p>
      <p>
        <strong>Estado:</strong> {pet.estado}
      </p>

      <h3>Historial Clínico</h3>

      <table className="simple-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Diagnóstico</th>
            <th>Tratamiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((history) => (
            <tr key={history._id}>
              <td>{formatDate(history.fecha)}</td>
              <td>{history.diagnostico}</td>
              <td>{history.tratamiento}</td>
              <td>
                <Link to={`/historiales/${history._id}/editar`} className="ghost-btn">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
          {histories.length === 0 && (
            <tr>
              <td colSpan={4}>Sin historial clínico cargado.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="footer-action">
        <Link to={`/historiales/nuevo?mascotaId=${pet._id}`} className="primary-btn-link">
          Nuevo Historial Clínico
        </Link>
      </div>
    </section>
  )
}
