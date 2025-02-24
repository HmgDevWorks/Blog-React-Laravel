// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import './NavigationMobile.css'
import logoPluma from '../../../../assets/logo_pluma.svg';

function NavigationMobile() {

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
            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow collapseNav">
            <li>
              <a>
                <div className="linksNavMob">estadisticas de autor</div>
              </a>
            </li>
            <li>
              <a>
                <div className="linksNavMob">favoritos</div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="linksNavMob">pefil</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div >
  );
}

export default NavigationMobile;