"use client";

import Link from 'next/link';

export default function PortadaAdmin() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white">
            <main className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
                <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">
                    Gestión de Incidencias
                </h1>
                <p className="text-2xl mb-8 max-w-2xl">
                    Un sistema moderno para la gestión eficiente de incidencias. Facilita la identificación, seguimiento y resolución de problemas en tu organización.
                </p>
                <div className="relative w-full max-w-4xl">
                    <div className="absolute inset-0 transform -skew-y-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-xl"></div>
                    <div className="relative bg-white rounded-lg shadow-xl p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col items-center">
                                <Link legacyBehavior href="/incidencias/delete">
                                    <a className="flex flex-col items-center">
                                        <div className="text-7xl bg-red-500 rounded-full p-6 shadow-lg transform transition duration-300 hover:scale-110">
                                            🗑️
                                        </div>
                                        <h3 className="mt-4 text-2xl font-bold text-gray-800">Eliminar Incidencia</h3>
                                        <p className="mt-2 text-gray-600 text-center">Elimina incidencias ya resueltas o irrelevantes.</p>
                                    </a>
                                </Link>
                            </div>
                            <div className="flex flex-col items-center">
                                <Link href="/incidencias/list">
                                    <div className="flex flex-col items-center cursor-pointer">
                                        <div className="text-7xl bg-yellow-500 rounded-full p-6 shadow-lg transform transition duration-300 hover:scale-110">
                                            ⚠️
                                        </div>
                                        <h3 className="mt-4 text-2xl font-bold text-gray-800">Alertas</h3>
                                        <p className="mt-2 text-gray-600 text-center">Monitorea y gestiona alertas críticas de manera eficiente.</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex flex-col items-center">
                                <Link legacyBehavior href="/dashboard">
                                    <a className="flex flex-col items-center cursor-pointer">
                                        <div className="text-7xl bg-green-500 rounded-full p-6 shadow-lg transform transition duration-300 hover:scale-110">
                                            📊
                                        </div>
                                        <h3 className="mt-4 text-2xl font-bold text-gray-800">Dashboard</h3>
                                        <p className="mt-2 text-gray-600 text-center">Resumen de las incidencias y estadísticas.</p>
                                    </a>
                                </Link>
                            </div>
                            <div className="flex flex-col items-center">
                                <Link href="/admin/users">
                                    <div className="flex flex-col items-center cursor-pointer">
                                        <div className="text-7xl bg-blue-500 rounded-full p-6 shadow-lg transform transition duration-300 hover:scale-110">
                                            🛠️
                                        </div>
                                        <h3 className="mt-4 text-2xl font-bold text-gray-800">Roles de Usuario</h3>
                                        <p className="mt-2 text-gray-600 text-center">Gestión de roles y permisos de usuarios.</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
