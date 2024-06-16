'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/actions'; // Asegúrate de que esta función esté definida

function LoginForm() {
    const [resultado, setResultado] = useState('');
    const [tipo, setTipo] = useState('');
    const router = useRouter();

    async function wrapper(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        const message = await login(data);
        if (message?.success) {
            setTipo('success');
            setResultado(message.success);
            localStorage.setItem('token', message.token);
            router.push('/perfil');
        } else if (message?.error) {
            setTipo('error');
            setResultado(message.error);
        }
    }

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-gray-900">
            <h2 className="text-3xl font-bold mb-8 text-center">Iniciar sesión</h2>
            <form onSubmit={wrapper} className="space-y-6">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            name="email"
                            placeholder="angel@mail.com"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Contraseña
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            name="password"
                            placeholder="******"
                            required
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                    Iniciar sesión
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
    );
}

export default LoginForm;
