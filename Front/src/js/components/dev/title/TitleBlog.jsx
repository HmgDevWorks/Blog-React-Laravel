import "./TitleBlog.css";

function Title({ texto, f_size = 40, h_num = 1 }) {
  // f_size es el tamaño de la fuente y h_num es el numero de la etiqueta h
  // f_size defecto 40px y h_num defecto 1
  const Tag = `h${Math.min(Math.max(h_num, 1), 6)}`; // numero entre 1 y 6
  const partes = texto.split(/(el limite|lo pones tú)/);

  return (
    <>
      <div className="title-container w-full">
        <Tag id="titulo" style={{ fontSize: `${f_size}px` }} className="title">
          {partes.map((parte, index) =>
            parte === "el limite" || parte === "lo pones tú" ? (
              <span key={index} className="highlight">
                {parte}
              </span>
            ) : (
              parte
            )
          )}
        </Tag>
      </div>
      {/* <div>
        <p className="descripcion-blog">
          Desde la ciencia y tecnología hasta arte y cultura, cada autor aporta su perspectiva única para saciar tu curiosidad. Únete a nuestra comunidad de mentes inquietas y disfruta del placer de aprender cada día.
        </p>
      </div> */}
    </>
  );
}

export default Title;