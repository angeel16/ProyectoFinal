const express = require('express');
const app = express();

app.use(express.json());

let userProfile = {
    id: '1',
    name: 'Angel',
    email: 'Angelborrego@gmail.com',
    password: '123456', // Este valor no debe estar expuesto en un entorno real.
};

app.put('/api/perfil', (req, res) => {
    const { id, name, email, password } = req.body;
    if (id !== userProfile.id) {
        return res.status(404).send('Perfil no encontrado');
    }

    // Actualizar los datos del perfil
    userProfile = { ...userProfile, name, email };
    if (password) {
        userProfile.password = password;
    }

    res.json({ message: 'Perfil actualizado con éxito', profile: userProfile });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
