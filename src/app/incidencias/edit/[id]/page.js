"use client";

import { useState, useEffect } from 'react';
import FormIncidenciaAdmin from '@/components/FormIncidenciaAdmin';
import { editIncidencia } from '@/lib/actions';

async function fetchIncidencia(id) {
    const res = await fetch(`/api/incidencias/${id}`);
    if (!res.ok) {
        throw new Error('Error al obtener la incidencia');
    }
    return res.json();
}

export default function EditPage({ params }) {
    const { id } = params;
    const [incidencia, setIncidencia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadIncidencia() {
            try {
                const data = await fetchIncidencia(id);
                setIncidencia(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadIncidencia();
    }, [id]);

    const handleSave = async (data) => {
        try {
            await editIncidencia(id, data);
        } catch (error) {
            alert('Error al actualizar la incidencia');
            console.error(error);
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!incidencia) {
        return <p>Incidencia no encontrada</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center pt-20 bg-gradient-to-br from-indigo-600 to-green-500">

            <FormIncidenciaAdmin action={handleSave} incidencia={incidencia} />
        </div>
    );
}
