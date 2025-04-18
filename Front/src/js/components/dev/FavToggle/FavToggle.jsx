import { useState, useEffect } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import favService from '../../../services/favService';
import { useAlert } from '../../../bootstrap/contexts/AlertContext';
// import './FavToggle.css';


export default function FavToggle({ fav, id, onToggle, className }) {
    const { addError, addSuccess } = useAlert();
    const [isFav, setIsFav] = useState(fav);

    const handleToggle = (e) => {
        e.stopPropagation();
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
                setIsFav(true);
                addSuccess(response.data.mensaje);
                onToggle?.(id, true); //  Solo llama a onToggle si existe
            })
            .catch(error => {
                addError(error.mensaje);
            });
    };

    const removeFav = () => {
        favService.removeFav(id)
            .then(response => {
                setIsFav(false);
                addSuccess(response.data.original.mensaje);
                onToggle?.(id, false); //  Solo llama a onToggle si existe
            })
            .catch(error => {
                addError(error.mensaje);
            });
    };

    return (
        <button className={className}>
            <a onClick={handleToggle} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {isFav ? <FaStar color="gold" className='fav-star' /> : <FaRegStar color="gold" className='fav-star' />}
            </a>
        </button>
    );
}
