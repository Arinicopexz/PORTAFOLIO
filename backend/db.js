const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Si tienes MongoDB instalado localmente:
        // const conn = await mongoose.connect('mongodb://127.0.0.1:27017/mi_portafolio');
        
        // O si usas MongoDB Atlas (Nube), pon aquí tu string de conexión:
        // (Por defecto usaremos local para que te funcione ya mismo si lo tienes instalado)
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mi_portafolio');

        console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error de conexión: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;