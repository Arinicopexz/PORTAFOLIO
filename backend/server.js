require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'secreto_super_seguro';

// --- MODELOS ---
const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true }
});
PostSchema.set('toJSON', { virtuals: true, versionKey: false, transform: (doc, ret) => { delete ret._id; } });
const Post = mongoose.model('Post', PostSchema);

const CVSchema = new mongoose.Schema({ experiencia: { type: Object, required: true } });
const CV = mongoose.model('CV', CVSchema);

// --- CONEXIÓN ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Conectado'))
    .catch(err => console.error('❌ Error Mongo:', err));

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());

// --- CONTENIDO DE LOS POSTS NUEVOS (REAL, NO REPETIDO) ---
const articuloMongo = `
    <h3>Introducción</h3>
    <p>En este portafolio elegí <strong>MongoDB</strong> por su flexibilidad. A diferencia de SQL, aquí no necesito definir tablas rígidas antes de empezar.</p>
    <h3>Caso Real: Construcción</h3>
    <p>Imagina gestionar maquinaria pesada. Una <em>Excavadora</em> tiene "capacidad de cucharón", pero una <em>Grúa</em> tiene "altura máxima". En SQL, esto requeriría muchas tablas o columnas vacías. En MongoDB, cada documento guarda solo lo que necesita.</p>
    <pre style="background:#f4f4f4; padding:10px;"><code>const MaquinaSchema = new mongoose.Schema({ type: String, specs: Mixed });</code></pre>
    <h3>Conclusión</h3>
    <p>Para proyectos ágiles como este, NoSQL acelera el desarrollo significativamente.</p>
`;

const articuloSeguridad = `
    <h3>Seguridad en el Backend</h3>
    <p>Proteger una API es vital. En este proyecto implementé varias capas de seguridad siguiendo OWASP.</p>
    <h3>Caso Real: Salud (HIPAA)</h3>
    <p>Si manejamos datos médicos, un ataque de fuerza bruta es inaceptable. Para evitarlo, uso <strong>Rate Limiting</strong>, que bloquea IPs que hacen demasiados intentos fallidos de login.</p>
    <pre style="background:#f4f4f4; padding:10px;"><code>const limiter = rateLimit({ max: 100, message: "Demasiados intentos" });</code></pre>
    <h3>Conclusión</h3>
    <p>La seguridad no es opcional, es la base de la confianza del usuario.</p>
`;

// --- RUTA DE REINICIO (RESET) ---
app.get('/setup', async (req, res) => {
    try {
        // 1. BORRAR TODO LO VIEJO
        await User.deleteMany({});
        await CV.deleteMany({});
        await Post.deleteMany({});

        // 2. CREAR USUARIO (CONTRASEÑA: admin123)
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({ username: 'admin', password: hashedPassword });

        // 3. CREAR CV
        await CV.create({
            experiencia: {
                nombre: "Ariel Nicolás Rosero Toscano",
                titulo: "Desarrollador Full Stack Jr.",
                resumen: "Estudiante de Software en la PUCE.",
                habilidades: ["React", "Node.js", "MongoDB", "Python", "Git"],
                contacto: [{ email: "anrosero@puce.edu.ec", ubicacion: "Quito, Ecuador" }],
                historial: [{ id: 1, rol: "Auxiliar", empresa: "ALPHA HOUSE", periodo: "Experiencia Previa", descripcion: "Gestión interna." }],
                estudios: [{ id: 1, titulo: "Licenciatura Software", institucion: "PUCE", fecha: "En curso" }]
            }
        });

        // 4. CREAR LOS 5 POSTS (3 Tuyos + 2 Nuevos)
        await Post.create([
            { title: "Cómo construir una lista de tareas con React", date: "2025-04-10", content: "<h3>Introducción</h3><p>Tutorial de React y Axios.</p>" },
            { title: "Git Flow: Mejores prácticas", date: "2025-05-02", content: "<h3>Organización</h3><p>Ramas Feature, Develop y Main.</p>" },
            { title: "Django REST Framework", date: "2025-05-20", content: "<h3>Backend Python</h3><p>Creación de APIs potentes.</p>" },
            { title: "Por qué elegí MongoDB (Análisis)", date: "2026-01-28", content: articuloMongo },
            { title: "Seguridad en APIs REST", date: "2026-01-29", content: articuloSeguridad }
        ]);

        res.send("<h1>✅ TODO REINICIADO</h1><p>Contraseña: <b>admin123</b></p><p>5 Posts creados.</p>");
    } catch (e) { res.status(500).send(e.message); }
});

// --- LOGIN (CON MENSAJES DE ERROR EN CONSOLA) ---
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`🔑 Intento de login: ${username}`);
    
    const user = await User.findOne({ username });
    if (!user) {
        console.log("❌ Usuario no existe en DB");
        return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        console.log("❌ Contraseña incorrecta");
        return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    console.log("✅ Login Exitoso");
    res.json({ token: jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' }) });
});

// --- OTRAS RUTAS ---
app.get('/posts', async (req, res) => res.json(await Post.find().sort({ date: -1 })));
app.get('/posts/:id', async (req, res) => { // Arregla el error de "no existe"
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'No encontrado' });
        res.json(post);
    } catch (e) { res.status(404).json({ message: 'ID inválido' }); }
});

app.get('/experiencia', async (req, res) => res.json((await CV.findOne())?.experiencia || {}));

// Middleware Auth
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token requerido' });
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user; next();
    });
};

// Rutas protegidas
app.post('/posts', authenticateToken, async (req, res) => res.status(201).json(await Post.create(req.body)));
app.put('/posts/:id', authenticateToken, async (req, res) => res.json(await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/posts/:id', authenticateToken, async (req, res) => { await Post.findByIdAndDelete(req.params.id); res.json({ msg: 'Eliminado' }); });
app.patch('/experiencia', authenticateToken, async (req, res) => {
    const updated = await CV.findOneAndUpdate({}, { experiencia: req.body }, { new: true, upsert: true });
    res.json(updated.experiencia);
});

app.listen(PORT, () => console.log(`🚀 Listo en http://localhost:${PORT}`));