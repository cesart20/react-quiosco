/* eslint-disable react/prop-types */
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

export default function Producto({producto}) {

    const {handleClickModal, handleSetProducto} = useQuiosco();
    const { nombre, precio, imagen} = producto;
    



  return (
    <div className="border p-3 shadow bg-white">
        <img
            alt={`Imagen de ${nombre}`}
            className="w-full"
            src={`/img/${imagen}.jpg`}
        />

        <div className="p-5">
            <h3 className="text-2xl font-bold">{nombre}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
                {formatearDinero(precio)}
            </p>

            <button
                onClick={() => {
                    handleClickModal()
                    handleSetProducto(producto);
                }}
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full font-bold p-3 mt-5 uppercase"
            >
                Agregar
            </button>
        </div>
    </div>
  )
}
