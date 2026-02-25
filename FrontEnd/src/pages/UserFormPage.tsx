import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import type { IUsuario } from '../types/domain'

interface UserFormPageProps {
  mode: 'create' | 'edit'
}

const DEFAULT_ROLES = ['ADMIN', 'VETERINARIO', 'RECEPCIONISTA']

export function UserFormPage({ mode }: UserFormPageProps) {
  const navigate = useNavigate()
  const { id = '' } = useParams()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [roles, setRoles] = useState<string[]>([])

  const [availableRoles, setAvailableRoles] = useState<string[]>(DEFAULT_ROLES)
  const [loading, setLoading] = useState(mode === 'edit')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const title = useMemo(() => (mode === 'create' ? 'Crear Usuario' : 'Editar Usuario'), [mode])

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await api.listRoles()
        const mapped = data.map((role) => role.name.toUpperCase())
        if (mapped.length > 0) {
          setAvailableRoles(mapped)
        }
      } catch {
        setAvailableRoles(DEFAULT_ROLES)
      }
    }

    void loadRoles()
  }, [])

  useEffect(() => {
    if (mode !== 'edit') return

    const loadUser = async () => {
      setLoading(true)
      setError('')
      try {
        const user = await api.getUser(id)
        hydrateForm(user)
      } catch (caughtError) {
        const message = caughtError instanceof Error ? caughtError.message : 'No se pudo cargar el usuario'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    void loadUser()
  }, [id, mode])

  const hydrateForm = (user: IUsuario) => {
    setUsername(user.username)
    setEmail(user.email)
    setNombre(user.nombre)
    setApellido(user.apellido)
    setFechaNacimiento(user.fechaNacimiento?.slice(0, 10) || '')
    setRoles(user.roles.map((role) => (typeof role === 'string' ? role : role.name).toUpperCase()))
  }

  const toggleRole = (value: string) => {
    setRoles((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      if (roles.length === 0) {
        throw new Error('Debés seleccionar al menos un rol')
      }

      if (mode === 'create') {
        await api.createUser({
          username,
          email,
          password,
          nombre,
          apellido,
          fechaNacimiento,
          roles,
        })
      } else {
        await api.updateUser(id, {
          username,
          email,
          nombre,
          apellido,
          fechaNacimiento,
          roles,
        })
      }

      navigate('/admin/usuarios')
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'No se pudo guardar el usuario'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando usuario...</p>

  return (
    <section className="panel">
      <h2>{title}</h2>

      <form className="stacked-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" value={username} onChange={(event) => setUsername(event.target.value)} required />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />

        {mode === 'create' && (
          <>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </>
        )}

        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" value={nombre} onChange={(event) => setNombre(event.target.value)} required />

        <label htmlFor="apellido">Apellido</label>
        <input id="apellido" value={apellido} onChange={(event) => setApellido(event.target.value)} required />

        <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
        <input
          id="fechaNacimiento"
          type="date"
          value={fechaNacimiento}
          onChange={(event) => setFechaNacimiento(event.target.value)}
        />

        <fieldset className="roles-fieldset">
          <legend>Roles</legend>
          {availableRoles.map((role) => (
            <label key={role} className="checkbox-row">
              <input type="checkbox" checked={roles.includes(role)} onChange={() => toggleRole(role)} />
              {role}
            </label>
          ))}
        </fieldset>

        {error && <p className="error-text">{error}</p>}

        <div className="card-actions">
          <button type="submit" className="primary-btn" disabled={submitting}>
            {submitting ? 'Guardando...' : mode === 'create' ? 'Crear' : 'Guardar cambios'}
          </button>
          <Link to="/admin/usuarios" className="ghost-btn">
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  )
}
