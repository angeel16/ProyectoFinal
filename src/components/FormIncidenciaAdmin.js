"use client";

import React, { useState } from 'react';

const getEstadoStyle = (estado) => {
    switch (estado) {
        case 'PENDIENTE':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'EN_PROGRESO':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'RESUELTO':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'CERRADO':
            return 'bg-red-100 text-red-800 border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

function FormIncidenciaAdmin({ action, incidencia }) {
    const [titulo, setTitulo] = useState(incidencia?.titulo || '');
    const [descripcion, setDescripcion] = useState(incidencia?.descripcion || '');
    const [estado, setEstado] = useState(incidencia?.estado || 'PENDIENTE');
    const [alerta, setAlerta] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await action({ titulo, descripcion, estado });
            setAlerta({ tipo: 'success', mensaje: 'Incidencia actualizada con éxito' });
            setTimeout(() => setAlerta(null), 5000); // Oculta la alerta después de 5 segundos
        } catch (error) {
            console.error('Error al actualizar la incidencia:', error);
            setAlerta({ tipo: 'error', mensaje: 'Hubo un error al actualizar la incidencia' });
            setTimeout(() => setAlerta(null), 5000); // Oculta la alerta después de 5 segundos
        }
    };

    return (
        <div className="relative">
            {alerta && (
                <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 p-4 w-full max-w-lg text-center rounded-md shadow-md ${alerta.tipo === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {alerta.mensaje}
                </div>
            )}
            <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md mt-12">
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">Formulario de Incidencia</h2>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                        Título
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                            className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                        Descripción
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                            className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                        Estado
                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            required
                            className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="PENDIENTE">Pendiente</option>
                            <option value="EN_PROGRESO">En Progreso</option>
                            <option value="RESUELTO">Resuelto</option>
                            <option value="CERRADO">Cerrado</option>
                        </select>
                    </label>
                    <div className={`mt-2 p-2 rounded-lg border text-sm font-semibold ${getEstadoStyle(estado)}`}>
                        Estado seleccionado: {estado.replace('_', ' ')}
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="mt-4 p-3 w-full bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormIncidenciaAdmin;
