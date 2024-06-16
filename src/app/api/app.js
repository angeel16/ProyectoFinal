// api/app.js
const express = require('express');
const cors = require('cors'); // Para manejar CORS
const perfilRoute = require('./routes/perfil');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/perfil', perfilRoute);

app.get('/', (req, res) => {
    res.send('Servidor de Perfil en Funcionamiento');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
