import React from 'react';
import './Privacy.css'; 

const Privacy = () => {
  return (
    <div className="privacyContainer">
        <h1>Política de Privacidad</h1>
        <p>En C-Blog (en adelante, “el Sitio”), la privacidad de nuestros usuarios es una prioridad. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos tu información personal al acceder y utilizar nuestro blog.</p>
        <div>
            <h2>1. Información que recopilamos</h2>
            <p>Podemos recopilar la siguiente información cuando interactúas con nuestro sitio:</p>
            <ul>
                <li>Nombre y dirección de correo electrónico cuando te suscribes al boletín o dejas un comentario.</li>
                <li>Información técnica como dirección IP, tipo de navegador, sistema operativo y páginas visitadas, recopilada automáticamente mediante cookies y tecnologías similares.</li>
                <li>Cualquier otro dato que decidas compartir voluntariamente con nosotros a través de formularios o correos electrónicos.</li>
            </ul>
        </div>

        <div>
            <h2>2. Finalidad del tratamiento de datos</h2>
            <p>La información que recopilamos se utiliza para:</p>
            <ul>
                <li>Gestionar suscripciones al blog y envío de boletines informativos.</li>
                <li>Responder a consultas o comentarios realizados por los usuarios.</li>
                <li>Analizar el tráfico y uso del sitio para mejorar su funcionamiento.</li>
                <li>Cumplir con obligaciones legales si corresponde.</li>
            </ul>
        </div>

        <div>
            <h2>3. Uso de cookies</h2>
            <p>Este sitio utiliza cookies para mejorar la experiencia de navegación, personalizar contenido y analizar el tráfico. Para más información, consulta nuestra <a href="#">Política de Cookies</a>.</p>
            <p>Puedes configurar tu navegador para que rechace o elimine las cookies, aunque esto podría afectar el funcionamiento del sitio.</p>
        </div>

        <div>
            <h2>4. Compartición de datos</h2>
            <p>No vendemos, alquilamos ni compartimos tus datos personales con terceros, excepto en los siguientes casos:</p>
            <ul>
                <li>Con proveedores de servicios que nos ayudan a operar el sitio web (por ejemplo, plataformas de email marketing), bajo acuerdos de confidencialidad.</li>
                <li>Cuando sea requerido por ley o por una autoridad competente.</li>
            </ul>
        </div>

        <div>
            <h2>5. Derechos del usuario</h2>
            <p>Tienes derecho a acceder, rectificar o eliminar tus datos personales, así como a oponerte al tratamiento o solicitar la limitación del mismo. Para ejercer estos derechos, puedes contactarnos a través de <a href="mailto:info@cblog.com">info@cblog.com</a>.</p>
        </div>

        <div>
            <h2>6. Seguridad de la información</h2>
            <p>Nos comprometemos a proteger tus datos personales mediante medidas de seguridad adecuadas para evitar accesos no autorizados, divulgación o destrucción de la información.</p>
        </div>

        <div>
            <h2>7. Enlaces a sitios de terceros</h2>
            <p>Nuestro blog puede contener enlaces a otros sitios web. No nos hacemos responsables por las prácticas de privacidad de dichos sitios. Te recomendamos leer sus respectivas políticas.</p>
        </div>

        <div>
            <h2>8. Cambios en esta política</h2>
            <p>Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Cualquier modificación será publicada en esta página con la fecha de la última actualización.</p>
        </div>

        <div>
            <h2>9. Contacto</h2>
            <p>Si tienes preguntas o inquietudes sobre esta política, por favor contáctanos en: <a href="mailto:info@cblog.com">info@cblog.com</a></p>
        </div>
      {}
    </div>
  );
};

export default Privacy;
