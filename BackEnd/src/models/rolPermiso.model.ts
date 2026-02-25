import { Schema, model } from 'mongoose';

export interface IRolPermiso {
    idRol: string;
    idPermiso: string;
}

const rolPermisoSchema = new Schema<IRolPermiso>(
    {
        idRol: { type: String, required: true, trim: true },
        idPermiso: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

export const RolPermiso = model<IRolPermiso>('role_permission', rolPermisoSchema);

export const assignPermissionToRole = async (idRol: string, idPermiso: string): Promise<void> => {
    
    if (!idRol) throw new Error('Rol no encontrado');
    if (!idPermiso) throw new Error('Permiso no encontrado');

    const rolPermiso: IRolPermiso = {
        idRol,
        idPermiso,
    };

    const newRolPermiso = new RolPermiso(rolPermiso);
    await newRolPermiso.save();
    
};