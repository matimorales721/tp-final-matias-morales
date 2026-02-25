"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const authService = __importStar(require("../services/auth.service"));
const database_1 = require("../config/database");
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stock_db';
// Datos iniciales
const ROLES_INICIALES = [
    { nombre: 'ADMIN' },
    { nombre: 'VETERINARIO' },
    { nombre: 'RECEPCIONISTA' },
];
const PERMISOS_INICIALES = [
    { nombre: 'crearRol' },
    { nombre: 'crearPermiso' },
    { nombre: 'asignarPermiso' },
    //   { nombre: 'crear-mascota' },
    //   { nombre: 'editar-mascota' },
    //   { nombre: 'eliminar-mascota' },
    //   { nombre: 'ver_historial_clinico' },
    //   { nombre: 'crear_historial_clinico' },
];
const USUARIOS_INICIALES = [
    {
        username: 'admin',
        email: 'admin@example.com',
        password: 'Admin123!',
        nombre: 'Administrador',
        apellido: 'del Sistema',
        fechaNacimiento: '2026-01-01',
        rolNombre: 'ADMIN',
    },
    {
        username: 'vet_juan',
        email: 'veterinario@example.com',
        password: 'Vet123!',
        nombre: 'Juan',
        apellido: 'García',
        fechaNacimiento: '1985-05-15',
        rolNombre: 'VETERINARIO',
    },
];
async function seed() {
    try {
        await (0, database_1.connectDB)();
        console.log('🌱 Iniciando seeding de datos...\n');
        // Crear roles
        console.log('📝 Creando roles...');
        const rolesCreados = [];
        for (const rol of ROLES_INICIALES) {
            try {
                const rolId = await authService.crearRol(rol.nombre);
                rolesCreados.push({ nombre: rol.nombre, id: rolId });
                console.log(`✅ Rol "${rol.nombre}" creado: ${rolId}`);
            }
            catch (error) {
                if (error.message?.includes('duplicate')) {
                    console.log(`⚠️ Rol "${rol.nombre}" ya existe`);
                }
                else {
                    throw error;
                }
            }
        }
        // Crear permisos
        console.log('\n📝 Creando permisos...');
        // any ????
        const permisosCreados = [];
        for (const permiso of PERMISOS_INICIALES) {
            try {
                const permisoId = await authService.crearPermiso(permiso.nombre);
                permisosCreados.push({ nombre: permiso.nombre, id: permisoId });
                console.log(`✅ Permiso "${permiso.nombre}" creado: ${permisoId}`);
            }
            catch (error) {
                if (error.message?.includes('duplicate')) {
                    console.log(`⚠️ Permiso "${permiso.nombre}" ya existe`);
                }
                else {
                    throw error;
                }
            }
        }
        // Asignar permisos al rol ADMIN
        console.log('\n📝 Asignando permisos al rol ADMIN...');
        const rolAdmin = rolesCreados.find((r) => r.nombre === 'ADMIN');
        if (rolAdmin && permisosCreados.length > 0) {
            for (const permiso of permisosCreados) {
                try {
                    await authService.asignarPermiso(rolAdmin.id, permiso.id);
                    console.log(`✅ Permiso "${permiso.nombre}" asignado al rol ADMIN`);
                }
                catch (error) {
                    if (!error.message?.includes('duplicate')) {
                        console.log(`⚠️ Permiso "${permiso.nombre}" ya estaba asignado al rol ADMIN`);
                    }
                }
            }
        }
        // Crear usuarios
        console.log('\n👤 Creando usuarios iniciales...');
        for (const usuario of USUARIOS_INICIALES) {
            try {
                const rolUser = rolesCreados.find((r) => r.nombre === usuario.rolNombre);
                if (!rolUser) {
                    console.log(`⚠️ No se encontró el rol ${usuario.rolNombre}`);
                    continue;
                }
                const token = await authService.register(usuario.username, usuario.email, usuario.password, usuario.nombre, usuario.apellido, usuario.fechaNacimiento, [rolUser.id]);
                console.log(`✅ Usuario "${usuario.username}" creado exitosamente`);
            }
            catch (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    console.log(`⚠️ Usuario "${usuario.username}" ya existe`);
                }
                else {
                    throw error;
                }
            }
        }
        console.log('\n✨ ¡Seeding completado exitosamente!');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error durante el seeding:', error);
        process.exit(1);
    }
}
seed();
