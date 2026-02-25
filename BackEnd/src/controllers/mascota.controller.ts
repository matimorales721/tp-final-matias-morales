import { Request, Response } from 'express';
import * as mascotaService from '../services/mascota.service';
import { IMascota } from '../types/IMascota';
import { isValidObjectId } from 'mongoose';

export const crearMascota = async (req: Request, res: Response) => {
    try {
        const mascotaData: IMascota = req.body;
        const mascotaId = await mascotaService.crearMascota(mascotaData);
        return res.status(201).json({ message: 'Mascota creada exitosamente', mascotaId });
    }
    catch (err: any) {
        console.error(err);

        if (err.code === 11000) {
            return res.status(400).json('Mascota con esos datos ya existe.');
        }

        return res.status(500).json({ message: "Error al crear mascota" });
    }
};

export const listarMascotas = async (_req: Request, res: Response) => {
    try {
        const mascotas = await mascotaService.listarMascotas();
        return res.json(mascotas);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al listar mascotas" });
    }
};

export const obtenerMascota = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'ID de mascota inválido' });
        }

        const mascota = await mascotaService.obtenerMascota(String(id));
        if (!mascota) {
            return res.status(404).json({ message: "Mascota no encontrada" });
        }
        return res.status(200).json(mascota);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al obtener mascota" });
    }
};

export const modificarMascota = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'ID de mascota inválido' });
        }

        const mascotaData: IMascota = req.body;
        const mascotaActualizada = await mascotaService.modificarMascota(String(id), mascotaData);

        if (!mascotaActualizada) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }

        return res.status(200).json({ message: 'Mascota modificada exitosamente' });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al modificar mascota" });
    }
};

export const eliminarMascota = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'ID de mascota inválido' });
        }

        const mascotaEliminada = await mascotaService.eliminarMascota(String(id));

        if (!mascotaEliminada) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }

        return res.status(200).json({ message: 'Mascota eliminada exitosamente' });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al eliminar mascota" });
    }
};