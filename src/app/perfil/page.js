"use client";
import { useState, useEffect } from 'react';

export default function PerfilPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('1');
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchPerfil = async () => {
            const perfil = {
                id: '1',
                name: 'Angel',
                email: 'Angelborrego@gmail.com',
            };

            setId(perfil.id);
            setName(perfil.name);
            setEmail(perfil.email);
        };

        fetchPerfil();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const perfilData = { id, name, email, password };

        try {
            const res = await fetch('/api/perfil', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(perfilData),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error al guardar los cambios: ${res.status} - ${errorText}`);
            }

            const result = await res.json();
            showNotification('Perfil actualizado con éxito', 'success');
            setPassword('');
        } catch (error) {
            console.error('Error en handleSubmit:', error);
            showNotification(`Hubo un error al actualizar el perfil: ${error.message}`, 'error');
        }
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-indigo-600 to-green-500 pt-20 text-white">
            <div className="max-w-4xl w-full p-8 bg-white bg-opacity-90 rounded-lg shadow-md mt-2 text-gray-900">
                <h1 className="text-4xl font-bold mb-4 text-center">Configuración de Perfil</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-800">Nombre</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tu nombre"
                            className="mt-1 p-2 border border-gray-300 rounded-md text-gray-900"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-800">Correo Electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Tu correo electrónico"
                            className="mt-1 p-2 border border-gray-300 rounded-md text-gray-900"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-800">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nueva contraseña"
                            className="mt-1 p-2 border border-gray-300 rounded-md text-gray-900"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>

            {notification && (
                <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg text-white transition-transform duration-300 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
}
