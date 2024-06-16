import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const incidencias = await prisma.incidencia.findMany();
            res.status(200).json(incidencias);
        } catch (error) {
            console.error('Error al obtener incidencias:', error);
            res.status(500).json({ error: 'Error al obtener incidencias' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}
