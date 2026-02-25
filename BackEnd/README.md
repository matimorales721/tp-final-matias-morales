# TP Final - Backend Veterinaria

## 1) Descripción general

API REST desarrollada con **Node.js + Express + TypeScript** para la gestión de una veterinaria.

Permite administrar:

- Autenticación por **JWT en cookie HTTP-only**.
- Usuarios, roles y permisos.
- Dueños.
- Mascotas.
- Historiales clínicos.

## 2) Tecnologías utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **MongoDB + Mongoose**
- **JWT** (`jsonwebtoken`)
- **bcrypt**
- **express-validator**
- **cors**
- **cookie-parser**
- **dotenv**

---

## 3) Instrucciones de instalación y ejecución

### Requisitos previos

- Node.js 20+
- MongoDB en ejecución (local o remoto)

### Pasos

1. Entrar a la carpeta backend:

```bash
cd BackEnd
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear el archivo de entorno a partir del ejemplo:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

4. Completar valores del archivo `.env` (ver sección **Variables de entorno**).

5. Levantar en modo desarrollo:

```bash
npm run dev
```

Opcional: cargar datos iniciales

```bash
npm run seed
```

### Scripts disponibles

- `npm run dev`: ejecuta el backend con recarga en caliente.
- `npm run build`: compila TypeScript a `dist/`.
- `npm run start`: ejecuta la versión compilada.
- `npm run seed`: ejecuta semilla de datos iniciales.

---

## 4) Variables de entorno

Archivo `.env`:

```env
# Puerto del servidor
PORT=3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/stock_db

# JWT
JWT_SECRET=mi-secreto-super-seguro-para-jwt
JWT_EXPIRES_IN=1d

# Frontend habilitado para CORS
FRONTEND_ORIGIN=http://localhost:5173
```

## 5) Ejemplos de endpoints

Base URL local:

```text
http://localhost:3000
```

### Auth - Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{
		"email": "admin@mail.com",
		"password": "Admin123!"
	}'
```

### Mascotas - Listar mascotas

```bash
curl http://localhost:3000/api/mascotas/listar-mascotas
```

### Historial clínico - Crear historial

```bash
curl -X POST http://localhost:3000/api/historiales-clinicos/crear-historial-clinico \
	-H "Content-Type: application/json" \
	-d '{
		"idMascota": "ID_MASCOTA_MONGODB",
		"idUsuario": "ID_USUARIO_MONGODB",
		"fecha": "2026-02-24",
		"diagnostico": "Otitis",
		"tratamiento": "Gotas óticas",
		"anotaciones": "Control en 7 días"
	}'
```

---

## 6) Frontend

Este repositorio incluye una implementación de frontend en la carpeta `FrontEnd/` (React + TypeScript + Vite), que consume esta API.
