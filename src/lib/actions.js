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


// Convert an object to FormData
function objectToFormData(obj) {
    const formData = new FormData();
    Object.keys(obj).forEach(key => formData.append(key, obj[key]));
    return formData;
}

// LOGIN credentials
// export async function login(formData) {
//     if (!(formData instanceof FormData)) {
//         formData = objectToFormData(formData);
//     }
//     const email = formData.get('email');
//     const password = formData.get('password');

//     // Comprobamos si el usuario está registrado
// }export async function login(data) {

// LOGIN credentials

// LOGIN credentials
// /lib/actions.js

export async function login(formData) {

    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al iniciar sesión');
        }

        return { success: data.message };
    } catch (error) {
        return { error: error.message || 'Error desconocido al iniciar sesión' };
    }
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
// }
// export async function loginGitlab() {
//     try {
//         await signIn('gitlab', { redirectTo: globalThis.callbackUrl })
//     } catch (error) {
//         console.log(error);
//         throw error
//     }
// }
// export async function loginSpotify() {
//     try {
//         await signIn('spotify', { redirectTo: globalThis.callbackUrl })
//     } catch (error) {
//         console.log(error);
//         throw error
//     }
// }

// LOGOUT
export async function logout() {
    try {
        await signOut({ redirectTo: '/' })
    } catch (error) {
        throw error
    }
}

// async function getTecnicosIds() {
//     const proIds = await prisma.tecnico.findMany({
//         select: { id: true }
//     })
//     return proIds.map(p => p.id)
// }




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

// export async function getIncidencia(id) {
//     try {
//         const incidencia = await prisma.incidencia.findUnique({
//             where: { id },
//             include: {
//                 tecnicos: true
//             }
//         })

//         console.log(incidencia);
//         return incidencia;
//     } catch (error) {
//         return null;
//     }
// }
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

// Actualizar una incidencia existente
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


// export async function newIncidenciaAdmin(formData) {
//     try {
//         const idString = formData.get('id');
//         const id = idString ? parseInt(idString, 10) : null;
//         const titulo = formData.get('titulo');
//         const descripcion = formData.get('descripcion');
//         const estado = formData.get('estado');

//         if (idString && isNaN(id)) {
//             throw new Error('Invalid id: id must be an integer.');
//         }

//         const incidenciaData = {
//             titulo,
//             descripcion,
//             estado,
//         };

//         if (id !== null) {
//             incidenciaData.id = id;
//         }

//         // Create the incidencia without tecnicos
//         const incidencia = await prisma.incidencia.create({
//             data: incidenciaData,
//         });

//         console.log(incidencia);
//         revalidatePath('/');
//     } catch (error) {
//         console.error('Error creating incidencia:', error);
//     }
//     redirect('/');
// }
// export async function editIncidencia(id, data) {
//     try {
//         const updatedInc = await prisma.incidencia.update({
//             where: { id: parseInt(id, 10) }, // Asegúrate de convertir `id` a número
//             data: {
//                 descripcion: data.descripcion,
//                 titulo: data.titulo,
//                 estado: data.estado, // Asegúrate de incluir `estado`
//             },
//         });
//         return updatedInc;
//     } catch (error) {
//         console.error('Error al actualizar la incidencia:', error);
//         throw new Error('No se pudo actualizar la incidencia');
//     }
// }
// export async function editIncidenciaAdmin(data) {
//     const { id, titulo, descripcion, estado } = data;
//     const updatedIncidencia = await prisma.incidencia.update({
//         where: { id: Number(id) },
//         data: { titulo, descripcion, estado },
//     });
//     return updatedIncidencia;
// }

// src/lib/actions.js

// src/lib/actions.js
// src/lib/actions.js

// src/lib/actions.js
// src/lib/actions.js

// Eliminar una incidencia por ID
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





// // PROVEEDORES

// export async function getTecnicos() {
//     try {
//         const tecnicos = await prisma.tecnico.findMany()
//         return tecnicos;
//     } catch (error) {
//         // console.log(error);  
//         return null;
//     }
// }



// export async function getTecnico(id) {
//     try {
//         const tecnico = await prisma.tecnico.findUnique({
//             where: { id },
//             include: {
//                 incidencia: true
//             }
//         })

//         console.log(tecnico);
//         return tecnico;
//     } catch (error) {
//         return null;
//     }
// }

// async function createIncidenciaWithAdmin(titulo, descripcion) {
//     const newIncidencia = await prisma.incidencia.create({
//         data: {
//             titulo,
//             descripcion,
//         },
//     });

//     const newAdmin = await prisma.admin.create({
//         data: {
//             incidenciaId: newIncidencia.id,
//             estado: 'pendiente', // Estado predeterminado
//             // Otros campos específicos de admin
//         },
//     });

//     return { newIncidencia, newAdmin };
// }

// // Obtener un admin con su incidencia asociada
// async function getAdminWithIncidencia(adminId) {
//     const admin = await prisma.admin.findUnique({
//         where: { id: adminId },
//         include: { incidencia: true },
//     });

//     return admin;
// }



// export async function editTecnico(formData) {
//     const id = Number(formData.get('id'))
//     const nombre = formData.get('nombre')


//     try {
//         const tecnico = await prisma.tecnico.update({
//             where: { id },
//             data: { nombre },
//         })
//         console.log(tecnico);
//         revalidatePath('/tecnicos')
//     } catch (error) {
//         console.log(error);
//     }
//     redirect('/tecnicos');
// }



// export async function deleteTecnico(formData) {
//     try {
//         const id = Number(formData.get('id'))

//         const tecnico = await prisma.tecnico.delete({
//             where: {
//                 id: id,
//             },
//         })
//         console.log(tecnico);
//         revalidatePath('/tecnicos')
//     } catch (error) {
//         console.log(error);
//     }

//     redirect('/tecnicos');
// }

// export async function getUsers() {
//     return await prisma.user.findMany({
//         select: {
//             id: true,
//             name: true,
//             email: true,
//             role: true,
//         },
//     });
// }

// Actualizar rol de usuario
export async function updateUserRole(userId, newRole) {
    return await prisma.user.update({
        where: { id: userId },
        data: { role: newRole },
    });
}