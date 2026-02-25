"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarHistorialClinico = exports.modificarHistorialClinico = exports.obtenerHistorialClinicoMascota = exports.obtenerHistorialClinico = exports.listarHistorialesClinicos = exports.crearHistorialClinico = void 0;
const historialClinico_model_1 = require("../models/historialClinico.model");
const crearHistorialClinico = async (data) => {
    console.log('Datos recibidos para crear historial clínico:', data);
    const historialClinico = new historialClinico_model_1.HistorialClinico(data);
    console.log('Historial clínico a crear:', historialClinico);
    return await historialClinico.save();
};
exports.crearHistorialClinico = crearHistorialClinico;
const listarHistorialesClinicos = async () => {
    return await historialClinico_model_1.HistorialClinico.find();
};
exports.listarHistorialesClinicos = listarHistorialesClinicos;
const obtenerHistorialClinico = async (id) => {
    return await historialClinico_model_1.HistorialClinico.findById(id);
};
exports.obtenerHistorialClinico = obtenerHistorialClinico;
const obtenerHistorialClinicoMascota = async (id) => {
    return await (0, historialClinico_model_1.listarHistorialesClinicosPorMascota)(id);
};
exports.obtenerHistorialClinicoMascota = obtenerHistorialClinicoMascota;
const modificarHistorialClinico = async (id, data) => {
    // agregar validaciones
    return await historialClinico_model_1.HistorialClinico.findByIdAndUpdate(id, data, { new: true });
};
exports.modificarHistorialClinico = modificarHistorialClinico;
const eliminarHistorialClinico = async (id) => {
    return await historialClinico_model_1.HistorialClinico.findByIdAndDelete(id);
};
exports.eliminarHistorialClinico = eliminarHistorialClinico;
