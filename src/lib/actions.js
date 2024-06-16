'use server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signIn, signOut } from '@/auth';
import { getUserByEmail } from '@/lib/data'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


// REGISTER
export async function register(formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario ya está registrado
    const user = await getUserByEmail(email);

    if (user) {
        return { error: 'El email ya está registrado' }
    }

    // Encriptamos password 
    const hashedPassword = await bcrypt.hash(password, 10)

    // Guardamos credenciales en base datos
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return { success: "Registro correcto" }
}
function objectToFormData(obj) {
    const formData = new FormData();
    Object.keys(obj).forEach(key => formData.append(key, obj[key]));
    return formData;
}

// LOGIN credentials
export async function login(formData) {
    if (!(formData instanceof FormData)) {
        formData = objectToFormData(formData);
    }
    const email = formData.get('email');
    const password = formData.get('password');
}


// LOGIN google
export async function loginGoogle() {
    try {
        await signIn('google', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}

// LOGIN github
export async function loginGithub() {
    try {
        await signIn('github', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}


// LOGOUT
export async function logout() {
    try {
        await signOut({ redirectTo: '/' })
    } catch (error) {
        throw error
    }
}



export async function getIncidencias() {
    try {
        const incidencias = await prisma.incidencia.findMany();
        return incidencias;
    } catch (error) {
        console.error('Error al obtener incidencias:', error);
        throw new Error('No se pudieron obtener las incidencias');
    }
}
export async function getUsers() {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw new Error('No se pudieron obtener los usuarios');
    }
}

export async function getIncidenciaById(id) {
    try {
        const incidencia = await prisma.incidencia.findUnique({
            where: { id: Number(id) }, // Asegúrate de convertir el ID a número
        });
        return incidencia;
    } catch (error) {
        console.error('Error fetching incidencia:', error);
        return null;
    }
}

export async function updateIncidencia(incidencia) {
    try {
        const updatedIncidencia = await prisma.incidencia.update({
            where: { id: Number(incidencia.id) },
            data: {
                titulo: incidencia.titulo,
                descripcion: incidencia.descripcion,
            },
        });
        return updatedIncidencia;
    } catch (error) {
        console.error('Error updating incidencia:', error);
        return null;
    }
}
export async function newIncidencia(data) {
    try {
        const newInc = await prisma.incidencia.create({
            data: {
                titulo: data.titulo,
                descripcion: data.descripcion,
                estado: 'PENDIENTE',
            },
        });
        return newInc;
    } catch (error) {
        console.error('Error al crear la incidencia:', error);
        throw new Error('No se pudo crear la incidencia');
    }
}

export async function editIncidencia(id, data) {
    try {
        const updatedInc = await prisma.incidencia.update({
            where: { id: parseInt(id, 10) },
            data: {
                titulo: data.titulo,
                descripcion: data.descripcion,
                estado: data.estado,
            },
        });
        return updatedInc;
    } catch (error) {
        console.error('Error al actualizar la incidencia:', error);
        throw new Error('No se pudo actualizar la incidencia');
    }
}
export async function deleteIncidencia(id) {
    try {
        const result = await prisma.incidencia.delete({
            where: { id: parseInt(id, 10) },
        });
        return result;
    } catch (error) {
        console.error('Error al eliminar la incidencia:', error);
        throw new Error('Error al eliminar la incidencia');
    }
}
export async function updateUserRole(userId, newRole) {
    return await prisma.user.update({
        where: { id: userId },
        data: { role: newRole },
    });
}