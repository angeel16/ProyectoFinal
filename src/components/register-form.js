'use client';
import { useState } from 'react';
import { register } from '@/lib/actions';
import { signIn } from 'next-auth/react'; // signIn desde lado CLIENTE

function RegisterForm() {
    const [resultado, setResultado] = useState('');
    const [tipo, setTipo] = useState('');

    async function wrapper(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const message = await register(formData); // Server action
        if (message.success) {
            setTipo('success');
            setResultado(message.success);
            await signIn('credentials', {
                email: formData.get('email'),
                password: formData.get('password'),
                callbackUrl: '/dashboard'
            });
        } else {
            setTipo('error');
            setResultado(message.error);
        }
    }

    return (
        <div className="flex items-start justify-center min-h-screen pt-12 bg-gradient-to-br from-indigo-600 to-green-500">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-gray-900">
                <h2 className="text-3xl font-bold mb-8 text-center">Crear cuenta</h2>
                <form onSubmit={wrapper} className="space-y-6">
                    <div className="space-y-4">
                        <label className="block">
                            <span className="block text-sm font-medium text-gray-700">Nombre</span>
                            <input
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                type="text"
                                name="name"
                                placeholder="angel"
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="block text-sm font-medium text-gray-700">Email</span>
                            <input
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                type="email"
                                name="email"
                                placeholder="angel@mail.com"
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="block text-sm font-medium text-gray-700">Contraseña</span>
                            <input
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                type="password"
                                name="password"
                                placeholder="******"
                                required
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Crear cuenta
                    </button>
                </form>

                {resultado && (
                    <div
                        className={`mt-4 p-3 rounded-md text-center ${tipo === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                        {resultado}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RegisterForm;
