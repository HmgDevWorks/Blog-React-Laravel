import React from 'react';
import './Cookies.css'; 

const Cookies = () => {
  return (
    <div className="cookiesContainer">
      <h1>Política de Cookies</h1>
      <p>En C-Blog utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Esta política explica qué son las cookies, cómo las utilizamos y qué opciones tienes para gestionarlas.</p>
      <div>
          <h2>1. ¿Qué son las cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet, teléfono móvil, etc.) cuando visitas un sitio web. Las cookies permiten que el sitio web recuerde tu actividad y preferencias durante un período de tiempo, lo que facilita tu navegación y mejora la experiencia de usuario.</p>
      </div>

      <div>
          <h2>2. ¿Qué tipos de cookies utilizamos?</h2>
          <ul>
              <li><strong>Cookies necesarias:</strong> Son imprescindibles para el funcionamiento del sitio web y no se pueden desactivar en nuestros sistemas. Estas cookies se activan generalmente como resultado de acciones que realizas, como establecer tus preferencias de privacidad o rellenar formularios.</li>
              <li><strong>Cookies de rendimiento:</strong> Nos permiten contar las visitas y las fuentes de tráfico para medir y mejorar el rendimiento de nuestro sitio web. Toda la información recopilada por estas cookies es agregada y, por lo tanto, anónima.</li>
              <li><strong>Cookies funcionales:</strong> Estas cookies permiten que el sitio web ofrezca funciones mejoradas y personalizadas. Pueden ser configuradas por nosotros o por terceros cuyos servicios hemos añadido a nuestras páginas.</li>
              <li><strong>Cookies de publicidad:</strong> Se utilizan para ofrecerte anuncios relevantes según tus intereses. También se pueden utilizar para limitar la cantidad de veces que ves un anuncio y para medir la efectividad de una campaña publicitaria.</li>
          </ul>
      </div>

      <div>
          <h2>3. ¿Por qué utilizamos cookies?</h2>
          <ul>
              <li>Mejorar la funcionalidad y usabilidad del sitio web.</li>
              <li>Analizar el rendimiento del sitio y entender cómo los usuarios interactúan con él.</li>
              <li>Personalizar la experiencia del usuario, proporcionando contenido y anuncios más relevantes.</li>
              <li>Recopilar información estadística sobre la navegación de los usuarios.</li>
          </ul>
      </div>

      <div>
          <h2>4. ¿Cómo puedes gestionar las cookies?</h2>
          <p>Puedes configurar tu navegador para que rechace las cookies o para que te avise cuando se estén utilizando. Sin embargo, ten en cuenta que algunas funcionalidades del sitio pueden no funcionar correctamente si desactivas las cookies.</p>
          <p>Para más información sobre cómo desactivar o controlar las cookies, visita la sección de ayuda de tu navegador o consulta la documentación de los principales navegadores.</p>
      </div>

      <div>
          <h2>5. Cookies de terceros</h2>
          <p>En algunas secciones de nuestro sitio web, también podemos utilizar servicios de terceros que colocan cookies en tu dispositivo. Estos incluyen proveedores de análisis web, redes sociales y proveedores de servicios publicitarios. Estas cookies están sujetas a sus propias políticas de privacidad y cookies.</p>
      </div>

      <div>
          <h2>6. Consentimiento para el uso de cookies</h2>
          <p>Al utilizar nuestro sitio web, aceptas el uso de cookies según lo descrito en esta política. Si no estás de acuerdo con el uso de cookies, puedes ajustar la configuración de tu navegador para rechazarlas o dejar de usar nuestro sitio web.</p>
      </div>

      <div>
          <h2>7. Cambios en la política de cookies</h2>
          <p>Nos reservamos el derecho de actualizar esta política de cookies en cualquier momento. Cualquier cambio será publicado en esta página, y la fecha de la última actualización se modificará en la parte superior de este documento.</p>
      </div>

      <div>
          <h2>8. Contacto</h2>
          <p>Si tienes alguna pregunta o inquietud sobre nuestra política de cookies, no dudes en contactarnos a través de:<a href="mailto:info@cblog.es"> info@cblog.es</a> </p>          
      </div>
      {}
    </div>
  );
};

export default Cookies;
