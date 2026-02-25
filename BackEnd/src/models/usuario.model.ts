import mongoose, { Schema, Document } from 'mongoose';
// import { UserRole } from '../types/auth';
import { IUsuario } from '../types/IUsuario';

const usuarioSchema = new Schema<IUsuario>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido'],
        },
        password: { type: String, required: true, minlength: 8 },
        nombre: { type: String, required: true, trim: true },
        apellido: { type: String, required: true, trim: true },
        fechaNacimiento: { type: String, required: true },
        estado: { type: String, required: true },

    },
    { timestamps: true }
);

// usuarioSchema.index({ email: 1 });
// usuarioSchema.index({ username: 1 });

export const Usuario = mongoose.model<IUsuario>('user', usuarioSchema);

export const createUser = async (
    user: Omit<IUsuario, 'id'>
): Promise<string> => {
    const newUser = new Usuario({
        username: user.username,
        email: user.email,
        password: user.password,
        nombre: user.nombre,
        apellido: user.apellido,
        fechaNacimiento: user.fechaNacimiento,
        estado: user.estado,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
    const saved = await newUser.save();
    return saved._id.toString();
};

export const findUserByEmail = async (
    email: string = '',
): Promise<IUsuario | null> => {
    const user = await Usuario.findOne({ email }).lean();
    if (!user) return null;

    return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
        nombre: user.nombre,
        apellido: user.apellido,
        fechaNacimiento: user.fechaNacimiento,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        estado: user.estado,
    };
};

export const findUserByUsername = async (
    username: string = '',
): Promise<IUsuario | null> => {
    const user = await Usuario.findOne({ username }).lean();
    if (!user) return null;

    return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
        nombre: user.nombre,
        apellido: user.apellido,
        fechaNacimiento: user.fechaNacimiento,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        estado: user.estado,
    };
};

export const findUserById = async (
    id: string = ''
): Promise<IUsuario | null> => {
    const user = await Usuario.findById(id).lean();
    if (!user) return null;
    return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
        nombre: user.nombre,
        apellido: user.apellido,
        fechaNacimiento: user.fechaNacimiento,
        estado: user.estado,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};

export const findAll = async (): Promise<IUsuario[]> => {
    const users = await Usuario.find().lean();
    return users.map(user => ({
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
        nombre: user.nombre,
        apellido: user.apellido,
        fechaNacimiento: user.fechaNacimiento,
        estado: user.estado,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }));
};

export const updateUser = async (
    id: string,
    updates: Partial<Omit<IUsuario, 'id' | 'createdAt'>>
): Promise<IUsuario | null> => {
    const updated = await Usuario.findByIdAndUpdate(
        id,
        { ...updates, updatedAt: new Date().toISOString() },
        { returnDocument: 'after' }
    ).lean();
    if (!updated) return null;

    return {
        id: updated._id.toString(),
        username: updated.username,
        email: updated.email,
        password: updated.password,
        nombre: updated.nombre,
        apellido: updated.apellido,
        fechaNacimiento: updated.fechaNacimiento,
        estado: updated.estado,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
    };
};

export const deleteUser = async (id: string): Promise<boolean> => {
    const result = await Usuario.findByIdAndDelete(id);
    return result !== null;
};