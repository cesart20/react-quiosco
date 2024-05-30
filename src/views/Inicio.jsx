/* eslint-disable no-unused-vars */

import Producto from "../components/Producto";
import useSWR from "swr";
import useQuiosco from "../hooks/useQuiosco";
import clienteAxios from "../../config/axios";

export default function Inicio() {

  const {categoriaActual} = useQuiosco();

  // Consulta swr para obtener los productos de la categoria actual
  const fetcher = () => clienteAxios('/api/productos').then(data => data.data);
  const {data, error, isLoading} = useSWR(`/api/productos`, fetcher, {
    refreshInterval: 1000,
  });

  // console.log(data);3
  if (isLoading) return <p>Cargando...</p>;
  // if (error) return <p>Error: {error.message}</p>;
  const productos = data.data.filter((producto) => producto.categoria_id === categoriaActual.id);

  return (
    <>
      <h1 className="text-4xl font-black">{categoriaActual.nombre}</h1>
      <p className="text-2xl my-10">Elige y personaliza tu pedido a continuación</p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {productos.map((producto) => (
              <Producto
                key={producto.imagen}
                producto={producto}
              />
          ))}
      </div>
    </>
  )
}