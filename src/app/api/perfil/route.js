import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req) {
    try {
        const { id, name, email, password } = await req.json();

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser && existingUser.id !== id) {
            return new Response(JSON.stringify({ error: 'El correo electrónico ya está en uso por otro usuario.' }), { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                ...(password && { password }),
            },
        });

        return new Response(JSON.stringify({ message: 'Perfil actualizado con éxito', profile: updatedUser }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Hubo un error al actualizar el perfil' }), { status: 500 });
    }
}

export async function GET() {
    return new Response('Método no permitido', { status: 405 });
}
