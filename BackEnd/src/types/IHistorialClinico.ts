import { IMascota } from "./IMascota";
import { IUsuario } from "./IUsuario";

export interface IHistorialClinico {
    id: string;
    mascota: IMascota;
    usuario: IUsuario;
    fecha: string;
    diagnostico: string;
    tratamiento: string;
    anotaciones: string;
    createdAt: string;
    updatedAt: string;
}