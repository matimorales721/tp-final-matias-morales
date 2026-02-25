import { Router } from 'express';
import { crearMascota, listarMascotas, obtenerMascota, modificarMascota, eliminarMascota } from '../controllers/mascota.controller';


const router = Router();

router.post('/crear-mascota', crearMascota);
router.get('/listar-mascotas', listarMascotas);
router.get('/mascota/:id', obtenerMascota);
router.put('/modificar-mascota/:id', modificarMascota);
router.delete('/eliminar-mascota/:id', eliminarMascota);

export default router;