"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_validator_1 = require("../validators/auth.validator");
const auth_service_1 = require("../services/auth.service");
// import rateLimit from 'express-rate-limit';
const router = (0, express_1.Router)();
// Limitar intentos de registro y login
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutos
//   max: 5, // máximo 5 intentos
//   message: 'Demasiados intentos, inténtalo de nuevo más tarde',
// });
router.post('/login', auth_validator_1.loginValidator, auth_controller_1.login);
router.post('/logout', auth_controller_1.logout);
// Usuario
router.post('/crear-usuario', auth_validator_1.registerValidator, auth_controller_1.crearUsuario);
router.get('/listar-usuarios', auth_controller_1.listarUsuarios);
router.get('/usuario/:id', auth_controller_1.obtenerUsuario);
router.put('/modificar-usuario/:id', auth_controller_1.modificarUsuario);
router.delete('/eliminar-usuario/:id', auth_service_1.eliminarUsuario);
// Rol
//crearRolValidator
router.post('/crear-rol', auth_controller_1.crearRol);
router.get('/listar-roles', auth_controller_1.listarRoles);
// Permiso
//crearPermisoValidator
router.post('/crear-permiso', auth_controller_1.crearPermiso);
router.get('/listar-permisos', auth_controller_1.listarPermisos);
//asignarPermisoValidator
router.post('/asignar-permiso', auth_controller_1.asignarPermiso);
exports.default = router;
