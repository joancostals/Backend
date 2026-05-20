const mongoose = require('mongoose');
require('dotenv').config();
const Pedido = require('./src/models/pedidoModel');

const checkOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const pedidos = await Pedido.find().sort({ fecha: -1 }).limit(10);
        console.log('--- ÚLTIMOS 10 PEDIDOS ---');
        pedidos.forEach(p => {
            console.log(`[ORDER] ID=${p.id_pedido} STATUS=${p.estado} USER=${p.id_usuario}`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkOrders();
