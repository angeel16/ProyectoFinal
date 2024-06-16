"use client";

import { useEffect, useState } from 'react';
import Head from 'next/head';
import ConfirmationModal from '@/components/ConfirmationModal';
import { getIncidencias, deleteIncidencia } from '@/lib/actions';

export default function DataPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getIncidencias();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const openModal = (id) => {
    setCurrentId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteIncidencia(currentId);
      setData((prevData) => prevData.filter((item) => item.id !== currentId));
    } catch (error) {
      setError(`Error al eliminar: ${error.message}`);
    } finally {
      closeModal();
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>Datos de Incidencias</title>
      </Head>
      <div className="relative py-3 sm:max-w-4xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-lg"></div>
        <div className="relative px-4 py-10 bg-gradient-to-r from-white to-gray-50 shadow-lg sm:rounded-lg sm:p-20">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Datos de Incidencias</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-200">{item.id}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{item.name}</td>
                    <td className="py-2 px-4 border-b border-gray-200 max-w-xs truncate" title={item.descripcion}>
                      {item.descripcion}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">{item.estado}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        onClick={() => openModal(item.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
