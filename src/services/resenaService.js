const Resena = require('../models/Resena');

exports.getAllResenas = async () => await Resena.find();
exports.getResenaById = async (id) => await Resena.findById(id);
exports.createResena = async (data) => {
    const resena = new Resena(data);
    return await resena.save();
};
exports.updateResena = async (id, data) => await Resena.findByIdAndUpdate(id, data, { new: true });
exports.deleteResena = async (id) => await Resena.findByIdAndDelete(id);
