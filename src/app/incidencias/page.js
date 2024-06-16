import Link from 'next/link'
import Incidencia from '@/components/Incidencia'
import { getIncidencias } from '@/lib/actions'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const incidencias = await getIncidencias()

  return (
    <div className="flex flex-col items-center justify-center py-2" style={{ minHeight: "93vh", backgroundImage: "url('/frutas-y-frutos-secos.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-md mt-2">
        <h1 className="text-3xl font-bold mb-4 text-center mt-2">Incidencias</h1>
        <Link legacyBehavior href="/incidencias/new">
          <a className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md block text-center mb-2">Nuevo incidencia</a>
        </Link>
        {incidencias.map((incidencia) => (
          <Incidencia key={incidencia.id} incidencia={incidencia}>
            <div className="flex justify-between">
              <Link legacyBehavior href={{ pathname: '/incidencias/newAdmin', query: { id: incidencia.id } }}>
                <a className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 mr-2">Editar incidencia</a>
              </Link>
              <Link legacyBehavior href={{ pathname: '/incidencias/delete', query: { id: incidencia.id } }}>
                <a className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2">Eliminar incidencia</a>
              </Link>
            </div>
          </Incidencia>
        ))}
      </div>
    </div>
  )
}
