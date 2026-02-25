import { Schema, model } from 'mongoose';

export interface IUsuarioRol {
    idUsuario: string;
    idRol: string;
}

const usuarioRolSchema = new Schema<IUsuarioRol>(
    {
        idUsuario: {
            type: String,
            required: true,
            trim: true,
        },
        idRol: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

export const UsuarioRol = model<IUsuarioRol>('user_role', usuarioRolSchema);

export const assignRole = async (idUsuario: string, idRol: string): Promise<void> => {
    const newUsuarioRol = new UsuarioRol({
        idUsuario,
        idRol,
    });
    await newUsuarioRol.save();
}

export const findRolesByUsuarioId = async (idUsuario: string): Promise<string[]> => {
    const roles = await UsuarioRol.find({ idUsuario }).lean();
    return roles.map(ur => ur.idRol);
}

export const removeRolesByUsuarioId = async (idUsuario: string, rol?: string): Promise<void> => {
    if (rol) {
        await UsuarioRol.deleteMany({ idUsuario, idRol: rol });
    } else {
        await UsuarioRol.deleteMany({ idUsuario });
    }
}