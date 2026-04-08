const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Registro y login
router.post('/register', userController.register);
router.post('/login', userController.login);

// Operaciones CRUD
/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestió d'usuaris (CRUD)
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Llista tots els usuaris (Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista d'usuaris
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obté un usuari per ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalls de l'usuari
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualitza un usuari
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuari actualitzat
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuari
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuari eliminat
 */
router.delete('/:id', userController.deleteUser);


module.exports = router;
