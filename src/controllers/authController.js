const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || 'clave_super_secreta';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'clave_super_secreta_refresh';

exports.register = async (req, res) => {
    try {
        const { nombre, email, password, role } = req.body;
        
        // Verificar que l'email no existeix
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'L\'email ja està en ús' });

        // Hashejar la contrasenya
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar usuari a MongoDB
        const newUser = new User({
            id_usuario: uuidv4(),
            nombre,
            email,
            password: hashedPassword,
            role: role || 'client'
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuari registrat correctament' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el registre', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuari per email
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Credencials invàlides' });

        // Comparar contrasenya amb bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Credencials invàlides' });

        // Generar access token (curt: 15m)
        const accessToken = jwt.sign(
            { id_usuario: user.id_usuario, email: user.email, role: user.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        // Generar refresh token (llarg: 7d)
        const refreshToken = jwt.sign(
            { id_usuario: user.id_usuario },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        // Guardar refresh token a la base de dades
        user.refreshToken = refreshToken;
        await user.save();

        res.json({ accessToken, refreshToken, user: { id_usuario: user.id_usuario, nombre: user.nombre, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Error en el login', error: error.message });
    }
};

exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(401).json({ message: 'Refresh Token no proporcionat' });

        // Validar el token a la base de dades
        const user = await User.findOne({ refreshToken });
        if (!user) return res.status(403).json({ message: 'Refresh Token invàlid (possiblement ja utilitzat o revocat)' });

        // Validar token amb jwt
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                // Si el token ha expirat, netejem el camp de la BD per seguretat
                user.refreshToken = null;
                await user.save();
                return res.status(403).json({ message: 'Refresh Token expirat o invàlid' });
            }

            // --- REFRESH TOKEN ROTATION ---
            // Generar nou access token (curt: 15m)
            const newAccessToken = jwt.sign(
                { id_usuario: user.id_usuario, email: user.email, role: user.role },
                ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            // Generar un NOU refresh token (llarg: 7d)
            const newRefreshToken = jwt.sign(
                { id_usuario: user.id_usuario },
                REFRESH_TOKEN_SECRET,
                { expiresIn: '7d' }
            );

            // Actualitzar el refresh token a la base de dades (el vell ja no servirà)
            user.refreshToken = newRefreshToken;
            await user.save();

            res.json({ 
                accessToken: newAccessToken, 
                refreshToken: newRefreshToken 
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en refresh token', error: error.message });
    }
};


exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(400).json({ message: 'Token requerit per a logout' });

        // Eliminar refresh token associat a l'usuari
        const user = await User.findOne({ refreshToken });
        if (user) {
            user.refreshToken = null;
            await user.save();
        }

        res.json({ message: 'Logout correcte' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el logout', error: error.message });
    }
};
