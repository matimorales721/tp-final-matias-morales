"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarDueno = exports.modificarDueno = exports.obtenerDueno = exports.listarDuenos = exports.crearDueno = void 0;
const dueno_model_1 = require("../models/dueno.model");
const crearDueno = async (data) => {
    const dueno = new dueno_model_1.Dueno(data);
    return await dueno.save();
};
exports.crearDueno = crearDueno;
const listarDuenos = async () => {
    return await dueno_model_1.Dueno.find();
};
exports.listarDuenos = listarDuenos;
const obtenerDueno = async (id) => {
    return await dueno_model_1.Dueno.findById(id);
};
exports.obtenerDueno = obtenerDueno;
const modificarDueno = async (id, data) => {
    // agregar validaciones
    return await dueno_model_1.Dueno.findByIdAndUpdate(id, data, { new: true });
};
exports.modificarDueno = modificarDueno;
const eliminarDueno = async (id) => {
    return await dueno_model_1.Dueno.findByIdAndDelete(id);
};
exports.eliminarDueno = eliminarDueno;
