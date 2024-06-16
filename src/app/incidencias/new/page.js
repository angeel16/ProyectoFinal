// src/app/incidencias/new/page.js
"use client";

import FormIncidenciaUsuario from "@/components/FormIncidenciaUsuario";
import { newIncidencia } from "@/lib/actions";

export default function NewIncidenciaPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-indigo-600 to-green-500 text-white py-10">
      <div className="relative z-10 max-w-lg w-full p-8 bg-white bg-opacity-90 rounded-lg shadow-lg text-center text-gray-900 mt-16">
        <h3 className="text-4xl font-bold mb-8 drop-shadow-lg">
          Nueva Incidencia
        </h3>
        <FormIncidenciaUsuario action={newIncidencia} />
      </div>
    </div>
  );
}
