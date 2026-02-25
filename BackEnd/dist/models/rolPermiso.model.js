"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignPermissionToRole = exports.RolPermiso = void 0;
const mongoose_1 = require("mongoose");
const rolPermisoSchema = new mongoose_1.Schema({
    idRol: { type: String, required: true, trim: true },
    idPermiso: { type: String, required: true, trim: true },
}, { timestamps: true });
exports.RolPermiso = (0, mongoose_1.model)('role_permission', rolPermisoSchema);
const assignPermissionToRole = async (idRol, idPermiso) => {
    if (!idRol)
        throw new Error('Rol no encontrado');
    if (!idPermiso)
        throw new Error('Permiso no encontrado');
    const rolPermiso = {
        idRol,
        idPermiso,
    };
    const newRolPermiso = new exports.RolPermiso(rolPermiso);
    await newRolPermiso.save();
};
exports.assignPermissionToRole = assignPermissionToRole;
