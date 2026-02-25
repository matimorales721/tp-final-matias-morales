export interface IUsuario {
    username: string;
    email: string;
    password: string;
    id: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    estado: string; // 'Activo', 'Inactivo', 'Suspendido'
    roles?: string[]; // ['Veterinario', 'Admin', 'Asistente']
    permisos?: string[];
    createdAt: string;
    updatedAt: string;
}