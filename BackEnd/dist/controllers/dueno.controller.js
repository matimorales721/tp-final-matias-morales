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
exports.eliminarDueno = exports.modificarDueno = exports.obtenerDueno = exports.listarDuenos = exports.crearDueno = void 0;
const duenoService = __importStar(require("../services/dueno.service"));
const mongoose_1 = require("mongoose");
const crearDueno = async (req, res) => {
    try {
        const duenoData = req.body;
        const duenoId = await duenoService.crearDueno(duenoData);
        return res.status(201).json({ message: 'Dueño creado exitosamente', duenoId });
    }
    catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).json('Dueño con esos datos ya existe.');
        }
        return res.status(500).json({ message: "Error al crear dueño" });
    }
};
exports.crearDueno = crearDueno;
const listarDuenos = async (_req, res) => {
    try {
        const duenos = await duenoService.listarDuenos();
        return res.json(duenos);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al listar dueños" });
    }
};
exports.listarDuenos = listarDuenos;
const obtenerDueno = async (req, res) => {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'ID de dueño inválido' });
        }
        const dueno = await duenoService.obtenerDueno(String(id));
        if (!dueno) {
            return res.status(404).json({ message: "Dueño no encontrado" });
        }
        return res.status(200).json(dueno);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al obtener dueño" });
    }
};
exports.obtenerDueno = obtenerDueno;
const modificarDueno = async (req, res) => {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'ID de dueño inválido' });
        }
        const duenoData = req.body;
        const duenoActualizado = await duenoService.modificarDueno(String(id), duenoData);
        if (!duenoActualizado) {
            return res.status(404).json({ message: 'Dueño no encontrado' });
        }
        return res.status(200).json({ message: 'Dueño modificado exitosamente' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al modificar dueño" });
    }
};
exports.modificarDueno = modificarDueno;
const eliminarDueno = async (req, res) => {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'ID de dueño inválido' });
        }
        const duenoEliminado = await duenoService.eliminarDueno(String(id));
        if (!duenoEliminado) {
            return res.status(404).json({ message: 'Dueño no encontrado' });
        }
        return res.status(200).json({ message: 'Dueño eliminado exitosamente' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al eliminar dueño" });
    }
};
exports.eliminarDueno = eliminarDueno;
