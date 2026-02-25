"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarMascota = exports.modificarMascota = exports.obtenerMascota = exports.listarMascotas = exports.crearMascota = void 0;
const mascotaService = __importStar(require("../services/mascota.service"));
const mongoose_1 = require("mongoose");
const crearMascota = async (req, res) => {
    try {
        const mascotaData = req.body;
        const mascotaId = await mascotaService.crearMascota(mascotaData);
        return res.status(201).json({ message: 'Mascota creada exitosamente', mascotaId });
    }
    catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).json('Mascota con esos datos ya existe.');
        }
        return res.status(500).json({ message: "Error al crear mascota" });
    }
};
exports.crearMascota = crearMascota;
const listarMascotas = async (_req, res) => {
    try {
        const mascotas = await mascotaService.listarMascotas();
        return res.json(mascotas);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al listar mascotas" });
    }
};
exports.listarMascotas = listarMascotas;
const obtenerMascota = async (req, res) => {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'ID de mascota inválido' });
        }
        const mascota = await mascotaService.obtenerMascota(String(id));
        if (!mascota) {
            return res.status(404).json({ message: "Mascota no encontrada" });
        }
        return res.status(200).json(mascota);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al obtener mascota" });
    }
};
exports.obtenerMascota = obtenerMascota;
const modificarMascota = async (req, res) => {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'ID de mascota inválido' });
        }
        const mascotaData = req.body;
        const mascotaActualizada = await mascotaService.modificarMascota(String(id), mascotaData);
        if (!mascotaActualizada) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        return res.status(200).json({ message: 'Mascota modificada exitosamente' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al modificar mascota" });
    }
};
exports.modificarMascota = modificarMascota;
const eliminarMascota = async (req, res) => {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'ID de mascota inválido' });
        }
        const mascotaEliminada = await mascotaService.eliminarMascota(String(id));
        if (!mascotaEliminada) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        return res.status(200).json({ message: 'Mascota eliminada exitosamente' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al eliminar mascota" });
    }
};
exports.eliminarMascota = eliminarMascota;
