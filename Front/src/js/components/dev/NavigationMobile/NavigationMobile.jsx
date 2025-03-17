// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react';
import './NavigationMobile.css'
import logoPluma from '../../../../assets/logo_pluma.svg';
import { AuthContext } from '../../../bootstrap/contexts/AuthContext';

function NavigationMobile() {
  const { loggedUser, logOut } = useContext(AuthContext);

  return (

    <div className="navbar bg-base-300 rounded-box">
      <div className="flex-1 justify-start px-2 lg:flex-none brand">
        <img src={logoPluma} className="navbarLogo" alt="hola" />CB
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
            <a href="/"><li><div className="linksNavMob">Inicio</div></li></a>
            <a href="/news"><li><div className="linksNavMob">Novedades</div></li></a>
            {console.log(loggedUser)}
            {loggedUser && (<>
              {loggedUser.role === "admin"
                && (<a href="/admin" ><li><div className="linksNavMob">Admin</div></li></a>)}
              <a href="/favorites" ><li><div className="linksNavMob">Favoritos</div></li></a>
              <a href={`/acc/${loggedUser.id}`} ><li><div className="linksNavMob">Perfil</div></li></a>
              <a href='/createPost'><li><div className="linksNavMob">Crear Post</div></li></a>
              <a href="#" onClick={logOut}><li><div className="linksNavMob">Cerrar sesion</div></li></a>
            </>)}
            {!loggedUser && (<a href="/logIn" ><li><div className="linksNavMob">Iniciar Sesion</div></li></a>)}
          </ul>
        </div>
      </div>
    </div >
  );
}

export default NavigationMobile;