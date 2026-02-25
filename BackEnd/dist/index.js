"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
// Importamos Express y los tipos Request y Response desde express
// Esto nos permite tipar correctamente los parámetros de las rutas
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const dueno_routes_1 = __importDefault(require("./routes/dueno.routes"));
const mascota_routes_1 = __importDefault(require("./routes/mascota.routes"));
const historialClinico_routes_1 = __importDefault(require("./routes/historialClinico.routes"));
const database_1 = require("./config/database");
// Creamos la instancia principal de la aplicación Express
const app = (0, express_1.default)();
// Definimos el puerto donde va a escuchar el servidor
const PORT = 3000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
app.use((0, cors_1.default)({
    origin: FRONTEND_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use((0, cookie_parser_1.default)());
// Middleware que permite leer JSON en el body de las requests
app.use(express_1.default.json());
// Endpoint GET raíz
// URL: http://localhost:3000/
app.get('/', (req, res) => {
    // Respondemos con un objeto JSON simple
    res.json({ message: 'Servidor funcionando 🚀' });
});
// Endpoint GET /saludo
// URL: http://localhost:3000/saludo
app.get('/saludo', (req, res) => {
    res.json({ saludo: 'Hola desde Node.js + Express + TypeScript' });
});
// Endpoint 
app.use('/api/auth', auth_routes_1.default);
app.use('/api/duenos', dueno_routes_1.default);
app.use('/api/mascotas', mascota_routes_1.default);
app.use('/api/historiales-clinicos', historialClinico_routes_1.default);
// Conectamos a la base de datos y luego iniciamos el servidor HTTP
(0, database_1.connectDB)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('❌ Error al iniciar la app:', error);
    process.exit(1);
});
