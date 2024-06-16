import Link from 'next/link';
import { auth } from "@/auth";
import { logout } from '@/lib/actions';

async function Header() {
    const session = await auth();

    return (
        <nav className="bg-gray-800 shadow-lg transform transition-transform duration-500 ease-in-out translate-y-[-100%] opacity-0 header-animate">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex items-center flex-shrink-0">
                        <Link href="/" className="ml-12 text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-1">
                            Inicio
                        </Link>

                    </div>
                    <div className="flex items-center space-x-4">
                        {session ? (
                            <form>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition duration-300 ease-in-out transform active:scale-95"
                                    formAction={logout}
                                >
                                    Cerrar Sesión
                                </button>
                            </form>
                        ) : (
                            <div className="flex">
                                <Link href="/auth/register" className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-1">
                                    Registrarse
                                </Link>
                                <Link href="/auth/login" className="ml-4 text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-1">
                                    Iniciar Sesión
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;