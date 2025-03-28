import { Link } from "react-router-dom";
import "./Footer.css";
import { useTranslation } from "react-i18next";
import LangBubble from "../LangBubble/LangBubble";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content p-5">
      <nav className="flex justify-evenly w-full relative">
        <LangBubble />

        <Link to="/cookies" className="link link-hover" id="lk01">{t("footer.cookies")}</Link>
        <Link to="/privacidad" className="link link-hover" id="lk02">{t("footer.privacy")}</Link>
      </nav>
    </footer>
  );
};

export default Footer;