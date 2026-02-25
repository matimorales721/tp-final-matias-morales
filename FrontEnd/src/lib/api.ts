import type { IDueno, IHistorialClinico, IMascota, IUsuario, ValidationError } from '../types/domain'

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000/').replace(/\/$/, '')

interface ApiValidationErrorResponse {
    errors?: ValidationError[]
    error?: string
    message?: string
}

function getErrorMessage(payload: ApiValidationErrorResponse): string {
    if (Array.isArray(payload.errors) && payload.errors.length > 0) {
        return payload.errors.map((error) => error.msg).join('. ')
    }

    return payload.error || payload.message || 'Ocurrió un error inesperado'
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`, {
        ...init,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers || {}),
        },
    })

    if (!response.ok) {
        let errorPayload: ApiValidationErrorResponse = {}
        try {
            errorPayload = await response.json()
        } catch {
            errorPayload = { message: 'No se pudo procesar la respuesta del servidor' }
        }

        throw new Error(getErrorMessage(errorPayload))
    }

    if (response.status === 204) {
        return null as T
    }

    return (await response.json()) as T
}

export const api = {
    async health() {
        return request<{ message: string }>('/')
    },

    async saludo() {
        return request<{ saludo: string }>('/saludo')
    },

    async login(payload: { email: string; password: string }) {
        return request<{ message: string }>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },

    async logout() {
        return request<{ message: string }>('/api/auth/logout', {
            method: 'POST',
            body: JSON.stringify({}),
        })
    },

    async createUser(payload: Omit<IUsuario, '_id' | 'roles'> & { password: string; roles: string[] }) {
        return request<{ message: string }>('/api/auth/crear-usuario', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },

    async listUsers() {
        return request<IUsuario[]>('/api/auth/listar-usuarios')
    },

    async getUser(id: string) {
        return request<IUsuario>(`/api/auth/usuario/${id}`)
    },

    async updateUser(id: string, payload: Partial<Omit<IUsuario, '_id'>>) {
        return request<{ message: string }>(`/api/auth/modificar-usuario/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },

    async deleteUser(id: string) {
        return request<{ message: string }>(`/api/auth/eliminar-usuario/${id}`, {
            method: 'DELETE',
        })
    },

    async listRoles() {
        return request<Array<{ _id: string; name: string }>>('/api/auth/listar-roles')
    },

    async createOwner(payload: Omit<IDueno, '_id'>) {
        return request<{ message: string; duenoId: string }>('/api/duenos/crear-dueno', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },

    async listOwners() {
        return request<IDueno[]>('/api/duenos/listar-duenos')
    },

    async getOwner(id: string) {
        return request<IDueno>(`/api/duenos/dueno/${id}`)
    },

    async updateOwner(id: string, payload: Partial<Omit<IDueno, '_id'>>) {
        return request<{ message: string }>(`/api/duenos/modificar-dueno/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },

    async deleteOwner(id: string) {
        return request<{ message: string }>(`/api/duenos/eliminar-dueno/${id}`, {
            method: 'DELETE',
        })
    },

    async createPet(payload: Omit<IMascota, '_id' | 'dueno'> & { dueno: string }) {
        return request<{ message: string; mascotaId: string }>('/api/mascotas/crear-mascota', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },

    async listPets() {
        return request<IMascota[]>('/api/mascotas/listar-mascotas')
    },

    async getPet(id: string) {
        return request<IMascota>(`/api/mascotas/mascota/${id}`)
    },

    async updatePet(id: string, payload: Partial<Omit<IMascota, '_id'>>) {
        return request<{ message: string }>(`/api/mascotas/modificar-mascota/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },

    async deletePet(id: string) {
        return request<{ message: string }>(`/api/mascotas/eliminar-mascota/${id}`, {
            method: 'DELETE',
        })
    },

    async createHistory(payload: {
        mascota: string
        usuario: string
        fecha: string
        diagnostico: string
        tratamiento: string
        anotaciones?: string
    }) {
        return request<{ message: string; historialClinicoId: string }>('/api/historiales-clinicos/crear-historial-clinico', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },

    async listHistories() {
        return request<IHistorialClinico[]>('/api/historiales-clinicos/listar-historiales-clinicos')
    },

    async getHistory(id: string) {
        return request<IHistorialClinico>(`/api/historiales-clinicos/historial-clinico/${id}`)
    },

    async listHistoriesByPet(idMascota: string) {
        return request<IHistorialClinico[]>(`/api/historiales-clinicos/historial-clinico-mascota/${idMascota}`)
    },

    async updateHistory(
        id: string,
        payload: {
            mascota: string
            usuario: string
            fecha: string
            diagnostico: string
            tratamiento: string
            anotaciones?: string
        },
    ) {
        return request<{ message: string }>(`/api/historiales-clinicos/modificar-historial-clinico/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },

    async deleteHistory(id: string) {
        return request<{ message: string }>(`/api/historiales-clinicos/eliminar-historial-clinico/${id}`, {
            method: 'DELETE',
        })
    },
}
