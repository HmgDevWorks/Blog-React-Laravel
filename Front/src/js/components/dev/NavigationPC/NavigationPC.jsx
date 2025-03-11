// import { Container, Row, Col } from 'react-bootstrap';
import './NavigationPC.css';
import LogoPrincipal from '../../../../assets/Logo-principal.png';

const NavigationPC = () => {
    return (
        <div className="navigatorPc" style={{ backgroundColor: 'black', color: 'white' }}>
            <div className='logoDiv'>
                <img src={LogoPrincipal} alt="" className='logoPrincipal' />
            </div>
            <div className="listaPc">
                <ul>
                    <a href="/"><li><div className="textoNavbar">Inicio</div></li></a>
                    <a href="/novedades"><li><div className="textoNavbar">Novedades</div></li></a>
                    <a href="#about" ><li><div className="textoNavbar">Favoritos</div></li></a>
                    <a href="#services" ><li><div className="textoNavbar">Perfil</div></li></a>
                    <a href="/logIn" >  <li><div className="textoNavbar">Iniciar Sesion</div></li></a>
                </ul>
            </div>
        </div>
    );
}
export default NavigationPC;