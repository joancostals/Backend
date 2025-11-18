const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const SECRET = process.env.JWT_SECRET || 'clave_secreta';

class UserService {

    // Registro
    async registerUser(data) {
        const { nombre, email, password } = data;

        // Comprobar si el email ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Usuari ja existeix');
        }

        // Hashear contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario
        const newUser = new User({
            id_usuario: uuidv4(),
            nombre,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return newUser;
    }

    // Login
    async loginUser(data) {
        const { email, password } = data;

        const user = await User.findOne({ email });
        if (!user) throw new Error('Email o contraseña incorrecta');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Email o contraseña incorrecta');

        const token = jwt.sign(
            { id_usuario: user.id_usuario, email: user.email },
            SECRET,
            { expiresIn: '1h' }
        );

        return { user, token };
    }

    // Obtener todos los usuarios
    async getAllUsers() {
        return await User.find();
    }

    // Obtener usuario por id
    async getUserById(id) {
        return await User.findOne({ id_usuario: id });
    }

    // Actualizar usuario
    async updateUser(id, data) {
        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
        }
        return await User.findOneAndUpdate({ id_usuario: id }, data, { new: true });
    }

    // Eliminar usuario
    async deleteUser(id) {
        return await User.findOneAndDelete({ id_usuario: id });
    }
}

module.exports = new UserService();
