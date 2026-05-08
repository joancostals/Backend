const Carrito = require('../models/Carrito');

// Obtener carrito por usuario
exports.getCarrito = async (id_usuario) => {
    let carrito = await Carrito.findOne({ id_usuario });
    if (!carrito) {
        carrito = new Carrito({
            id_carrito: `carrito_${id_usuario}`,
            id_usuario,
            items: []
        });
        await carrito.save();
    }
    return carrito;
};

// Añadir producto
exports.addItem = async (id_usuario, id_pala, nombre, precio) => {
    const carrito = await exports.getCarrito(id_usuario);
    const item = carrito.items.find(i => i.id_pala === id_pala);

    if (item) {
        item.cantidad += 1;
    } else {
        carrito.items.push({ id_pala, nombre, precio, cantidad: 1 });
    }

    await carrito.save();
    return carrito.toObject();
};

// Eliminar producto
exports.removeItem = async (id_usuario, id_pala) => {
    const carrito = await exports.getCarrito(id_usuario);
    carrito.items = carrito.items.filter(i => i.id_pala !== id_pala);
    await carrito.save();
    return carrito.toObject();
};

// Vaciar carrito
exports.clearCarrito = async (id_usuario) => {
    const carrito = await exports.getCarrito(id_usuario);
    carrito.items = [];
    await carrito.save();
    return carrito.toObject();
};