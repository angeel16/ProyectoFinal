import { getIncidenciaById } from '@/lib/actions';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const incidencia = await getIncidenciaById(id);
            if (!incidencia) {
                return res.status(404).json({ error: 'Incidencia no encontrada' });
            }
            res.status(200).json(incidencia);
        } catch (error) {
            console.error('Error al obtener la incidencia:', error);
            res.status(500).json({ error: 'Error al obtener la incidencia' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}
