// pages/api/users/[id]/role.js
import { updateUserRole } from '@/lib/actions';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { id } = req.query;
        const { role } = req.body;
        try {
            const user = await updateUserRole(parseInt(id), role);
            res.status(200).json(user);
        } catch (error) {
            console.error('Error al actualizar rol:', error);
            res.status(500).json({ error: 'Error al actualizar rol' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
