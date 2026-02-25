import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/auth';
import * as authService from '../services/auth.service';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateOrNot = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    // Buscar token en cookies
    let token = '';
    if (req.cookies) {
        token = req.cookies.token;
    } else {
        return next(); // No autenticado, continuar sin user
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(); // Token inválido, continuar sin user
        }
        req.user = decoded as JwtPayload;
        next();
    }
    );
};

/**
 * Middleware de autenticación
 *
 * Verifica que el token sea válido y lo almacena en req.user
 */
export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Buscar token en cookies
    let token = '';
    if (req.cookies) {
        token = req.cookies.token;
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token or expired' });
        }
        req.user = decoded as JwtPayload;
        next();
    });
};

/**
 * Middleware de autorización
 *
 * Verifica que el usuario tenga el permiso necesario para acceder a la ruta
 */
export const authorize = (permiso: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const usuario = await authService.obtenerUsuarioPorId(req.user?.id || '');
        const permisos = usuario?.permisos || [];
        if (!req.user || !permisos.includes(permiso)) {
            return res.status(403).json({ message: 'Acceso denegado. No tienes el permiso necesario.' });
        }
        next();
    };
};