import "./TitleBlog.css";
import { useTranslation } from "react-i18next";

function Title({ f_size = 40, h_num = 1 }) {
  const { t } = useTranslation(); // Hook para obtener traducciones
  const Tag = `h${Math.min(Math.max(h_num, 1), 6)}`; // Etiqueta h entre h1 y h6
  const text = t("title"); // Obtiene el text traducido desde translation.json
  const parts = text.split(/(el limite|lo pones tú|the only limit|is you)/i); // Divide el text en parts destacadas

  return (
    <div className="title-container w-full">
      <Tag id="titulo" style={{ fontSize: `${f_size}px` }} className="title">
        {parts.map((part, index) =>
          part.toLowerCase() === "el limite" ||
          part.toLowerCase() === "lo pones tú" ||
          part.toLowerCase() === "the only limit" ||
          part.toLowerCase() === "is you" ? (
            <span key={index} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </Tag>
    </div>
  );
}

export default Title;