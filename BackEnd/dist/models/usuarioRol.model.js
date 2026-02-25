"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRolesByUsuarioId = exports.findRolesByUsuarioId = exports.assignRole = exports.UsuarioRol = void 0;
const mongoose_1 = require("mongoose");
const usuarioRolSchema = new mongoose_1.Schema({
    idUsuario: {
        type: String,
        required: true,
        trim: true,
    },
    idRol: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});
exports.UsuarioRol = (0, mongoose_1.model)('user_role', usuarioRolSchema);
const assignRole = async (idUsuario, idRol) => {
    const newUsuarioRol = new exports.UsuarioRol({
        idUsuario,
        idRol,
    });
    await newUsuarioRol.save();
};
exports.assignRole = assignRole;
const findRolesByUsuarioId = async (idUsuario) => {
    const roles = await exports.UsuarioRol.find({ idUsuario }).lean();
    return roles.map(ur => ur.idRol);
};
exports.findRolesByUsuarioId = findRolesByUsuarioId;
const removeRolesByUsuarioId = async (idUsuario, rol) => {
    if (rol) {
        await exports.UsuarioRol.deleteMany({ idUsuario, idRol: rol });
    }
    else {
        await exports.UsuarioRol.deleteMany({ idUsuario });
    }
};
exports.removeRolesByUsuarioId = removeRolesByUsuarioId;
