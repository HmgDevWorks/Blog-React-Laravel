import './NavigationPC.css';
import LogoPrincipal from '../../../../assets/Logo-principal.png';
import { useContext } from 'react';
import { AuthContext } from '../../../bootstrap/contexts/AuthContext';
import { FaUser, FaStar, FaHome, FaLock, FaPlusSquare, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const NavigationPC = () => {
    const { loggedUser, logOut } = useContext(AuthContext);
    const { t } = useTranslation();
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
                                <p>{t("nav.home")}</p>
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
                                            <p>{t('nav.admin')}</p>
                                        </div>
                                    </li>
                                </Link>
                            )}

                            <Link to="/favorite_posts">
                                <li>
                                    <div className="textoNavbar flex items-center">
                                        <FaStar className="mr-2" />
                                        <p>{t('fav')}</p>
                                    </div>
                                </li>
                            </Link>

                            <Link to="/profile">
                                <li>
                                    <div className="textoNavbar flex items-center">
                                        <FaUser className="mr-2" />
                                        <p>{t('nav.profile')}</p>
                                    </div>
                                </li>
                            </Link>

                            <Link to="/createPost">
                                <li>
                                    <div className="textoNavbar flex items-center">
                                        <FaPlusSquare className="mr-2" />
                                        <p>{t('nav.createPost')}</p>
                                    </div>
                                </li>
                            </Link>

                            <Link to="#" onClick={logOut}>
                                <li>
                                    <div className="textoNavbar flex items-center text-red-500">
                                        <FaSignOutAlt className="mr-2" />
                                        <p>{t('nav.logout')}</p>
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
                                    <p>{t('nav.login')}</p>
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
