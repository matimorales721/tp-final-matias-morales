import { Schema, model } from 'mongoose';

export interface IRol {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const rolSchema = new Schema<IRol>(
    {
        name: { type: String, required: true, unique: true, trim: true },
    },
    { timestamps: true }
);

export const Rol = model<IRol>('role', rolSchema);

export const createRole = async (rolNombre: string): Promise<void> => {
    const newRol = new Rol({
        name: rolNombre,
    });
    await newRol.save();
};

export const findRoleByName = async (name: string): Promise<IRol | null> => {
    const rol = await Rol.findOne({ name }).lean();
    if (!rol) return null;
    return {
        name: rol.name,
        createdAt: rol.createdAt,
        updatedAt: rol.updatedAt,
    };
};

export const findRoleById = async (id: string): Promise<IRol | null> => {
    const rol = await Rol.findById(id).lean();
    if (!rol) return null;
    return {
        name: rol.name,
        createdAt: rol.createdAt,
        updatedAt: rol.updatedAt,
    };
};

export const deleteRole = async (id: string): Promise<boolean> => {
    const result = await Rol.findByIdAndDelete(id);
    return result !== null;
};

export const updateRole = async (id: string, newName: string): Promise<IRol | null> => {
    const updated = await Rol.findByIdAndUpdate(
        id,
        { name: newName },
        { returnDocument: 'after' }
    ).lean();
    if (!updated) return null;
    return {
        name: updated.name,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
    };
};

export const findAll = async (): Promise<Partial<IRol>[]> => {
    const roles = await Rol.find().lean();
    return roles.map(rol => ({
        _id: rol._id,
        name: rol.name,
        createdAt: rol.createdAt,
        updatedAt: rol.updatedAt,
    }));
};