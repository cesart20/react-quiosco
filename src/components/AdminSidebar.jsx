import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminSidebar() {

    const {logout} = useAuth({middleware: 'auth'});

  return (
    <aside className="md:w-72 h-screen">
        <div className="p-4">
            <img className="w-40" src="/img/logo.svg" alt="logo imagen" />
        </div>

        <nav className="flex flex-col p-4">
            <Link to={'/admin'} className="text-lg font-bold">Ordenes</Link>
            <Link to={`/admin/productos`} className="text-lg font-bold">Productos</Link>
            <Link to={`/admin/productos/disponibles`} className="text-lg font-bold">Productos Agotados</Link>

        </nav>

        <div className="my-5 px-5">
            <button
                type="button"
                className="bg-red-500 w-full p-3 font-bold text-white truncate"
                onClick={logout}
            >
                Cerrar sesión
            </button>
        </div>
    </aside>
  )
}
