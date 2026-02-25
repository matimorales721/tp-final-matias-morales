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
exports.eliminarHistorialClinico = exports.modificarHistorialClinico = exports.obtenerHistorialClinicoMascota = exports.obtenerHistorialClinico = exports.listarHistorialesClinicos = exports.crearHistorialClinico = void 0;
const historialClinicoService = __importStar(require("../services/historialClinico.service"));
const mongoose_1 = require("mongoose");
const crearHistorialClinico = async (req, res) => {
    try {
        const historialClinicoData = req.body;
        const historialClinicoId = await historialClinicoService.crearHistorialClinico(historialClinicoData);
        return res.status(201).json({ message: 'Historial clínico creado exitosamente', historialClinicoId });
    }
    catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).json('Historial clínico con esos datos ya existe.');
        }
        return res.status(500).json({ message: "Error al crear historial clínico" });
    }
};
exports.crearHistorialClinico = crearHistorialClinico;
const listarHistorialesClinicos = async (_req, res) => {
    try {
        const historialesClinicos = await historialClinicoService.listarHistorialesClinicos();
        return res.json(historialesClinicos);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al listar historiales clínicos" });
    }
};
exports.listarHistorialesClinicos = listarHistorialesClinicos;
const obtenerHistorialClinico = async (req, res) => {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'ID de historial clínico inválido' });
        }
        const historialClinico = await historialClinicoService.obtenerHistorialClinico(String(id));
        if (!historialClinico) {
            return res.status(404).json({ message: "Historial clínico no encontrado" });
        }
        return res.status(200).json(historialClinico);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al obtener historial clínico" });
    }
};
exports.obtenerHistorialClinico = obtenerHistorialClinico;
const obtenerHistorialClinicoMascota = async (req, res) => {
    try {
        const { idMascota } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(idMascota)) {
            return res.status(400).json({ message: 'ID de mascota inválido' });
        }
        const historialesClinicos = await historialClinicoService.obtenerHistorialClinicoMascota(String(idMascota));
        return res.status(200).json(historialesClinicos);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al obtener historiales clínicos de la mascota" });
    }
};
exports.obtenerHistorialClinicoMascota = obtenerHistorialClinicoMascota;
const modificarHistorialClinico = async (req, res) => {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'ID de historial clínico inválido' });
        }
        const historialClinicoData = req.body;
        const historialClinicoActualizado = await historialClinicoService.modificarHistorialClinico(String(id), historialClinicoData);
        if (!historialClinicoActualizado) {
            return res.status(404).json({ message: 'Historial clínico no encontrado' });
        }
        return res.status(200).json({ message: 'Historial clínico modificado exitosamente' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al modificar historial clínico" });
    }
};
exports.modificarHistorialClinico = modificarHistorialClinico;
const eliminarHistorialClinico = async (req, res) => {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'ID de historial clínico inválido' });
        }
        const historialClinicoEliminado = await historialClinicoService.eliminarHistorialClinico(String(id));
        if (!historialClinicoEliminado) {
            return res.status(404).json({ message: 'Historial clínico no encontrado' });
        }
        return res.status(200).json({ message: 'Historial clínico eliminado exitosamente' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al eliminar historial clínico" });
    }
};
exports.eliminarHistorialClinico = eliminarHistorialClinico;
