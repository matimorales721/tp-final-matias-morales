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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarRoles = exports.listarPermisos = exports.obtenerUsuarioPorId = exports.obtenerUsuario = exports.listarUsuarios = exports.asignarPermiso = exports.crearPermiso = exports.asignarRol = exports.crearRol = exports.eliminarUsuario = exports.modificarUsuario = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const usuarioModel = __importStar(require("../models/usuario.model"));
const usuarioRolModel = __importStar(require("../models/usuarioRol.model"));
const rolModel = __importStar(require("../models/rol.model"));
const permisoModel = __importStar(require("../models/permiso.model"));
const rolPermisoModel = __importStar(require("../models/rolPermiso.model"));
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no definido');
}
const secretKey = process.env.JWT_SECRET;
const generateId = () => (0, crypto_1.randomUUID)();
const register = async (username, email, password, nombre, apellido, fechaNacimiento, roles) => {
    await usuarioModel.findUserByEmail(email).then(user => {
        if (user && user.estado === 'ACTIVO') {
            throw new Error('El email ya existe');
        }
        ;
    });
    await usuarioModel.findUserByUsername(username).then(user => {
        if (user && user.estado === 'ACTIVO') {
            throw new Error('El username ya existe');
        }
        ;
    });
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const usuario = {
        id: generateId(),
        password: hashedPassword,
        username,
        nombre,
        apellido,
        fechaNacimiento,
        email,
        estado: 'ACTIVO',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    await usuarioModel.createUser(usuario);
    roles.map(rol => {
        usuarioRolModel.assignRole(usuario.id, rol);
    });
    // Generar token JWT para el usuario recién registrado
    const payload = {
        id: usuario.id,
        username: usuario.username,
    };
    const options = {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        issuer: 'curso-utn-backend',
    };
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
};
exports.register = register;
const login = async (email, password) => {
    console.log('Intentando login con email:', email);
    const invalidCredentialsError = new Error('Credenciales inválidas');
    const usuarioDB = await usuarioModel.findUserByEmail(email);
    if (!usuarioDB)
        throw invalidCredentialsError;
    const isValid = await bcrypt_1.default.compare(password, usuarioDB.password);
    if (!isValid)
        throw invalidCredentialsError;
    /**
     * Payload del token JWT
     * Contiene la información básica del usuario
     */
    const payload = {
        id: usuarioDB.id,
        username: usuarioDB.username,
    };
    /**
     * Configuración del token JWT
     * expiresIn: tiempo de expiración
     * issuer: emisor del token
     */
    const options = {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        issuer: 'curso-utn-backend',
    };
    /**
     * Generación del token JWT
     * Se firma el payload con el secreto y las opciones definidas
     */
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
};
exports.login = login;
const modificarUsuario = async (id, datos) => {
    await usuarioModel.updateUser(id, datos);
};
exports.modificarUsuario = modificarUsuario;
const eliminarUsuario = async (id) => {
    await usuarioModel.deleteUser(id);
};
exports.eliminarUsuario = eliminarUsuario;
const crearRol = async (nombre) => {
    await rolModel.createRole(nombre);
};
exports.crearRol = crearRol;
const asignarRol = async (usuarioId, rolNombre) => {
    await usuarioRolModel.assignRole(usuarioId, rolNombre);
};
exports.asignarRol = asignarRol;
const crearPermiso = async (nombre) => {
    await permisoModel.createPermission(nombre);
};
exports.crearPermiso = crearPermiso;
const asignarPermiso = async (rolNombre, permisoNombre) => {
    await rolPermisoModel.assignPermissionToRole(rolNombre, permisoNombre);
};
exports.asignarPermiso = asignarPermiso;
const listarUsuarios = async () => {
    return usuarioModel.findAll();
};
exports.listarUsuarios = listarUsuarios;
const obtenerUsuario = async (username) => {
    return usuarioModel.findUserByUsername(username);
};
exports.obtenerUsuario = obtenerUsuario;
const obtenerUsuarioPorId = async (id) => {
    return usuarioModel.findUserById(id);
};
exports.obtenerUsuarioPorId = obtenerUsuarioPorId;
// cambiar los any
const listarPermisos = async () => {
    return permisoModel.findAll();
};
exports.listarPermisos = listarPermisos;
// cambiar los any
const listarRoles = async () => {
    return rolModel.findAll();
};
exports.listarRoles = listarRoles;
