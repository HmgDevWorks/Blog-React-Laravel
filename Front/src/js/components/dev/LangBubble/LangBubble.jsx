import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";

export default function LangBubble() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng); // Guarda el idioma seleccionado
    };

    return (
        <div className="">
            <div className="dropdown dropdown-top dropdown-start">
                <label tabIndex={0} className="btn btn-circle btn-primary">
                    <FaGlobe className="text-xl" />
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-28"
                >
                    <li>
                        <button onClick={() => changeLanguage("en")}>🇺🇸 English</button>
                    </li>
                    <li>
                        <button onClick={() => changeLanguage("es")}>🇪🇸 Español</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};