import { Schema, model } from 'mongoose';
import { IMascota } from '../types/IMascota';

const mascotaSchema = new Schema<IMascota>(
    {
        nombre: { type: String, required: true, trim: true },
        especie: { type: String, required: true, trim: true },
        raza: { type: String, required: true, trim: true },
        fechaNacimiento: { type: String, required: true, trim: true },
        peso: { type: Number, required: true },
        sexo: { type: String, required: true, trim: true },
        color: { type: String, required: true, trim: true },
        estado: { type: String, required: true, trim: true }, // 'Activo', 'Inactivo', 'Adoptado', 'Fallecido'
        dueno: { type: Schema.Types.ObjectId, ref: 'owner', required: true },
    },
    { timestamps: true }
);

export const Mascota = model<IMascota>('pets', mascotaSchema);