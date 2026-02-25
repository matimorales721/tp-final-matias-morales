import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtPayload } from '../types/auth';
import { IUsuario } from '../types/IUsuario';
import { randomUUID } from 'crypto';
import * as usuarioModel from '../models/usuario.model';
import * as usuarioRolModel from '../models/usuarioRol.model';
import * as rolModel from '../models/rol.model';
import * as permisoModel from '../models/permiso.model';
import * as rolPermisoModel from '../models/rolPermiso.model';


if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no definido');
}

const secretKey: string = process.env.JWT_SECRET;

const generateId = (): string => randomUUID();

export const register = async (
    username: string,
    email: string,
    password: string,
    nombre: string,
    apellido: string,
    fechaNacimiento: string,
    roles: string[],
): Promise<string> => {

    await usuarioModel.findUserByEmail(email).then(user => {
        if (user && user.estado === 'ACTIVO') {
            throw new Error('El email ya existe');
        };
    });

    await usuarioModel.findUserByUsername(username).then(user => {
        if (user && user.estado === 'ACTIVO') {
            throw new Error('El username ya existe');
        };
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario: Omit<IUsuario, 'rol'> = {
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
    const payload: JwtPayload = {
        id: usuario.id,
        username: usuario.username,
    };

    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN as any) || '1h',
        issuer: 'curso-utn-backend',
    };

    return jwt.sign(payload, secretKey, options);
};

export const login = async (
    email: string,
    password: string
): Promise<string> => {

    console.log('Intentando login con email:', email);
    const invalidCredentialsError = new Error('Credenciales inválidas');

    const usuarioDB = await usuarioModel.findUserByEmail(email);
    console.log('Usuario encontrado en DB:', usuarioDB);
    if (!usuarioDB) throw invalidCredentialsError;

    const isValid = await bcrypt.compare(password, usuarioDB.password);
    if (!isValid) throw invalidCredentialsError;

    /**
     * Payload del token JWT
     * Contiene la información básica del usuario
     */
    const payload: JwtPayload = {
        id: usuarioDB.id,
        username: usuarioDB.username,
    };

    /**
     * Configuración del token JWT
     * expiresIn: tiempo de expiración
     * issuer: emisor del token
     */
    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN as any) || '1h',
        issuer: 'curso-utn-backend',
    };

    /**
     * Generación del token JWT
     * Se firma el payload con el secreto y las opciones definidas
     */
    return jwt.sign(payload, secretKey, options);
};

export const modificarUsuario = async (id: string, datos: Partial<IUsuario>): Promise<void> => {
    await usuarioModel.updateUser(id, datos);
};

export const eliminarUsuario = async (id: string): Promise<void> => {
    await usuarioModel.deleteUser(id);
};

export const crearRol = async (nombre: string): Promise<void> => {
    await rolModel.createRole(nombre);
};

export const asignarRol = async (usuarioId: string, rolNombre: string): Promise<void> => {
    await usuarioRolModel.assignRole(usuarioId, rolNombre);
};

export const crearPermiso = async (nombre: string): Promise<void> => {
    await permisoModel.createPermission(nombre);
};

export const asignarPermiso = async (rolNombre: string, permisoNombre: string): Promise<void> => {
    await rolPermisoModel.assignPermissionToRole(rolNombre, permisoNombre);
};

export const listarUsuarios = async (): Promise<IUsuario[]> => {
    return usuarioModel.findAll();
};

export const obtenerUsuario = async (username: string): Promise<IUsuario | null> => {
    return usuarioModel.findUserByUsername(username);
};

export const obtenerUsuarioPorId = async (id: string): Promise<IUsuario | null> => {
    return usuarioModel.findUserById(id);
};


// cambiar los any
export const listarPermisos = async (): Promise<any[]> => {
    return permisoModel.findAll();
};

// cambiar los any
export const listarRoles = async (): Promise<any[]> => {
    return rolModel.findAll();
};