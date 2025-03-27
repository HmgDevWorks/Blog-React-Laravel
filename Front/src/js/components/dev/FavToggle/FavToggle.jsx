import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import favService from '../../../services/favService';
import { useAlert } from '../../../bootstrap/contexts/AlertContext';

export default function FavToggle({ fav, id }) {
    const { addError, addSuccess } = useAlert();
    const [isFav, setIsFav] = useState(fav);
    const handleToggle = (e) => {
        e.stopPropagation(); // Previene que el click se propague a la fila
        if (isFav) {
            removeFav(id);
        } else {
            addFav(id);
        }
    };

    useEffect(() => {
        setIsFav(fav);
    }, [fav]);

    const addFav = () => {
        favService.addFav(id)
            .then(response => {
                console.log(response);
                setIsFav(() => true);
                addSuccess(response.data.mensaje);
            }).catch(error => {
                console.log(error);
                addError(error.mensaje);
            });
    };

    const removeFav = () => {
        favService.removeFav(id)
            .then(response => {
                console.log(response);
                setIsFav(() => false);
                addSuccess(response.data.mensaje);
            }).catch(error => {
                console.log(error);
                addError(error.mensaje);
            });
    };

    return (
        <a onClick={handleToggle} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }} className='fav-toggle'>
            {isFav ? <FaStar color="gold" /> : <FaRegStar color="gold" />}
        </a>
    );
}