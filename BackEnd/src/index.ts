
import 'dotenv/config';

// Importamos Express y los tipos Request y Response desde express
// Esto nos permite tipar correctamente los parámetros de las rutas
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import duenoRoutes from './routes/dueno.routes';
import mascotaRoutes from './routes/mascota.routes';
import historialClinicoRoutes from './routes/historialClinico.routes';
import { connectDB } from './config/database';

// Creamos la instancia principal de la aplicación Express
const app = express();

// Definimos el puerto donde va a escuchar el servidor
const PORT = process.env.PORT || 3000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(cookieParser());

// Middleware que permite leer JSON en el body de las requests
app.use(express.json());

// Endpoint GET raíz
// URL: http://localhost:3000/
app.get('/', (req: Request, res: Response) => {
  // Respondemos con un objeto JSON simple
  res.json({ message: 'Servidor funcionando 🚀' });
});

// Endpoint GET /saludo
// URL: http://localhost:3000/saludo
app.get('/saludo', (req: Request, res: Response) => {
  res.json({ saludo: 'Hola desde Node.js + Express + TypeScript' });
});

// Endpoint 
app.use('/api/auth', authRoutes);
app.use('/api/duenos', duenoRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/historiales-clinicos', historialClinicoRoutes);

// Conectamos a la base de datos y luego iniciamos el servidor HTTP
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al iniciar la app:', error);
    process.exit(1);
  });