"use client";

import React, { useState } from 'react';

function FormIncidenciaUsuario({ action }) {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await action({ titulo, descripcion });
            setModalMessage('Incidencia creada con éxito');
            setModalVisible(true);
            setTitulo('');
            setDescripcion('');
        } catch (error) {
            console.error('Error al crear la incidencia:', error);
            setModalMessage('Hubo un error al crear la incidencia');
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                    Título
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                    Descripción
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </label>
                <button
                    type="submit"
                    className="mt-4 p-2 bg-blue-600 text-white rounded-md shadow-lg"
                >
                    Crear
                </button>
            </form>

            {modalVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={closeModal}></div>
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative z-20">
                        <h3 className="text-lg font-bold">{modalMessage}</h3>
                        <button
                            onClick={closeModal}
                            className="mt-4 p-2 bg-blue-600 text-white rounded-md shadow-lg"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default FormIncidenciaUsuario;
