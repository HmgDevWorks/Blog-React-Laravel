import { useContext } from 'react';
import './NavigationMobile.css'
import logoPluma from '../../../../assets/logo_pluma.svg';
import { AuthContext } from '../../../bootstrap/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NavigationMobile() {
  const { t } = useTranslation();
  const { loggedUser, logOut } = useContext(AuthContext);

  return (

    <div className="navbar bg-base-300 rounded-box">
      <div className="flex-1 justify-start px-2 lg:flex-none brand">
        {/* // TODO fix it */}
        <Link to="/">
          <img src={logoPluma} className="navbarLogo" alt="logo" />CB
        </Link>
      </div>

      <div className="flex flex-1 justify-end px-2 pr-0">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn dropbutton"> ☰</div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-70 p-2 shadow collapseNav">
            {/* <li>
              <a>
                <div className="linksNavMob">estadisticas de autor</div>
              </a>
            </li>
            <li>
              <a>
                <div className="linksNavMob">favoritos</div>
              </a>
            </li> */}
            <Link to="/"><li><div className="linksNavMob">{t("nav.home")}</div></li></Link>
            {/* <a href="/news"><li><div className="linksNavMob">Novedades</div></li></a> */}
            {loggedUser && (<>
              {loggedUser.role === "admin"
                && (<Link to="/admin" ><li><div className="linksNavMob">{t("nav.admin")}</div></li></Link>)}
              <Link to="/favorite_posts" ><li><div className="linksNavMob">{t("fav")}</div></li></Link>
              <Link to={`/profile`} ><li><div className="linksNavMob">{t("nav.profile")}</div></li></Link>
              <Link to='/createPost'><li><div className="linksNavMob">{t("nav.createPost")}</div></li></Link>
              <Link to="#" onClick={logOut}><li><div className="linksNavMob color-error">{t("nav.logout")}</div></li></Link>
            </>)}
            {!loggedUser && (<Link to="/logIn" ><li><div className="linksNavMob">{t("nav.login")}</div></li></Link>)}
          </ul>
        </div>
      </div>
    </div >
  );
}

export default NavigationMobile;