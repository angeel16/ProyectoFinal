import Head from 'next/head';
import PortadaAdmin from '../components/PortadaAdmin';
import PortadaUsuario from '../components/PortadaUsuario';
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <div>
      <Head>
        <title>Gestión de Incidencias</title>
      </Head>
      {isAdmin ? <PortadaAdmin /> : <PortadaUsuario />}
    </div>
  );
}
