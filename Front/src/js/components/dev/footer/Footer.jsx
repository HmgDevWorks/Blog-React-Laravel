import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content p-5">
      <nav className="flex justify-around w-full">
        <Link to="/cookies" className="link link-hover" id="lk01">Política de Cookies</Link>
        <Link to="/privacidad" className="link link-hover" id="lk02">Política de Privacidad</Link>
      </nav>
    </footer>
  );
};

export default Footer;