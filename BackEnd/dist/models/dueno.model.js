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
exports.Dueno = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const duenoSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    telefono: { type: String, required: true, trim: true },
}, { timestamps: true });
exports.Dueno = mongoose_1.default.model('owner', duenoSchema);
// export const createDueno = async (
//     dueno: Omit<IDueno, 'id'>
// ): Promise<string> => {
//     const newDueno = new Dueno({
//         nombre: dueno.nombre,
//         apellido: dueno.apellido,
//         email: dueno.email,
//         telefono: dueno.telefono,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//     });
//     const saved = await newDueno.save();
//     return saved._id.toString();
// };
