import { Request, Response } from 'express';
import * as historialClinicoService from '../services/historialClinico.service';
import { IHistorialClinico } from '../types/IHistorialClinico';
import { isValidObjectId } from 'mongoose';
import { ICrearHistorialClinicoDTO } from '../types/DTOs/ICrearHistorialClinicoDTO';

export const crearHistorialClinico = async (req: Request, res: Response) => {
    try {
        const historialClinicoData: ICrearHistorialClinicoDTO = req.body;
        const historialClinicoId = await historialClinicoService.crearHistorialClinico(historialClinicoData);
        return res.status(201).json({ message: 'Historial clínico creado exitosamente', historialClinicoId });
    }
    catch (err: any) {
        console.error(err);

        if (err.code === 11000) {
            return res.status(400).json('Historial clínico con esos datos ya existe.');
        }

        return res.status(500).json({ message: "Error al crear historial clínico" });
    }
};

export const listarHistorialesClinicos = async (_req: Request, res: Response) => {
    try {
        const historialesClinicos = await historialClinicoService.listarHistorialesClinicos();
        return res.json(historialesClinicos);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al listar historiales clínicos" });
    }
};

export const obtenerHistorialClinico = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'ID de historial clínico inválido' });
        }

        const historialClinico = await historialClinicoService.obtenerHistorialClinico(String(id));
        if (!historialClinico) {
            return res.status(404).json({ message: "Historial clínico no encontrado" });
        }
        return res.status(200).json(historialClinico);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al obtener historial clínico" });
    }
};

export const obtenerHistorialClinicoMascota = async (req: Request, res: Response) => {
    try {
        const { idMascota } = req.params;
        if (!isValidObjectId(idMascota)) {
            return res.status(400).json({ message: 'ID de mascota inválido' });
        }
        const historialesClinicos = await historialClinicoService.obtenerHistorialClinicoMascota(String(idMascota));
        return res.status(200).json(historialesClinicos);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al obtener historiales clínicos de la mascota" });
    }
};

export const modificarHistorialClinico = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'ID de historial clínico inválido' });
        }

        const historialClinicoData: ICrearHistorialClinicoDTO = req.body;
        const historialClinicoActualizado = await historialClinicoService.modificarHistorialClinico(String(id), historialClinicoData);

        if (!historialClinicoActualizado) {
            return res.status(404).json({ message: 'Historial clínico no encontrado' });
        }

        return res.status(200).json({ message: 'Historial clínico modificado exitosamente' });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al modificar historial clínico" });
    }
};

export const eliminarHistorialClinico = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'ID de historial clínico inválido' });
        }

        const historialClinicoEliminado = await historialClinicoService.eliminarHistorialClinico(String(id));

        if (!historialClinicoEliminado) {
            return res.status(404).json({ message: 'Historial clínico no encontrado' });
        }

        return res.status(200).json({ message: 'Historial clínico eliminado exitosamente' });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al eliminar historial clínico" });
    }
};