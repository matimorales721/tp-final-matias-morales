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
exports.findAll = exports.findPermissionById = exports.findPermissionByDescription = exports.createPermission = exports.Permission = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const permisoSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
}, { timestamps: true });
// permisoSchema.index({ description: 1 });
exports.Permission = mongoose_1.default.model('permission', permisoSchema);
const createPermission = async (description) => {
    const newPermiso = new exports.Permission({
        description,
    });
    await newPermiso.save();
};
exports.createPermission = createPermission;
const findPermissionByDescription = async (description) => {
    const permiso = await exports.Permission.findOne({ description }).lean();
    if (!permiso)
        return null;
    return {
        _id: permiso._id,
        description: permiso.description,
        createdAt: permiso.createdAt,
        updatedAt: permiso.updatedAt,
    };
};
exports.findPermissionByDescription = findPermissionByDescription;
const findPermissionById = async (id) => {
    const permiso = await exports.Permission.findById(id).lean();
    if (!permiso)
        return null;
    return {
        _id: permiso._id,
        description: permiso.description,
        createdAt: permiso.createdAt,
        updatedAt: permiso.updatedAt,
    };
};
exports.findPermissionById = findPermissionById;
const findAll = async () => {
    const permisos = await exports.Permission.find().lean();
    return permisos.map(permiso => ({
        _id: permiso._id,
        description: permiso.description,
        createdAt: permiso.createdAt,
        updatedAt: permiso.updatedAt,
    }));
};
exports.findAll = findAll;
