import e, { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { validationResult } from 'express-validator';

export const login = async (req: Request, res: Response) => {
    try {

        console.log('Datos recibidos para login:', req.body);
        // Verificar errores de validación
        const errors = validationResult(req);
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
    } catch (error: any) {
        console.error(error);
        if (error.message === 'Credenciales inválidas') {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    return res.json({ message: 'Logout exitoso' });
};

export const crearUsuario = async (req: Request, res: Response) => {
    try {


        // esto mejor ponerlo en un validator aparte, no en el controller
        // Verificar errores de validación
        const errors = validationResult(req);
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
    } catch (error: any) {
        console.error(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'El usuario o email ya existe' });
        }
        return res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

export const modificarUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log('body recibido para modificar usuario:', req.body);
        const { username, email, nombre, apellido, fechaNacimiento, roles } = req.body;

        // Verificar errores de validación
        // string id, si no es sting? error de validacion


        await authService.modificarUsuario(String(id), { username, email, nombre, apellido, fechaNacimiento, roles });
        return res.json({ message: 'Usuario modificado exitosamente' });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al modificar usuario" });
    }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // string id ??

        await authService.eliminarUsuario(String(id));
        return res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al eliminar usuario" });
    }
};

export const listarUsuarios = async (_req: Request, res: Response) => {
    try {
        const usuarios = await authService.listarUsuarios();
        return res.json(usuarios);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al listar usuarios" });
    }
};

export const obtenerUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const usuario = await authService.obtenerUsuarioPorId(String(id));
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.json(usuario);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al obtener usuario" });
    }
};

export const crearRol = async (req: Request, res: Response) => {
    try {
        const { nombre } = req.body;
        const rolId = await authService.crearRol(nombre);
        return res.status(201).json({ message: 'Rol creado exitosamente', rolId });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al crear rol" });
    }
};

export const listarRoles = async (_req: Request, res: Response) => {
    try {
        const roles = await authService.listarRoles();
        return res.json(roles);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al listar roles" });
    }
};

export const crearPermiso = async (req: Request, res: Response) => {
    try {
        const { nombre } = req.body;
        const permisoId = await authService.crearPermiso(nombre);
        return res.status(201).json({ message: 'Permiso creado exitosamente', permisoId });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al crear permiso" });
    }
};

export const listarPermisos = async (_req: Request, res: Response) => {
    try {
        const permisos = await authService.listarPermisos();
        return res.json(permisos);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al listar permisos" });
    }
};

export const asignarPermiso = async (req: Request, res: Response) => {
    try {
        const { rolId, permisoId } = req.body;
        await authService.asignarPermiso(rolId, permisoId);
        return res.json({ message: 'Permiso asignado al rol exitosamente' });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al asignar permiso al rol" });
    }
};


