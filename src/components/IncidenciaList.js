// src/components/IncidenciaList.js
"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function IncidenciaList() {
    const [incidencias, setIncidencias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchIncidencias() {
            try {
                const res = await fetch('/api/incidencias');
                if (!res.ok) {
                    throw new Error('Error al obtener incidencias');
                }
                const data = await res.json();
                setIncidencias(data);
            } catch (error) {
                console.error('Error al obtener incidencias:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchIncidencias();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (incidencias.length === 0) {
        return <p>No hay incidencias</p>;
    }

    return (
        <div className="space-y-4">
            {incidencias.map((incidencia) => (
                <div key={incidencia.id} className="p-4 bg-white rounded-md shadow-md flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">{incidencia.titulo}</h2>
                        <p className="text-gray-600">{incidencia.descripcion}</p>
                        <p className="text-gray-500">Estado: {incidencia.estado}</p>
                    </div>
                    <Link legacyBehavior href={`/incidencias/edit/${incidencia.id}`}>
                        <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Editar
                        </button>
                    </Link>
                </div>
            ))}
        </div>
    );
}
