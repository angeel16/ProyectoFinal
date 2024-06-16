import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response(JSON.stringify({ message: 'No autorizado' }), {
            status: 401,
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return new Response(JSON.stringify({ message: 'Usuario no encontrado' }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify(user), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error al obtener perfil del usuario' }), {
            status: 500,
        });
    }
}
