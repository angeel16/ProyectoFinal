import { auth } from "@/auth";

async function page() {
    const sesion = await auth();

    if (!sesion) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-600 to-green-500 text-white">
                <p className="text-lg">Cargando...</p>
            </div>
        );
    }

    const isAdmin = sesion.user.role === 'ADMIN';

    return (
        <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-indigo-600 to-green-500 text-white">
            <div className="container mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-lg mt-12">
                <h1 className="text-4xl font-extrabold mb-6 text-indigo-700">🔑 Dashboard</h1>
                <div className="flex flex-col items-center">
                    <p className="text-xl text-gray-900">Nombre: {sesion.user.name}</p>
                    <p className="text-lg text-gray-600">Email: {sesion.user.email}</p>
                    <p className="text-lg text-gray-600">Role: {sesion.user.role}</p>
                </div>
                <div className="mt-8">
                    {isAdmin ? <AdminContent /> : <UserContent />}
                </div>
            </div>
        </div>
    );
}

function AdminContent() {
    return (
        <div className="mt-8 bg-gray-200 bg-opacity-80 p-6 rounded-lg shadow-md text-gray-900">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">Panel de Administración</h2>
            <p className="text-lg">Aquí puedes gestionar usuarios, configuraciones y más.</p>
        </div>
    );
}

function UserContent() {
    return (
        <div className="mt-8 bg-gray-200 bg-opacity-80 p-6 rounded-lg shadow-md text-gray-900">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Panel de Usuario</h2>
            <p className="text-lg">Bienvenido a tu dashboard. Aquí puedes ver tus actividades y configuraciones.</p>
        </div>
    );
}

export default page;
