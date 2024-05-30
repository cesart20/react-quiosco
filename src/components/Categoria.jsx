/* eslint-disable react/prop-types */
import useQuiosco  from "../hooks/useQuiosco";


export default function Categoria({categoria}) {
  const {handleClickCategoria, categoriaActual} = useQuiosco();
  const {icono, id,  nombre} = categoria;

  return (
    <div
      className={`${categoriaActual.id === id ? "bg-amber-400" : 'bg-white'} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}
      onClick={() => handleClickCategoria(id)}
    >
        <img
          className="w-12"
          src={`img/icono_${icono}.svg`}
          alt="Imagen de la categoria"
        />
        <button 
          className="text-lg font-bold cursor-pointer truncate"
        >
          {nombre}
        </button>
    </div>
  )
}
