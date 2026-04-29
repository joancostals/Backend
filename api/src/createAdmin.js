require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connectat a MongoDB...');

    const email = 'admin@admin.com';
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('L\'usuari admin ja existeix.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      id_usuario: uuidv4(),
      nombre: 'Administrador',
      email: email,
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log('Usuari administrador creat amb èxit!');
    console.log('Email: admin@admin.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (err) {
    console.error('Error creant l\'admin:', err);
    process.exit(1);
  }
};

createAdmin();
