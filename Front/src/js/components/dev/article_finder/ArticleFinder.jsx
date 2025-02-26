import { useState } from 'react';
import './ArticleFinder.css';

const ArticleFinder = () => {
    
    const [selectedButton, setselectedButton] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState([]); // Estado para los resultados de la búsqueda (sin acabar)

    const handleCardClick = (card) => { //Button click
        setselectedButton(card);
        console.log(`Buscando "${inputValue}" en "${card}"`);
    };
    const handleSearchChange = (e) => { //Input changes
        const query = e.target.value;
        setInputValue(query);
        
        if (selectedButton) {
            console.log(`Buscando "${query}" en "${selectedButton}"`);
            
        }
    };
    return (
        <div className="container mx-auto p-4 mt-10">
            <div className="bg-gray-200 p-4 rounded text-center">
                <h2 className="titleArticleFinder">Encuentra el artículo:</h2>
            </div>

            <div className='text-center mt-10'>
                <label id="buscador_lab" className="input input-bigger">
                    <svg className="h-[1em] opacity-60 icon-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input 
                        type="search"
                        className="input-field"
                        required placeholder="Buscar..."
                        //value={inputValue}
                        id="input_busc"
                        onChange={handleSearchChange}
                    />
                </label>
            </div>

            <div className="flex flex-wrap justify-around mt-10">
                <button 
                    className={`categorybutton ${selectedButton === 'Autor' ? 'categorybutton-selected' : ''}`}
                    onClick={() => handleCardClick('Autor')}
                >Autor</button>

                <button 
                    className={`categorybutton ${selectedButton === 'Título' ? 'categorybutton-selected' : ''}`}
                    onClick={() => handleCardClick('Título')}
                >Título</button>

                <button 
                    className={`categorybutton ${selectedButton === 'FechaPublicacion' ? 'categorybutton-selected' : ''}`}
                    onClick={() => handleCardClick('FechaPublicacion')}
                >Fecha de publicación</button>
            </div>

            <div className="mt-4">
                {results.map((result, index) => (<div key={index}>{result}</div>))}
            </div>
        </div>
    );
};

export default ArticleFinder; 
