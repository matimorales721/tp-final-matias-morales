"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarHistorialesClinicosPorMascota = exports.HistorialClinico = void 0;
const mongoose_1 = require("mongoose");
const historialClinicoSchema = new mongoose_1.Schema({
    mascota: { type: mongoose_1.Schema.Types.ObjectId, ref: 'pets', required: true },
    usuario: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    fecha: { type: String, required: true },
    diagnostico: { type: String, required: true, trim: true },
    tratamiento: { type: String, required: true, trim: true },
}, { timestamps: true });
exports.HistorialClinico = (0, mongoose_1.model)('clinicalHistory', historialClinicoSchema);
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
const listarHistorialesClinicosPorMascota = async (idMascota) => {
    return await exports.HistorialClinico.find({ mascota: idMascota });
};
exports.listarHistorialesClinicosPorMascota = listarHistorialesClinicosPorMascota;
