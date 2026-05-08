const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const SECRET = process.env.JWT_SECRET || 'clave_super_secreta';

class UserService {
    async registerUser({ nombre, email, password }) {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error('Usuario ya existe');

        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({ id_usuario: uuidv4(), nombre, email, password: hashed });
        await newUser.save();
        return newUser;
    }

    async loginUser({ email, password }) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Email o contraseña incorrecta');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error('Email o contraseña incorrecta');

        const token = jwt.sign({ id_usuario: user.id_usuario, email: user.email }, SECRET, { expiresIn: '1h' });
        return { user, token };
    }

    async getAllUsers() { return await User.find(); }
    async getUserById(id) { return await User.findOne({ id_usuario: id }); }
    async updateUser(id, data) {
        if (data.password) data.password = await bcrypt.hash(data.password, 10);
        return await User.findOneAndUpdate({ id_usuario: id }, data, { new: true });
    }
    async deleteUser(id) { return await User.findOneAndDelete({ id_usuario: id }); }
}

module.exports = new UserService();