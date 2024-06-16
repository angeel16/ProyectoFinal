// src/pages/api/perfil/index.js
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { id, nombre, email, password } = req.body;

        console.log('Datos recibidos en la API:', { id, nombre, email, password });

        try {
            const userActualizado = await prisma.user.update({
                where: { id: Number(id) }, // Asegúrate de convertir el ID a número
                data: {
                    nombre,
                    email,
                    ...(password && { password }),
                },
            });

            console.log('Usuario actualizado:', userActualizado);
            res.status(200).json(userActualizado);
        } catch (error) {
            console.error('Error al actualizar el perfil:', error.message);
            res.status(500).json({ error: 'Error al actualizar el perfil' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}
