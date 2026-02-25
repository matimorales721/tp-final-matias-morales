# Frontend Veterinaria

Aplicación frontend en React + TypeScript + Vite para gestionar:

- Login por sesión con cookie JWT
- Usuarios (ADMIN)
- Mascotas
- Historiales clínicos

## Requisitos

- Node.js 20+
- Backend corriendo en `http://localhost:3000/`

## Configuración

1. Copiar variables de entorno:

```bash
cp .env.example .env
```

2. Verificar valor:

```env
VITE_API_URL=http://localhost:3000/
```

## Ejecutar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
