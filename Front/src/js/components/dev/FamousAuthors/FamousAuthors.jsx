import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useInView } from 'react-intersection-observer';
import './FamousAuthors.css';

const FamousAuthors = ({ author, row }) => {
    const { t } = useTranslation();
    const navigate = useNavigate(); // Obtiene la función navigate
    const numberOfRow = row < 10 ? `0${row}` : row;
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });
    const animationClasses = `transition-all duration-2000 ease-out ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`;
    const handleAuthorClick = () => {
        navigate(`/author/${author.id}`); // Redirige a la página del autor
    };

    return (
        <div ref={ref} className={animationClasses}>
            <li className="primerAutor list-row" onClick={handleAuthorClick}>
                {/* Añadimos onClick para manejar el clic */}
                <div className="numeroAutorActivo text-4xl font-thin opacity-30 tabular-nums">
                    {numberOfRow}
                </div>
                <img
                    className="size-10 rounded-box"
                    src={author.img_user}
                    alt={author.name_user}
                />
                <div className="list-col-grow">
                    <div className="autorActivoNombre">{author.name_user}</div>
                    <div className="tagAutorActivo text-xs uppercase font-semibold opacity-60">
                        Tecnología
                    </div>
                </div>
                <div className="font-semibold opacity-80 popViewsFather">
                    <div className="popViews">
                        {author.total_views} {t('famousAuthor.views')}
                    </div>
                </div>
            </li >
        </div >
    );
};

export default FamousAuthors;