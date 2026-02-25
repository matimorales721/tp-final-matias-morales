import e from 'express';
import mongoose, { Schema, Document } from 'mongoose';

export interface IPermiso extends Document {
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const permisoSchema = new Schema<IPermiso>(
    {
        description: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
    },
    { timestamps: true }
);
// permisoSchema.index({ description: 1 });

export const Permission = mongoose.model<IPermiso>('permission', permisoSchema);

export const createPermission = async (description: string): Promise<void> => {
    const newPermiso = new Permission({
        description,
    });
    await newPermiso.save();
};

export const findPermissionByDescription = async (description: string): Promise<Partial<IPermiso> | null> => {
    const permiso = await Permission.findOne({ description }).lean();
    if (!permiso) return null;
    return {
        _id: permiso._id,
        description: permiso.description,
        createdAt: permiso.createdAt,
        updatedAt: permiso.updatedAt,
    };
};

export const findPermissionById = async (id: string): Promise<Partial<IPermiso> | null> => {
    const permiso = await Permission.findById(id).lean();
    if (!permiso) return null;
    return {
        _id: permiso._id,
        description: permiso.description,
        createdAt: permiso.createdAt,
        updatedAt: permiso.updatedAt,

    };
};

export const findAll = async (): Promise<Partial<IPermiso>[]> => {
    const permisos = await Permission.find().lean();
    return permisos.map(permiso => ({
        _id: permiso._id,
        description: permiso.description,
        createdAt: permiso.createdAt,
        updatedAt: permiso.updatedAt,
    }));
};