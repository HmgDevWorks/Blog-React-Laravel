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
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/novedades">Novedades</a></li>
                    <li><a href="#about" >Favoritos</a></li>
                    <li><a href="#services" >Perfil</a></li>
                    <li><a href="/logIn" >Iniciar Sesion</a></li>
                </ul>
            </div>
        </div>
    );
}
export default NavigationPC;