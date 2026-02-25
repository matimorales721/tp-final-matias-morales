"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = exports.updateRole = exports.deleteRole = exports.findRoleById = exports.findRoleByName = exports.createRole = exports.Rol = void 0;
const mongoose_1 = require("mongoose");
const rolSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, trim: true },
}, { timestamps: true });
exports.Rol = (0, mongoose_1.model)('role', rolSchema);
const createRole = async (rolNombre) => {
    const newRol = new exports.Rol({
        name: rolNombre,
    });
    await newRol.save();
};
exports.createRole = createRole;
const findRoleByName = async (name) => {
    const rol = await exports.Rol.findOne({ name }).lean();
    if (!rol)
        return null;
    return {
        name: rol.name,
        createdAt: rol.createdAt,
        updatedAt: rol.updatedAt,
    };
};
exports.findRoleByName = findRoleByName;
const findRoleById = async (id) => {
    const rol = await exports.Rol.findById(id).lean();
    if (!rol)
        return null;
    return {
        name: rol.name,
        createdAt: rol.createdAt,
        updatedAt: rol.updatedAt,
    };
};
exports.findRoleById = findRoleById;
const deleteRole = async (id) => {
    const result = await exports.Rol.findByIdAndDelete(id);
    return result !== null;
};
exports.deleteRole = deleteRole;
const updateRole = async (id, newName) => {
    const updated = await exports.Rol.findByIdAndUpdate(id, { name: newName }, { new: true }).lean();
    if (!updated)
        return null;
    return {
        name: updated.name,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
    };
};
exports.updateRole = updateRole;
const findAll = async () => {
    const roles = await exports.Rol.find().lean();
    return roles.map(rol => ({
        _id: rol._id,
        name: rol.name,
        createdAt: rol.createdAt,
        updatedAt: rol.updatedAt,
    }));
};
exports.findAll = findAll;
