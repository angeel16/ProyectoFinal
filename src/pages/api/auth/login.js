// /pages/api/auth/login.js

import bcrypt from 'bcrypt';
import { getUserByEmail } from '@/lib/userModel'; // Ajusta según tu estructura

export default async function loginHandler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Usuario no registrado.' });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({ error: 'Credenciales incorrectas.' });
        }

        // Aquí podrías generar un token JWT o manejar la sesión de otra manera
        // const token = generateToken(user); // Implementa tu lógica de generación de tokens
        // res.status(200).json({ message: 'Inicio de sesión correcto', token });

        res.status(200).json({ message: 'Inicio de sesión correcto' });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
