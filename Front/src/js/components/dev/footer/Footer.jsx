import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="py-3 text-center">
      <ul className="list-unstyled d-inline-flex">
        <li className="mx-3">
          <Link to="/cookies" className="text-decoration-none">Política de privacidad</Link>
        </li>
        <li className="mx-3">
          <Link to="/privacidad" className="text-decoration-none">Cookies</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
