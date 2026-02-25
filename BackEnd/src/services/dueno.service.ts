import { Dueno } from '../models/dueno.model';
import { IDueno } from '../types/IDueno';


export const crearDueno = async (data: IDueno) => {
  const dueno = new Dueno(data);
  return await dueno.save();
};

export const listarDuenos = async () => {
  return await Dueno.find();
};

export const obtenerDueno = async (id: string) => {
  return await Dueno.findById(id);
};

export const modificarDueno = async (id: string, data: IDueno) => {

  // agregar validaciones

  return await Dueno.findByIdAndUpdate(id, data, { returnDocument: 'after' });
};

export const eliminarDueno = async (id: string) => {
  return await Dueno.findByIdAndDelete(id);
};