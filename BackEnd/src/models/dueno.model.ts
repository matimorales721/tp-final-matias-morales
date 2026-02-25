import mongoose, { Schema, model } from 'mongoose';
import { IDueno } from '../types/IDueno';

const duenoSchema = new Schema<IDueno>(
    {
        nombre: { type: String, required: true, trim: true },
        apellido: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        telefono: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

export const Dueno = mongoose.model<IDueno>('owner', duenoSchema);

// export const createDueno = async (
//     dueno: Omit<IDueno, 'id'>
// ): Promise<string> => {
//     const newDueno = new Dueno({
//         nombre: dueno.nombre,
//         apellido: dueno.apellido,
//         email: dueno.email,
//         telefono: dueno.telefono,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//     });
//     const saved = await newDueno.save();
//     return saved._id.toString();
// };