import { Request, Response } from 'express';
import * as duenoService from '../services/dueno.service';
import { IDueno } from '../types/IDueno';
import { isValidObjectId } from 'mongoose';

export const crearDueno = async (req: Request, res: Response) => {
    try {
        const duenoData: IDueno = req.body;
        const duenoId = await duenoService.crearDueno(duenoData);
        return res.status(201).json({ message: 'Dueño creado exitosamente', duenoId });
    }
    catch (err: any) {
        console.error(err);

        if (err.code === 11000) {
            return res.status(400).json('Dueño con esos datos ya existe.');
        }

        return res.status(500).json({ message: "Error al crear dueño" });
    }
};

export const listarDuenos = async (_req: Request, res: Response) => {
    try {
        const duenos = await duenoService.listarDuenos();
        return res.json(duenos);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al listar dueños" });
    }
};

export const obtenerDueno = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'ID de dueño inválido' });
        }

        const dueno = await duenoService.obtenerDueno(String(id));
        if (!dueno) {
            return res.status(404).json({ message: "Dueño no encontrado" });
        }
        return res.status(200).json(dueno);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al obtener dueño" });
    }
};

export const modificarDueno = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'ID de dueño inválido' });
        }

        const duenoData: IDueno = req.body;
        const duenoActualizado = await duenoService.modificarDueno(String(id), duenoData);

        if (!duenoActualizado) {
            return res.status(404).json({ message: 'Dueño no encontrado' });
        }

        return res.status(200).json({ message: 'Dueño modificado exitosamente' });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al modificar dueño" });
    }
};

export const eliminarDueno = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'ID de dueño inválido' });
        }

        const duenoEliminado = await duenoService.eliminarDueno(String(id));

        if (!duenoEliminado) {
            return res.status(404).json({ message: 'Dueño no encontrado' });
        }

        return res.status(200).json({ message: 'Dueño eliminado exitosamente' });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: "Error al eliminar dueño" });
    }
};