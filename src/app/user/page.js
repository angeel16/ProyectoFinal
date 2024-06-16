// pages/user-roles.js o app/user-roles/page.js
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const roles = ['Admin', 'Editor', 'Viewer'];

export default function UserRoles() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error al cargar los usuarios:', error);
                setError('Error al cargar los usuarios');
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put(`/api/users/${userId}/role`, { role: newRole });
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, role: newRole } : user
                )
            );
        } catch (error) {
            console.error('Error al actualizar el rol:', error);
            setError('Error al actualizar el rol');
        }
    };

    if (loading) return <p className="text-center mt-8 text-xl">Cargando usuarios...</p>;
    if (error) return <p className="text-center mt-8 text-xl text-red-500">{error}</p>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-600 to-blue-500 text-white p-8 pt-20">
            <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-8 text-center">Gestión de Roles de Usuario</h1>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
                                    >
                                        {roles.map((role) => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
