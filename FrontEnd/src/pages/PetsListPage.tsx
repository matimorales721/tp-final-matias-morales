import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import type { IMascota } from '../types/domain'

export function PetsListPage() {
  const [pets, setPets] = useState<IMascota[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await api.listPets()
        setPets(data)
      } catch (caughtError) {
        const message = caughtError instanceof Error ? caughtError.message : 'No se pudo cargar mascotas'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    void run()
  }, [])

  return (
    <section className="panel">
      <h2>Home (usuarios tipo VETERINARIO o RECEPCIONISTA)</h2>
      <h3>Listado de Mascotas</h3>

      {loading && <p>Cargando mascotas...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="cards-grid">
        {pets.map((pet) => (
          <article key={pet._id} className="item-card">
            <p>
              <strong>Nombre:</strong> {pet.nombre}
            </p>
            <p>
              <strong>Especie:</strong> {pet.especie}
            </p>
            <p>
              <strong>Raza:</strong> {pet.raza}
            </p>

            <div className="card-actions">
              <Link to={`/mascotas/${pet._id}`} className="ghost-btn">
                Ver
              </Link>
              <Link to={`/mascotas/${pet._id}/editar`} className="ghost-btn">
                Editar
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="footer-action">
        <Link to="/mascotas/nueva" className="primary-btn-link">
          Crear Mascota
        </Link>
      </div>
    </section>
  )
}
