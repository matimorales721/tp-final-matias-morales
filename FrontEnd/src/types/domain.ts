export type UserRole = 'ADMIN' | 'VETERINARIO' | 'RECEPCIONISTA' | string

export interface IRole {
    _id?: string
    name: string
}

export interface IUsuario {
    _id: string
    username: string
    email: string
    nombre: string
    apellido: string
    fechaNacimiento?: string
    roles: Array<string | IRole>
}

export interface IDueno {
    _id: string
    nombre: string
    apellido: string
    email: string
    telefono: string
    direccion?: string
}

export interface IMascota {
    _id: string
    nombre: string
    especie: string
    raza: string
    fechaNacimiento: string
    peso: number
    sexo: string
    color: string
    estado: string
    dueno: string | IDueno
}

export interface IHistorialClinico {
    _id: string
    mascota: string | IMascota
    usuario: string | IUsuario
    fecha: string
    diagnostico: string
    tratamiento: string
    anotaciones?: string
}

export interface ValidationError {
    msg: string
    path?: string
}
