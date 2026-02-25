"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mascota = void 0;
const mongoose_1 = require("mongoose");
const mascotaSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true, trim: true },
    especie: { type: String, required: true, trim: true },
    raza: { type: String, required: true, trim: true },
    fechaNacimiento: { type: String, required: true, trim: true },
    peso: { type: Number, required: true },
    sexo: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    estado: { type: String, required: true, trim: true }, // 'Activo', 'Inactivo', 'Adoptado', 'Fallecido'
    dueno: { type: mongoose_1.Schema.Types.ObjectId, ref: 'owner', required: true },
}, { timestamps: true });
exports.Mascota = (0, mongoose_1.model)('pets', mascotaSchema);
