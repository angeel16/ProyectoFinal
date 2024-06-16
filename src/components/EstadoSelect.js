'use client';

import { useState } from 'react';

function EstadoSelect({ estadoInicial }) {
    const [estado, setEstado] = useState(estadoInicial);

    const handleEstadoChange = (event) => {
        setEstado(event.target.value);
    };

    return (
        <div className="mb-4">
            <label htmlFor='estado' className="block mb-1">Estado</label>
            <select id='estado' name='estado'
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                value={estado} onChange={handleEstadoChange}>
                <option value="pendiente">Pendiente</option>
                <option value="abierto">Abierto</option>
                <option value="en_progreso">En Progreso</option>
                <option value="cerrado">Cerrado</option>
            </select>
        </div>
    );
}

export default EstadoSelect;
