const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'clave_super_secreta';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado: Token no proporcionado' });
    }

    try {
        const verified = jwt.verify(token, SECRET);
        req.user = verified; // Añado la info del token al request (id_usuario, email)
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token no válido' });
    }
};

module.exports = authenticateToken;
