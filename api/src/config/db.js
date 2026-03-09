const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB conectado en ${conn.connection.host}:${conn.connection.port}`);
    } catch (err) {
        console.error(`Error al conectar a MongoDB: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;