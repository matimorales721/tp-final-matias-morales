import { Mascota } from '../models/mascota.model';
import { IMascota } from '../types/IMascota';


export const crearMascota = async (data: Partial<IMascota>) => {
  const mascota = new Mascota(data);
  console.log('Mascota a crear:', mascota);
  return await mascota.save();
};

export const listarMascotas = async () => {
  return await Mascota.find();
};

export const obtenerMascota = async (id: string) => {
  return await Mascota.findById(id);
};

export const modificarMascota = async (id: string, data: Partial<IMascota>) => {

  // agregar validaciones

  return await Mascota.findByIdAndUpdate(id, data, { returnDocument: 'after' });
};

export const eliminarMascota = async (id: string) => {
  return await Mascota.findByIdAndDelete(id);
};