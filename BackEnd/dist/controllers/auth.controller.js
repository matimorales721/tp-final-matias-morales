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
exports.asignarPermiso = exports.listarPermisos = exports.crearPermiso = exports.listarRoles = exports.crearRol = exports.obtenerUsuario = exports.listarUsuarios = exports.eliminarUsuario = exports.modificarUsuario = exports.crearUsuario = exports.logout = exports.login = void 0;
const authService = __importStar(require("../services/auth.service"));
const express_validator_1 = require("express-validator");
const login = async (req, res) => {
    try {
        // Verificar errores de validación
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        // Guardar token en cookie HTTP-Only
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 horas
        });
        return res.json({ message: 'Login exitoso' });
    }
    catch (error) {
        console.error(error);
        if (error.message === 'Credenciales inválidas') {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};
exports.login = login;
const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Logout exitoso' });
};
exports.logout = logout;
const crearUsuario = async (req, res) => {
    try {
        // esto mejor ponerlo en un validator aparte, no en el controller
        // Verificar errores de validación
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, email, password, nombre, apellido, fechaNacimiento, roles } = req.body;
        const token = await authService.register(username, email, password, nombre, apellido, fechaNacimiento, roles);
        // Guardar token en cookie HTTP-Only
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 horas
        });
        return res.status(201).json({ message: 'Usuario creado exitosamente' });
    }
    catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'El usuario o email ya existe' });
        }
        return res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};
exports.crearUsuario = crearUsuario;
const modificarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, nombre, apellido, fechaNacimiento, roles } = req.body;
        // Verificar errores de validación
        // string id, si no es sting? error de validacion
        await authService.modificarUsuario(String(id), { username, email, nombre, apellido, fechaNacimiento, roles });
        return res.json({ message: 'Usuario modificado exitosamente' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al modificar usuario" });
    }
};
exports.modificarUsuario = modificarUsuario;
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // string id ??
        await authService.eliminarUsuario(String(id));
        return res.json({ message: 'Usuario eliminado exitosamente' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al eliminar usuario" });
    }
};
exports.eliminarUsuario = eliminarUsuario;
const listarUsuarios = async (_req, res) => {
    try {
        const usuarios = await authService.listarUsuarios();
        return res.json(usuarios);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al listar usuarios" });
    }
};
exports.listarUsuarios = listarUsuarios;
const obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await authService.obtenerUsuarioPorId(String(id));
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.json(usuario);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al obtener usuario" });
    }
};
exports.obtenerUsuario = obtenerUsuario;
const crearRol = async (req, res) => {
    try {
        const { nombre } = req.body;
        const rolId = await authService.crearRol(nombre);
        return res.status(201).json({ message: 'Rol creado exitosamente', rolId });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al crear rol" });
    }
};
exports.crearRol = crearRol;
const listarRoles = async (_req, res) => {
    try {
        const roles = await authService.listarRoles();
        return res.json(roles);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al listar roles" });
    }
};
exports.listarRoles = listarRoles;
const crearPermiso = async (req, res) => {
    try {
        const { nombre } = req.body;
        const permisoId = await authService.crearPermiso(nombre);
        return res.status(201).json({ message: 'Permiso creado exitosamente', permisoId });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al crear permiso" });
    }
};
exports.crearPermiso = crearPermiso;
const listarPermisos = async (_req, res) => {
    try {
        const permisos = await authService.listarPermisos();
        return res.json(permisos);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al listar permisos" });
    }
};
exports.listarPermisos = listarPermisos;
const asignarPermiso = async (req, res) => {
    try {
        const { rolId, permisoId } = req.body;
        await authService.asignarPermiso(rolId, permisoId);
        return res.json({ message: 'Permiso asignado al rol exitosamente' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al asignar permiso al rol" });
    }
};
exports.asignarPermiso = asignarPermiso;
