import { Schema, model } from 'mongoose';
import { Types } from 'mongoose';

interface IHistorialClinicoDB {
    id: string;
    mascota: Types.ObjectId;
    usuario: Types.ObjectId;
    fecha: string;
    diagnostico: string;
    tratamiento: string;
    anotaciones: string;
    createdAt: string;
    updatedAt: string;
}

const historialClinicoSchema = new Schema<IHistorialClinicoDB>(
    {
        mascota: { type: Schema.Types.ObjectId, ref: 'pets', required: true },
        usuario: { type: Schema.Types.ObjectId, ref: 'user', required: true },
        fecha: { type: String, required: true },
        diagnostico: { type: String, required: true, trim: true },
        tratamiento: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

export const HistorialClinico = model<IHistorialClinicoDB>('clinicalHistory', historialClinicoSchema);

// export const createHistorialClinico = async (
//     historial: Omit<IHistorialClinicoDB, 'id'>
// ): Promise<string> => {
//     const newHistorial = new HistorialClinico({
//         mascota: historial.mascota,
//         usuario: historial.usuario,
//         fecha: historial.fecha,
//         diagnostico: historial.diagnostico,
//         tratamiento: historial.tratamiento,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//     });
//     const saved = await newHistorial.save();
//     return saved._id.toString();
// };

export const listarHistorialesClinicosPorMascota = async (idMascota: string) => {
    return await HistorialClinico.find({ mascota: idMascota });
};