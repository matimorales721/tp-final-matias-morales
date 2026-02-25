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
exports.authorize = exports.authenticate = exports.authenticateOrNot = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authService = __importStar(require("../services/auth.service"));
const JWT_SECRET = process.env.JWT_SECRET;
const authenticateOrNot = (req, res, next) => {
    // Buscar token en cookies
    let token = '';
    if (req.cookies) {
        token = req.cookies.token;
    }
    else {
        return next(); // No autenticado, continuar sin user
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(); // Token inválido, continuar sin user
        }
        req.user = decoded;
        next();
    });
};
exports.authenticateOrNot = authenticateOrNot;
/**
 * Middleware de autenticación
 *
 * Verifica que el token sea válido y lo almacena en req.user
 */
const authenticate = (req, res, next) => {
    // Buscar token en cookies
    let token = '';
    if (req.cookies) {
        token = req.cookies.token;
    }
    else {
        return res.status(401).json({ message: 'No token provided' });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token or expired' });
        }
        req.user = decoded;
        next();
    });
};
exports.authenticate = authenticate;
/**
 * Middleware de autorización
 *
 * Verifica que el usuario tenga el permiso necesario para acceder a la ruta
 */
const authorize = (permiso) => {
    return async (req, res, next) => {
        const usuario = await authService.obtenerUsuarioPorId(req.user?.id || '');
        const permisos = usuario?.permisos || [];
        if (!req.user || !permisos.includes(permiso)) {
            return res.status(403).json({ message: 'Acceso denegado. No tienes el permiso necesario.' });
        }
        next();
    };
};
exports.authorize = authorize;
