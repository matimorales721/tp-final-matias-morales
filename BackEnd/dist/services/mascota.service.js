"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarMascota = exports.modificarMascota = exports.obtenerMascota = exports.listarMascotas = exports.crearMascota = void 0;
const mascota_model_1 = require("../models/mascota.model");
const crearMascota = async (data) => {
    const mascota = new mascota_model_1.Mascota(data);
    console.log('Mascota a crear:', mascota);
    return await mascota.save();
};
exports.crearMascota = crearMascota;
const listarMascotas = async () => {
    return await mascota_model_1.Mascota.find();
};
exports.listarMascotas = listarMascotas;
const obtenerMascota = async (id) => {
    return await mascota_model_1.Mascota.findById(id);
};
exports.obtenerMascota = obtenerMascota;
const modificarMascota = async (id, data) => {
    // agregar validaciones
    return await mascota_model_1.Mascota.findByIdAndUpdate(id, data, { new: true });
};
exports.modificarMascota = modificarMascota;
const eliminarMascota = async (id) => {
    return await mascota_model_1.Mascota.findByIdAndDelete(id);
};
exports.eliminarMascota = eliminarMascota;
