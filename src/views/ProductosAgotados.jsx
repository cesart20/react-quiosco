import useSWR from "swr"
import clienteAxios from "../../config/axios"
import Producto from "../components/Producto"


export default function ProductosAgostados() {

    const token = localStorage.getItem('token');
    const fetcher = () => clienteAxios.get('/api/productos/disponibles', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(data => data.data);
    const {data, error, isLoading} = useSWR(`/api/productos/disponibles`, fetcher, {
        refreshInterval: 1000,
    });

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // console.log(data);


  return (
    <div>
        <h1 className="text-4xl font-black">Productos</h1>
        <p className="text-2xl my-10">
            Maneja la disponibilidad de los productos
        </p>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {data.data.map((producto) => (
              <Producto
                key={producto.imagen}
                producto={producto}
                botonDisponible={true}
              />
          ))}
      </div>
    </div>
  )
}
