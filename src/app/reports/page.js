'use client'

import { useEffect, useState } from 'react';
import { getIncidencias } from "@/lib/actions";
import { RefreshIcon, ExclamationCircleIcon, CheckCircleIcon, ClockIcon, ClipboardCheckIcon, PencilAltIcon } from '@heroicons/react/outline';

export default function Reports() {
    const [incidencias, setIncidencias] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getIncidencias();
            if (data) {
                setIncidencias(data);
            } else {
                console.error('Error fetching incidencias');
            }
        }
        fetchData();
    }, []);

    const handleRefresh = async () => {
        const data = await getIncidencias();
        if (data) {
            setIncidencias(data);
        } else {
            console.error('Error fetching incidencias');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 text-black">
            <main className="flex flex-col items-center px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex justify-between items-center w-full max-w-4xl mb-6">
                    <h1 className="text-4xl font-extrabold">
                        Reportes de Incidencias
                    </h1>
                    <button onClick={handleRefresh} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center shadow hover:bg-blue-700 transition">
                        <RefreshIcon className="w-5 h-5 mr-2" />
                        Recargar
                    </button>
                </div>
                <div className="w-full max-w-4xl">
                    <div className="bg-white rounded-lg shadow-xl p-8">
                        <div className="grid grid-cols-1 gap-8">
                            {incidencias.map((incidencia, index) => (
                                <div key={index} className="border-b pb-4 mb-4 last:border-none last:pb-0 flex items-start justify-between">
                                    <div className="flex items-start">
                                        {getStatusIcon(incidencia.estado)}
                                        <div className="ml-4 text-left">
                                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{incidencia.titulo}</h3>
                                            <p className="text-gray-600 mb-2">{incidencia.descripcion}</p>
                                            <span className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(incidencia.estado)}`}>
                                                {formatStatus(incidencia.estado)}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="ml-4 text-gray-500 hover:text-gray-700 transition">
                                        <PencilAltIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function getStatusColor(status) {
    switch (status) {
        case 'pendiente':
            return 'bg-yellow-500 text-white';
        case 'abierto':
            return 'bg-blue-500 text-white';
        case 'en_progreso':
            return 'bg-orange-500 text-white';
        case 'cerrado':
            return 'bg-green-500 text-white';
        default:
            return 'bg-gray-500 text-white';
    }
}

function formatStatus(status) {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
}

function getStatusIcon(status) {
    switch (status) {
        case 'pendiente':
            return <ClockIcon className="w-6 h-6 text-yellow-500" />;
        case 'abierto':
            return <ExclamationCircleIcon className="w-6 h-6 text-blue-500" />;
        case 'en_progreso':
            return <ClipboardCheckIcon className="w-6 h-6 text-orange-500" />;
        case 'cerrado':
            return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
        default:
            return <ExclamationCircleIcon className="w-6 h-6 text-gray-500" />;
    }
}
