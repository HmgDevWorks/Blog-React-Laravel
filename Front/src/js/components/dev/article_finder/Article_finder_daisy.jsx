import { useState, useEffect } from 'react';
import './Article_finder_daisy.css';

const SearchPage = () => {
    //Todo lo que se refiere como card es en realidad referido a un botón
    const [selectedCard, setSelectedCard] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCardId, setSelectedCardId] = useState(''); // Nueva constante para almacenar el id de la tarjeta seleccionada
    const [results, setResults] = useState([]); // Estado para almacenar los resultados de búsqueda
    const [selectedButton, setSelectedButton] = useState(null);

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setSelectedCardId(card); // Actualiza el id de la tarjeta seleccionada
        setSelectedButton(card);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (selectedCardId && query) {
            // Realiza la búsqueda en tiempo real usando selectedCardId y searchQuery
            console.log(`Buscando ${query} en ${selectedCardId}`);
            // Aquí puedes agregar la lógica para realizar la búsqueda y actualizar los resultados
            // Por ejemplo, puedes hacer una llamada a una API y actualizar el estado de resultados
            // setResults(apiResults);
        } else {
            setResults([]);
        }
    };

    return (
        <div className="container mx-auto p-4 mt-10">
            <div className="p-4 rounded text-center">
                <h2 className="titleArticleFinder">Encuentra el artículo:</h2>
            </div>
            <div className='text-center mt-10 '>
                <label id="buscador_lab" className="input input-bigger">
                    <svg className="h-[1em] opacity-60 icon-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input type="search" 
                        className="input-field"
                        required placeholder="Buscar..."
                        id="input_busc"
                        value={searchQuery} // Establece el valor del campo de búsqueda
                        onChange={handleSearchChange} // Permite la búsqueda en tiempo real
                    />
                </label>
            </div>

            <div className="flex flex-wrap justify-around mt-10">
                <button 
                    className={`btn-articulo btn-xs sm:btn-sm md:btn-md lg:btn-lg ${selectedButton === 'Autor' ? 'btn-selected' : ''}`}
                    onClick={() => handleCardClick('Autor')}
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
                {results.map((result, index) => (
                    <div key={index}>{result}</div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;