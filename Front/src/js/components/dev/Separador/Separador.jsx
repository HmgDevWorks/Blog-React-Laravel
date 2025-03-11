import { useState, useEffect } from 'react';
import separador from '../../../../assets/separador.svg'; // Importa el archivo SVG
import './Separador.css';

const Separador = () => {
   // const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Estado para detectar si es móvil

    return (
        <>
            <img src={separador} alt="Separador" className="separador-img" />
        </>
    );
};

export default Separador;
