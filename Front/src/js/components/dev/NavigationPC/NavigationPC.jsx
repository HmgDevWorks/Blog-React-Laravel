import './NavigationPC.css';
import LogoPrincipal from '../../../../assets/Logo-principal.png';
import { useContext } from 'react';
import { AuthContext } from '../../../bootstrap/contexts/AuthContext';
import { FaUser, FaStar, FaHome, FaLock, FaPlusSquare, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const NavigationPC = () => {
    const { loggedUser, logOut } = useContext(AuthContext);
<<<<<<< HEAD
    const { t, i18n } = useTranslation();
    console.log("Idioma actual:", i18n.language);
    console.log("Traducciones cargadas:", i18n.getDataByLanguage(i18n.language));
=======
    const { t } = useTranslation();
>>>>>>> main
    return (
        <div className="navigatorPc" style={{ backgroundColor: 'black', color: 'white' }}>
            <div className='logoDiv'>
                <Link to="/">
                    <img src={LogoPrincipal} alt="Logo Principal" className='logoPrincipal' />
                </Link>
            </div>
            <div className="listaPc">
                <ul>
                    <Link to="/">
                        <li>
                            <div className="textoNavbar flex items-center">
                                <FaHome className="mr-2" />
<<<<<<< HEAD
                                <p>{t("Inicio")}</p>
=======
                                <p>{t("nav.home")}</p>
>>>>>>> main
                            </div>
                        </li>
                    </Link>

                    {loggedUser && (
                        <>
                            {loggedUser.role === "admin" && (
                                <Link to="/admin">
                                    <li>
                                        <div className="textoNavbar flex items-center">
                                            <FaLock className="mr-2" />
<<<<<<< HEAD
                                            <p>{t('Admin')}</p>
=======
                                            <p>{t('nav.admin')}</p>
>>>>>>> main
                                        </div>
                                    </li>
                                </Link>
                            )}

                            <Link to="/favorite_posts">
                                <li>
                                    <div className="textoNavbar flex items-center">
                                        <FaStar className="mr-2" />
<<<<<<< HEAD
                                        <p>Favoritos</p>
=======
                                        <p>{t('fav')}</p>
>>>>>>> main
                                    </div>
                                </li>
                            </Link>

                            <Link to="/profile">
                                <li>
                                    <div className="textoNavbar flex items-center">
                                        <FaUser className="mr-2" />
<<<<<<< HEAD
                                        <p>Perfil</p>
=======
                                        <p>{t('nav.profile')}</p>
>>>>>>> main
                                    </div>
                                </li>
                            </Link>

                            <Link to="/createPost">
                                <li>
                                    <div className="textoNavbar flex items-center">
                                        <FaPlusSquare className="mr-2" />
<<<<<<< HEAD
                                        <p>Crear Post</p>
=======
                                        <p>{t('nav.createPost')}</p>
>>>>>>> main
                                    </div>
                                </li>
                            </Link>

                            <Link to="#" onClick={logOut}>
                                <li>
                                    <div className="textoNavbar flex items-center text-red-500">
                                        <FaSignOutAlt className="mr-2" />
<<<<<<< HEAD
                                        <p>{t('logout')}</p>
=======
                                        <p>{t('nav.logout')}</p>
>>>>>>> main
                                    </div>
                                </li>
                            </Link>
                        </>
                    )}

                    {!loggedUser && (
                        <Link to="/logIn">
                            <li>
                                <div className="textoNavbar flex items-center">
                                    <FaSignInAlt className="mr-2" />
<<<<<<< HEAD
                                    <p>Iniciar sesión</p>
=======
                                    <p>{t('nav.login')}</p>
>>>>>>> main
                                </div>
                            </li>
                        </Link>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default NavigationPC;
