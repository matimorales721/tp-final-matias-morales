import { Router } from 'express';
import { crearDueno, listarDuenos, obtenerDueno, modificarDueno, eliminarDueno } from '../controllers/dueno.controller';
//import { registerValidator } from '../validators/auth.validator';


const router = Router();

router.post('/crear-dueno', crearDueno);
router.get('/listar-duenos', listarDuenos);
router.get('/dueno/:id', obtenerDueno);
router.put('/modificar-dueno/:id', modificarDueno);
router.delete('/eliminar-dueno/:id', eliminarDueno);

export default router;