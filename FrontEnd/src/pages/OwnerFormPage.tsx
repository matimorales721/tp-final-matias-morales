import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../lib/api'

interface OwnerFormPageProps {
  mode: 'create' | 'edit'
}

export function OwnerFormPage({ mode }: OwnerFormPageProps) {
  const navigate = useNavigate()
  const { id = '' } = useParams()

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')

  const [loading, setLoading] = useState(mode === 'edit')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const title = useMemo(() => (mode === 'create' ? 'Crear Dueño' : 'Editar Dueño'), [mode])

  useEffect(() => {
    if (mode !== 'edit') return

    const run = async () => {
      setLoading(true)
      setError('')
      try {
        const owner = await api.getOwner(id)
        setNombre(owner.nombre)
        setApellido(owner.apellido)
        setEmail(owner.email)
        setTelefono(owner.telefono)
        setDireccion(owner.direccion || '')
      } catch (caughtError) {
        const message = caughtError instanceof Error ? caughtError.message : 'No se pudo cargar el dueño'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    void run()
  }, [id, mode])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const payload = { nombre, apellido, email, telefono, direccion }

      if (mode === 'create') {
        await api.createOwner(payload)
      } else {
        await api.updateOwner(id, payload)
      }

      navigate('/duenos')
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'No se pudo guardar el dueño'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando dueño...</p>

  return (
    <section className="panel">
      <h2>{title}</h2>

      <form className="stacked-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" value={nombre} onChange={(event) => setNombre(event.target.value)} required />

        <label htmlFor="apellido">Apellido</label>
        <input id="apellido" value={apellido} onChange={(event) => setApellido(event.target.value)} required />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />

        <label htmlFor="telefono">Teléfono</label>
        <input id="telefono" value={telefono} onChange={(event) => setTelefono(event.target.value)} required />

        <label htmlFor="direccion">Dirección</label>
        <input id="direccion" value={direccion} onChange={(event) => setDireccion(event.target.value)} />

        {error && <p className="error-text">{error}</p>}

        <div className="card-actions">
          <button type="submit" className="primary-btn" disabled={submitting}>
            {submitting ? 'Guardando...' : mode === 'create' ? 'Crear Dueño' : 'Guardar cambios'}
          </button>
          <Link to="/duenos" className="ghost-btn">
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  )
}
