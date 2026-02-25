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
exports.deleteUser = exports.updateUser = exports.findAll = exports.findUserById = exports.findUserByUsername = exports.findUserByEmail = exports.createUser = exports.Usuario = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const usuarioSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido'],
    },
    password: { type: String, required: true, minlength: 8 },
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    fechaNacimiento: { type: String, required: true },
    estado: { type: String, required: true },
}, { timestamps: true });
// usuarioSchema.index({ email: 1 });
// usuarioSchema.index({ username: 1 });
exports.Usuario = mongoose_1.default.model('user', usuarioSchema);
const createUser = async (user) => {
    const newUser = new exports.Usuario({
        username: user.username,
        email: user.email,
        password: user.password,
        nombre: user.nombre,
        apellido: user.apellido,
        fechaNacimiento: user.fechaNacimiento,
        estado: user.estado,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
    const saved = await newUser.save();
    return saved._id.toString();
};
exports.createUser = createUser;
const findUserByEmail = async (email = '') => {
    const user = await exports.Usuario.findOne({ email }).lean();
    if (!user)
        return null;
    return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
        nombre: user.nombre,
        apellido: user.apellido,
        fechaNacimiento: user.fechaNacimiento,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        estado: user.estado,
    };
};
exports.findUserByEmail = findUserByEmail;
const findUserByUsername = async (username = '') => {
    const user = await exports.Usuario.findOne({ username }).lean();
    if (!user)
        return null;
    return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
        nombre: user.nombre,
        apellido: user.apellido,
        fechaNacimiento: user.fechaNacimiento,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        estado: user.estado,
    };
};
exports.findUserByUsername = findUserByUsername;
const findUserById = async (id = '') => {
    const user = await exports.Usuario.findById(id).lean();
    if (!user)
        return null;
    return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
        nombre: user.nombre,
        apellido: user.apellido,
        fechaNacimiento: user.fechaNacimiento,
        estado: user.estado,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
exports.findUserById = findUserById;
const findAll = async () => {
    const users = await exports.Usuario.find().lean();
    return users.map(user => ({
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
        nombre: user.nombre,
        apellido: user.apellido,
        fechaNacimiento: user.fechaNacimiento,
        estado: user.estado,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }));
};
exports.findAll = findAll;
const updateUser = async (id, updates) => {
    const updated = await exports.Usuario.findByIdAndUpdate(id, { ...updates, updatedAt: new Date().toISOString() }, { new: true }).lean();
    if (!updated)
        return null;
    return {
        id: updated._id.toString(),
        username: updated.username,
        email: updated.email,
        password: updated.password,
        nombre: updated.nombre,
        apellido: updated.apellido,
        fechaNacimiento: updated.fechaNacimiento,
        estado: updated.estado,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
    };
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    const result = await exports.Usuario.findByIdAndDelete(id);
    return result !== null;
};
exports.deleteUser = deleteUser;
