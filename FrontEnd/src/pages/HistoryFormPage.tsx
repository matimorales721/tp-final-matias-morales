import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { api } from '../lib/api'
import { formatDate } from '../lib/format'
import { useAuth } from '../modules/auth/AuthContext'
import type { IHistorialClinico, IMascota } from '../types/domain'

interface HistoryFormPageProps {
  mode: 'create' | 'edit'
}

export function HistoryFormPage({ mode }: HistoryFormPageProps) {
  const { id = '' } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [petId, setPetId] = useState(searchParams.get('mascotaId') || '')
  const [pet, setPet] = useState<IMascota | null>(null)
  const [fecha, setFecha] = useState('')
  const [diagnostico, setDiagnostico] = useState('')
  const [tratamiento, setTratamiento] = useState('')
  const [anotaciones, setAnotaciones] = useState('')

  const [loading, setLoading] = useState(mode === 'edit')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const title = useMemo(() => (mode === 'create' ? 'Historial Clínico' : 'Editar Historial Clínico'), [mode])

  useEffect(() => {
    if (mode !== 'edit') return

    const run = async () => {
      setLoading(true)
      setError('')

      try {
        const history = await api.getHistory(id)
        hydrateFromHistory(history)
      } catch (caughtError) {
        const message = caughtError instanceof Error ? caughtError.message : 'No se pudo cargar historial'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    void run()
  }, [id, mode])

  useEffect(() => {
    if (!petId) return

    const run = async () => {
      try {
        const data = await api.getPet(petId)
        setPet(data)
      } catch {
        setPet(null)
      }
    }

    void run()
  }, [petId])

  const hydrateFromHistory = (history: IHistorialClinico) => {
    const resolvedPetId = typeof history.mascota === 'string' ? history.mascota : history.mascota._id
    setPetId(resolvedPetId)
    setFecha(history.fecha?.slice(0, 10) || '')
    setDiagnostico(history.diagnostico)
    setTratamiento(history.tratamiento)
    setAnotaciones(history.anotaciones || '')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      if (!user?._id) {
        throw new Error('No se pudo resolver el usuario logueado')
      }

      const payload = {
        mascota: petId,
        usuario: user._id,
        fecha,
        diagnostico,
        tratamiento,
        anotaciones,
      }

      if (mode === 'create') {
        await api.createHistory(payload)
      } else {
        await api.updateHistory(id, payload)
      }

      navigate(`/mascotas/${petId}`)
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'No se pudo guardar historial'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando historial...</p>

  return (
    <section className="panel">
      <h2>{title}</h2>

      <p>
        <strong>Nombre Mascota:</strong> {pet?.nombre || '-'}
      </p>
      <p>
        <strong>Especie:</strong> {pet?.especie || '-'}
      </p>
      <p>
        <strong>Fecha nacimiento:</strong> {formatDate(pet?.fechaNacimiento)}
      </p>

      <form className="stacked-form" onSubmit={handleSubmit}>
        <label htmlFor="fecha">Fecha</label>
        <input id="fecha" type="date" value={fecha} onChange={(event) => setFecha(event.target.value)} required />

        <label htmlFor="diagnostico">Diagnóstico</label>
        <textarea
          id="diagnostico"
          value={diagnostico}
          onChange={(event) => setDiagnostico(event.target.value)}
          required
        />

        <label htmlFor="tratamiento">Tratamiento</label>
        <textarea
          id="tratamiento"
          value={tratamiento}
          onChange={(event) => setTratamiento(event.target.value)}
          required
        />

        <label htmlFor="anotaciones">Anotaciones</label>
        <textarea id="anotaciones" value={anotaciones} onChange={(event) => setAnotaciones(event.target.value)} />

        {error && <p className="error-text">{error}</p>}

        <div className="card-actions">
          <button type="submit" className="primary-btn" disabled={submitting}>
            {submitting ? 'Guardando...' : mode === 'create' ? 'Crear' : 'Confirmar cambios'}
          </button>
          <Link to={petId ? `/mascotas/${petId}` : '/mascotas'} className="ghost-btn">
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  )
}
