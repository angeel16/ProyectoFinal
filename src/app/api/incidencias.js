// api/incidencias.js

const express = require('express');
const router = express.Router();

router.delete('/api/incidencias/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Supón que tienes una función deleteIncidenciaFromDatabase para eliminar la incidencia
        await deleteIncidenciaFromDatabase(id);
        res.status(200).json({ message: 'Incidencia eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la incidencia' });
    }
});

module.exports = router;
