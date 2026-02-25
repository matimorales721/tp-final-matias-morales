import { Router } from 'express';
import { crearHistorialClinico, eliminarHistorialClinico, listarHistorialesClinicos, modificarHistorialClinico, obtenerHistorialClinico, obtenerHistorialClinicoMascota } from '../controllers/historialClinico.controller';
//import { registerValidator } from '../validators/auth.validator';


const router = Router();

router.post('/crear-historial-clinico', crearHistorialClinico);
router.get('/listar-historiales-clinicos', listarHistorialesClinicos);
router.get('/historial-clinico/:id', obtenerHistorialClinico);
router.get('/historial-clinico-mascota/:idMascota', obtenerHistorialClinicoMascota);
router.put('/modificar-historial-clinico/:id', modificarHistorialClinico);
router.delete('/eliminar-historial-clinico/:id', eliminarHistorialClinico);

export default router;