"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

async function fetchIncidencias() {
    const res = await fetch('/api/incidencias');
    if (!res.ok) {
        throw new Error('Error al obtener incidencias');
    }
    return res.json();
}

// Función para obtener el estilo de la etiqueta de estado
const getEstadoStyle = (estado) => {
    switch (estado) {
        case 'PENDIENTE':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'PROGRESO':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'RESUELTO':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'CERRADO':
            return 'bg-gray-100 text-gray-800 border-gray-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export default function IncidenciasList() {
    const [incidencias, setIncidencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadIncidencias() {
            try {
                const data = await fetchIncidencias();
                setIncidencias(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadIncidencias();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-lg text-gray-700">Cargando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-lg text-red-600">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center pt-20 px-4 bg-gradient-to-br from-indigo-600 to-green-500">
            <div className="bg-white bg-opacity-90 rounded-lg p-8 shadow-md w-full max-w-4xl">
                <h3 className="text-4xl font-bold text-blue-900 mb-8 mt-4 drop-shadow-lg">
                    Incidencias
                </h3>
                <ul className="space-y-4">
                    {incidencias.map(incidencia => (
                        <li key={incidencia.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-2xl font-semibold text-gray-800">{incidencia.titulo}</h4>
                                    <p className="text-gray-600 mt-2">{incidencia.descripcion}</p>
                                </div>
                                <span className={`ml-4 px-3 py-1 rounded-full text-sm font-semibold border ${getEstadoStyle(incidencia.estado)}`}>
                                    {incidencia.estado.replace('_', ' ')}
                                </span>
                            </div>
                            <div className="flex justify-end mt-4">
                                <Link href={`/incidencias/edit/${incidencia.id}`} passHref legacyBehavior>
                                    <a className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        Editar
                                    </a>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
