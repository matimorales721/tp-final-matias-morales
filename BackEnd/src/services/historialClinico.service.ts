import { HistorialClinico, listarHistorialesClinicosPorMascota } from '../models/historialClinico.model';
import { ICrearHistorialClinicoDTO } from '../types/DTOs/ICrearHistorialClinicoDTO';
import { IHistorialClinico } from '../types/IHistorialClinico';

export const crearHistorialClinico = async (data: ICrearHistorialClinicoDTO) => {

  console.log('Datos recibidos para crear historial clínico:', data);
  const historialClinico = new HistorialClinico(data);
  console.log('Historial clínico a crear:', historialClinico);
  return await historialClinico.save();
};

export const listarHistorialesClinicos = async () => {
  return await HistorialClinico.find();
};

export const obtenerHistorialClinico = async (id: string) => {
  return await HistorialClinico.findById(id);
};

export const obtenerHistorialClinicoMascota = async (id: string) => {
  return await listarHistorialesClinicosPorMascota(id);
};

export const modificarHistorialClinico = async (id: string, data: ICrearHistorialClinicoDTO) => {

  // agregar validaciones

  return await HistorialClinico.findByIdAndUpdate(id, data, { returnDocument: 'after' });
};

export const eliminarHistorialClinico = async (id: string) => {
  return await HistorialClinico.findByIdAndDelete(id);
};