const Pala = require('../models/Pala');

exports.getAllPalas = async () => await Pala.find();
exports.getPalaById = async (id) => await Pala.findById(id);
exports.createPala = async (data) => {
    const pala = new Pala(data);
    return await pala.save();
};
exports.updatePala = async (id, data) => await Pala.findByIdAndUpdate(id, data, { new: true });
exports.deletePala = async (id) => await Pala.findByIdAndDelete(id);
