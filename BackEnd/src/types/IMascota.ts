import { IDueno } from "./IDueno";
import { IHistorialClinico } from "./IHistorialClinico";

export interface IMascota {
    id: string;
    nombre: string;
    especie: string;
    raza: string;
    fechaNacimiento: string;
    peso: number;
    sexo: string;
    color: string;
    estado: string; // 'Activo', 'Inactivo', 'Adoptado', 'Fallecido'
    dueno: IDueno;
    registroHistorialClinico: IHistorialClinico[];
    createdAt: string;
    updatedAt: string;
}