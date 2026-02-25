export function formatDate(input?: string) {
    if (!input) return '-'
    const date = new Date(input)
    if (Number.isNaN(date.getTime())) return '-'
    return new Intl.DateTimeFormat('es-AR').format(date)
}

export function roleLabel(role: string) {
    switch (role.toUpperCase()) {
        case 'ADMIN':
            return 'ADMIN'
        case 'VETERINARIO':
            return 'VETERINARIO'
        case 'RECEPCIONISTA':
            return 'RECEPCIONISTA'
        default:
            return role
    }
}

export function fullName(nombre?: string, apellido?: string) {
    return [nombre, apellido].filter(Boolean).join(' ').trim() || '-'
}
