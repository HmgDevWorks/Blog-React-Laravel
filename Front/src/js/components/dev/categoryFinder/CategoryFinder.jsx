import { useState, useEffect } from 'react';
import './CategoryFinder.css';
const CategoryFinder = () => {
    // Define el componente funcional SearchPage
    // Todo lo que se refiere como "card" es en realidad un botón
    const [selectedCard, setSelectedCard] = useState(null); // Estado para almacenar el botón seleccionado
    const [searchQuery, setSearchQuery] = useState(''); // Estado para almacenar la consulta de búsqueda
    const [selectedCardId, setSelectedCardId] = useState(''); // Estado para almacenar el id del botón seleccionado
    const [results, setResults] = useState([]); // Estado para almacenar los resultados de búsqueda
    const [selectedButton, setSelectedButton] = useState(null); // Estado para controlar qué botón está seleccionado visualmente

    const handleCardClick = (card) => { // Función que se ejecuta cuando se hace clic en un botón
        setSelectedCard(card); // Guarda el botón seleccionado en el estado
        setSelectedCardId(card); // Guarda el id del botón seleccionado
        setSelectedButton(card); // Actualiza el estado del botón seleccionado para cambiar el estilo
    };

    const handleSearchChange = (e) => { // Función que maneja los cambios en el input de búsqueda
        const query = e.target.value; // Obtiene el valor del input
        setSearchQuery(query); // Actualiza el estado con la consulta de búsqueda

        if (selectedCardId && query) { // Verifica si hay un botón seleccionado y un término de búsqueda
            console.log(`Buscando ${query} en ${selectedCardId}`); // Muestra en consola qué se está buscando y en qué categoría

            // Aquí podrías agregar la lógica para realizar la búsqueda y actualizar los resultados
            // Por ejemplo, podrías hacer una llamada a una API y actualizar el estado de resultados
            // setResults(apiResults);
        } else {
            setResults([]); // Si no hay botón seleccionado o la búsqueda está vacía, borra los resultados
        }
    };

    /*html------------------------------------------------------------------------------------------------- */
    return (
        <div className="container mx-auto p-4 mt-10"> {/* Contenedor principal con estilos de espaciado */}
            <div className="bg-gray-200 p-4 rounded text-center"> {/* Contenedor con fondo gris y centrado */}
                <h2 className="Titulo">Encuentra el artículo:</h2> {/* Título de la búsqueda */}
            </div>

            <div className='text-center mt-10'> {/* Contenedor para el input de búsqueda */}
                <label id="buscador_lab" className="input input-bigger"> {/* Etiqueta estilizada para el input */}
                    <svg className="h-[1em] opacity-60 icon-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle> {/* Dibuja una lupa */}
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input 
                        type="search" // Define el input como tipo búsqueda
                        className="input-field" // Aplica estilos personalizados
                        required placeholder="Buscar..." // Placeholder del input
                        id="input_busc" // ID del input
                        value={searchQuery} // Conecta el input con el estado de búsqueda
                        onChange={handleSearchChange} // Llama a la función al cambiar el valor del input
                    />
                </label>
            </div>

            <div className="flex flex-wrap justify-around mt-10"> {/* Contenedor de los botones de filtro */}
                {/* Cada botón representa una categoría de búsqueda */}
                <button 
                    className={`btn-articulo btn-xs sm:btn-sm md:btn-md lg:btn-lg ${selectedButton === 'Autor' ? 'btn-selected' : ''}`}
                    onClick={() => handleCardClick('Autor')} // Llama a la función al hacer clic
                >Autor</button>

                <button 
                    className={`btn-articulo btn-xs sm:btn-sm md:btn-md lg:btn-lg ${selectedButton === 'Título' ? 'btn-selected' : ''}`}
                    onClick={() => handleCardClick('Título')}
                >Título</button>

                <button 
                    className={`btn-articulo btn-xs sm:btn-sm md:btn-md lg:btn-lg ${selectedButton === 'Contenido' ? 'btn-selected' : ''}`}
                    onClick={() => handleCardClick('Contenido')}
                >Contenido</button>

                <button 
                    className={`btn-articulo btn-xs sm:btn-sm md:btn-md lg:btn-lg ${selectedButton === 'Fecha de publicación' ? 'btn-selected' : ''}`}
                    onClick={() => handleCardClick('Fecha de publicación')}
                >Fecha de publicación</button>
            </div>

            {/* Muestra los resultados de búsqueda en tiempo real */}
            <div className="mt-4">
                {results.map((result, index) => ( // Recorre la lista de resultados y los muestra
                    <div key={index}>{result}</div> // Cada resultado se muestra dentro de un div
                ))}
            </div>
        </div>
    );
};

export default CategoryFinder;