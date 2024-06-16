"use client";

import { useState, useEffect } from 'react';
import { ShieldCheckIcon, UserIcon } from '@heroicons/react/outline';

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUsers();
    }, []);

    const updateRole = async (userId, newRole) => {
        try {
            const response = await fetch(`/api/users/${userId}/update-role`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedUser = await response.json();
            setUsers(users.map(user => user.id === userId ? updatedUser : user));
        } catch (error) {
            console.error(`Error updating role to ${newRole}:`, error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center pt-20 px-4 bg-gradient-to-br from-indigo-600 to-green-500">
            <div className="bg-white bg-opacity-90 rounded-lg p-8 shadow-md w-full max-w-2xl">
                <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">Lista de Usuarios</h1>
                <ul className="divide-y divide-gray-300">
                    {users.length > 0 ? users.map(user => (
                        <li key={user.id} className="py-4 flex justify-between items-center">
                            <div>
                                <span className="font-semibold text-lg">{user.name}</span>
                                <span className="text-gray-600 block">{user.email}</span>
                                <span className={`inline-block mt-1 text-xs font-medium px-2 py-1 rounded-full ${user.role === 'ADMIN' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                                    {user.role}
                                </span>
                            </div>
                            <div className="ml-4 flex space-x-2">
                                {user.role !== 'ADMIN' && (
                                    <button
                                        onClick={() => updateRole(user.id, 'ADMIN')}
                                        className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
                                    >
                                        <ShieldCheckIcon className="h-6 w-6 mr-1" />
                                        <span className="text-sm">Hacer Admin</span>
                                    </button>
                                )}
                                {user.role === 'ADMIN' && (
                                    <button
                                        onClick={() => updateRole(user.id, 'USER')}
                                        className="flex items-center text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <UserIcon className="h-6 w-6 mr-1" />
                                        <span className="text-sm">Hacer Usuario</span>
                                    </button>
                                )}
                            </div>
                        </li>
                    )) : (
                        <li className="text-gray-500 text-center">No users available</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
