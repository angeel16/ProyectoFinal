import Link from 'next/link';

export default function PortadaUsuario() {
    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-green-500 text-white">
            <main className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
                <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">
                    Bienvenido al Sistema de Gestión de Incidencias
                </h1>
                <p className="text-2xl mb-8 max-w-2xl">
                    Facilita la identificación, seguimiento y resolución de problemas en tu organización.
                </p>
                <div className="relative w-full max-w-4xl">
                    <div className="absolute inset-0 transform -skew-y-6 bg-gradient-to-r from-yellow-400 to-red-500 rounded-lg shadow-xl"></div>
                    <div className="relative bg-white rounded-lg shadow-xl p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
                            <Link legacyBehavior href="/incidencias/new">
                                <a className="flex flex-col items-center">
                                    <div className="text-7xl bg-purple-500 rounded-full p-6 shadow-lg transform transition duration-300 hover:scale-110">
                                        📝
                                    </div>
                                    <h3 className="mt-4 text-2xl font-bold text-gray-800">Reportar Incidencia</h3>
                                    <p className="mt-2 text-gray-600">Informa de nuevas incidencias para que sean gestionadas.</p>
                                </a>
                            </Link>
                            <Link legacyBehavior href="/incidencias/view">
                                <a className="flex flex-col items-center">
                                    <div className="text-7xl bg-blue-500 rounded-full p-6 shadow-lg transform transition duration-300 hover:scale-110">
                                        🔍
                                    </div>
                                    <h3 className="mt-4 text-2xl font-bold text-gray-800">Ver Incidencias</h3>
                                    <p className="mt-2 text-gray-600">Consulta y sigue el estado de tus incidencias reportadas.</p>
                                </a>
                            </Link>

                            <Link legacyBehavior href="/dashboard">
                                <a className="flex flex-col items-center">
                                    <div className="text-7xl bg-green-500 rounded-full p-6 shadow-lg transform transition duration-300 hover:scale-110">
                                        📊
                                    </div>
                                    <h3 className="mt-4 text-2xl font-bold text-gray-800">Dashboard</h3>
                                    <p className="mt-2 text-gray-600">Resumen de las incidencias y estadísticas.</p>
                                </a>
                            </Link>
                            <Link legacyBehavior href="/perfil">
                                <a className="flex flex-col items-center">
                                    <div className="text-7xl bg-teal-500 rounded-full p-6 shadow-lg transform transition duration-300 hover:scale-110">
                                        ⚙️
                                    </div>
                                    <h3 className="mt-4 text-2xl font-bold text-gray-800">Configuración</h3>
                                    <p className="mt-2 text-gray-600">Administra tus ajustes de perfil y preferencias.</p>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}