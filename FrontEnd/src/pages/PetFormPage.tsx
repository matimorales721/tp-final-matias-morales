import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import type { IDueno, IMascota } from '../types/domain'

interface PetFormPageProps {
  mode: 'create' | 'edit'
}

export function PetFormPage({ mode }: PetFormPageProps) {
  const navigate = useNavigate()
  const { id = '' } = useParams()

  const [owners, setOwners] = useState<IDueno[]>([])
  const [nombre, setNombre] = useState('')
  const [especie, setEspecie] = useState('')
  const [raza, setRaza] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [peso, setPeso] = useState('')
  const [sexo, setSexo] = useState('')
  const [color, setColor] = useState('')
  const [estado, setEstado] = useState('')
  const [duenoId, setDuenoId] = useState('')

  const [newOwnerName, setNewOwnerName] = useState('')
  const [newOwnerLastname, setNewOwnerLastname] = useState('')
  const [newOwnerEmail, setNewOwnerEmail] = useState('')
  const [newOwnerPhone, setNewOwnerPhone] = useState('')

  const [loading, setLoading] = useState(mode === 'edit')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const title = useMemo(() => (mode === 'create' ? 'Crear Mascota' : 'Editar Mascota'), [mode])

  const loadOwners = async () => {
    try {
      const data = await api.listOwners()
      setOwners(data)
      if (!duenoId && data.length > 0) {
        setDuenoId(data[0]._id)
      }
    } catch {
      setOwners([])
    }
  }

  useEffect(() => {
    void loadOwners()
  }, [])

  useEffect(() => {
    if (mode !== 'edit') return

    const run = async () => {
      setLoading(true)
      setError('')
      try {
        const pet = await api.getPet(id)
        hydrateForm(pet)
      } catch (caughtError) {
        const message = caughtError instanceof Error ? caughtError.message : 'No se pudo cargar la mascota'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    void run()
  }, [id, mode])

  const hydrateForm = (pet: IMascota) => {
    setNombre(pet.nombre)
    setEspecie(pet.especie)
    setRaza(pet.raza)
    setFechaNacimiento(pet.fechaNacimiento?.slice(0, 10) || '')
    setPeso(String(pet.peso ?? ''))
    setSexo(pet.sexo)
    setColor(pet.color)
    setEstado(pet.estado)
    setDuenoId(typeof pet.dueno === 'string' ? pet.dueno : pet.dueno._id)
  }

  const createOwnerIfNeeded = async () => {
    if (!newOwnerName || !newOwnerLastname || !newOwnerEmail || !newOwnerPhone) {
      return
    }

    const response = await api.createOwner({
      nombre: newOwnerName,
      apellido: newOwnerLastname,
      email: newOwnerEmail,
      telefono: newOwnerPhone,
      direccion: '',
    })

    await loadOwners()
    setDuenoId(response.duenoId)
    setNewOwnerName('')
    setNewOwnerLastname('')
    setNewOwnerEmail('')
    setNewOwnerPhone('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await createOwnerIfNeeded()

      const payload = {
        nombre,
        especie,
        raza,
        fechaNacimiento,
        peso: Number(peso),
        sexo,
        color,
        estado,
        dueno: duenoId,
      }

      if (mode === 'create') {
        await api.createPet(payload)
      } else {
        await api.updatePet(id, payload)
      }

      navigate('/mascotas')
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'No se pudo guardar la mascota'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando mascota...</p>

  return (
    <section className="panel">
      <h2>{title}</h2>

      <form className="stacked-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" value={nombre} onChange={(event) => setNombre(event.target.value)} required />

        <label htmlFor="especie">Especie</label>
        <input id="especie" value={especie} onChange={(event) => setEspecie(event.target.value)} required />

        <label htmlFor="raza">Raza</label>
        <input id="raza" value={raza} onChange={(event) => setRaza(event.target.value)} required />

        <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
        <input
          id="fechaNacimiento"
          type="date"
          value={fechaNacimiento}
          onChange={(event) => setFechaNacimiento(event.target.value)}
          required
        />

        <label htmlFor="peso">Peso (kg)</label>
        <input id="peso" type="number" step="0.1" value={peso} onChange={(event) => setPeso(event.target.value)} required />

        <label htmlFor="sexo">Sexo</label>
        <input id="sexo" value={sexo} onChange={(event) => setSexo(event.target.value)} required />

        <label htmlFor="color">Color</label>
        <input id="color" value={color} onChange={(event) => setColor(event.target.value)} required />

        <label htmlFor="estado">Estado</label>
        <input id="estado" value={estado} onChange={(event) => setEstado(event.target.value)} required />

        <label htmlFor="duenoId">Dueño</label>
        <select id="duenoId" value={duenoId} onChange={(event) => setDuenoId(event.target.value)} required>
          {owners.map((owner) => (
            <option key={owner._id} value={owner._id}>
              {owner.nombre} {owner.apellido} - {owner.email}
            </option>
          ))}
        </select>

        <fieldset className="roles-fieldset">
          <legend>Crear dueño rápido (opcional)</legend>
          <label htmlFor="newOwnerName">Nombre</label>
          <input id="newOwnerName" value={newOwnerName} onChange={(event) => setNewOwnerName(event.target.value)} />

          <label htmlFor="newOwnerLastname">Apellido</label>
          <input id="newOwnerLastname" value={newOwnerLastname} onChange={(event) => setNewOwnerLastname(event.target.value)} />

          <label htmlFor="newOwnerEmail">Email</label>
          <input
            id="newOwnerEmail"
            type="email"
            value={newOwnerEmail}
            onChange={(event) => setNewOwnerEmail(event.target.value)}
          />

          <label htmlFor="newOwnerPhone">Teléfono</label>
          <input id="newOwnerPhone" value={newOwnerPhone} onChange={(event) => setNewOwnerPhone(event.target.value)} />
        </fieldset>

        {error && <p className="error-text">{error}</p>}

        <div className="card-actions">
          <button type="submit" className="primary-btn" disabled={submitting}>
            {submitting ? 'Guardando...' : mode === 'create' ? 'Crear Mascota' : 'Guardar cambios'}
          </button>
          <Link to="/mascotas" className="ghost-btn">
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  )
}
