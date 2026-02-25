import { Router } from 'express';
import { crearUsuario, login, asignarPermiso, crearRol, crearPermiso, listarUsuarios, obtenerUsuario, listarRoles, listarPermisos, logout, modificarUsuario } from '../controllers/auth.controller';
import {
  registerValidator,
  loginValidator,
} from '../validators/auth.validator';
import { eliminarUsuario } from '../services/auth.service';
// import rateLimit from 'express-rate-limit';

const router = Router();

// Limitar intentos de registro y login
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutos
//   max: 5, // máximo 5 intentos
//   message: 'Demasiados intentos, inténtalo de nuevo más tarde',
// });

router.post('/login', loginValidator, login);
router.post('/logout', logout);

// Usuario
router.post('/crear-usuario', registerValidator, crearUsuario);
router.get('/listar-usuarios', listarUsuarios);
router.get('/usuario/:id', obtenerUsuario);
router.put('/modificar-usuario/:id', modificarUsuario);
router.delete('/eliminar-usuario/:id', eliminarUsuario);



// Rol
//crearRolValidator
router.post('/crear-rol', crearRol);
router.get('/listar-roles', listarRoles);


// Permiso

//crearPermisoValidator
router.post('/crear-permiso', crearPermiso);
router.get('/listar-permisos', listarPermisos);
//asignarPermisoValidator
router.post('/asignar-permiso', asignarPermiso);

export default router;
