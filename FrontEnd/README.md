# TP Final - Frontend Veterinaria

## 1) Descripción general

Aplicación web desarrollada con **React + TypeScript + Vite** para gestionar la operación de una veterinaria consumiendo la API del backend.

Permite:

- Iniciar/cerrar sesión con autenticación basada en cookie JWT.
- Administrar usuarios (vista y acciones de administrador).
- Gestionar dueños, mascotas e historiales clínicos.
- Controlar acceso por roles desde rutas protegidas.

---

## 2) Tecnologías utilizadas

- **React 19**
- **TypeScript**
- **Vite**
- **React Router DOM**
- **ESLint**

---

## 3) Instrucciones de instalación y ejecución

### Requisitos previos

- Node.js 20+
- Backend en ejecución (por defecto: `http://localhost:3000/`)

### Pasos

1. Entrar a la carpeta frontend:

```bash
cd FrontEnd
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo de entorno:

```bash
cp .env.example .env
```

4. Verificar valor de `VITE_API_URL` en `.env` (ver sección Variables de entorno).

5. Ejecutar en desarrollo:

```bash
npm run dev
```

El frontend queda disponible en la URL indicada por Vite (normalmente `http://localhost:5173`).

### Scripts disponibles

- `npm run dev`: levanta la app en modo desarrollo.
- `npm run build`: ejecuta chequeo TypeScript y genera build de producción.
- `npm run preview`: sirve el build localmente para validación.
- `npm run lint`: ejecuta lint del proyecto.

---

## 4) Variables de entorno

Archivo `.env`:

```env
VITE_API_URL=http://localhost:3000/
```

Notas:

- `VITE_API_URL` define la URL base de la API backend.
- Si no se define, el frontend usa `http://localhost:3000/` como fallback.

---

## 5) Rutas principales del frontend

- `/login` → inicio de sesión.
- `/admin/usuarios` → gestión de usuarios (solo ADMIN).
- `/duenos` → gestión de dueños.
- `/mascotas` → gestión de mascotas.
- `/historiales/nuevo` → alta de historial clínico.

---

## 6) Backend

Este frontend está preparado para trabajar con el backend del mismo repositorio (`BackEnd/`).