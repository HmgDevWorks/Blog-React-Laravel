# <h1 align="center">🚀 Frontend de CBlog | Modern Blog Platform </h1>

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-22.2-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/npm-CB4245?style=for-the-badge&logo=npm" alt="npm">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react" alt="React">
</div>

---

## 🌟 Características Principales
- **Autenticación JWT** 🔒
- **Editor de posts enriquecido** ✍️
- **Soporte multiidioma** 🌍
- **Diseño responsive** 📱💻

---

## 🛠️ Tecnologías Clave
| Tecnología | Uso | Badge |
|------------|-----|-------|
| **Vite** | Bundler y HMR | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) |
| **DaisyUI** | Componentes UI | ![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=flat&logo=daisyui&logoColor=white) |
| **React Router** | Navegación | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) |
| **Yoopta** | Editor WYSIWYG | ![Yoopta](https://img.shields.io/badge/Yoopta-4285F4?style=flat&logo=yoopta&logoColor=white) |
| **i18next** | Traducciones | ![i18next](https://img.shields.io/badge/i18next-26A69A?style=flat&logo=i18next&logoColor=white) |
| **Axios** | Peticiones HTTP | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) |

---

## 🚀 Empezando

Clonar repositorio
git clone https://github.com/tuusuario/cblog-frontend.git

Instalar dependencias
npm install

Iniciar servidor de desarrollo
npm run dev

**Accede**: [http://localhost:5173](http://localhost:5173) 🌐

---

## 📂 Estructura del Proyecto
src/     
├── js/     
│ ├── bootstrap/ # 🧩 Contextos y hooks     
│ ├── components/dev/ # 🧱 Componentes UI     
│ ├── pages/ # 🖥️ Vistas principales     
│ ├── router/ # 🗺️ Configuración de rutas     
│ └── services/ # 📡 Llamadas API     
public/     
└── locales/ # 🌐 Traducciones     
├── en/ # 🇬🇧 Inglés     
└── es/ # 🇪🇸 Español

---

## 🔒 Sistema de Autenticación
**Almacenamiento JWT**:
// Ejemplo de guardado en storage
const rememberMe = true; // Opción del usuario
const storage = rememberMe ? localStorage : sessionStorage;
storage.setItem('authToken', token);

**Protección de Rutas**:
// router/PrivateRoutes.jsx
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/dev/Loader/Loader";
import { useContext } from "react";
import { AuthContext } from "../bootstrap/contexts/AuthContext";

const PrivateRoutes = () => {
const { loggedUser, isLoading } = useContext(AuthContext);

text
if (isLoading) return <Loader />;
return loggedUser ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoutes;

---

## 🌐 Internacionalización
**Añadir idioma**:
1. Crear carpeta en `public/locales/[codigo]`
2. Añadir `translation.json`:
{
"welcome": "Bienvenido",
"login": "Iniciar sesión"
}

---

## 🧪 Testing (Recomendaciones)
Instalar dependencias de test
npm install --save-dev @testing-library/react vitest

Ejecutar tests
npm test

**Ejemplo de test**:
import { render, screen } from '@testing-library/react';
import Pagination from './components/Pagination';

test('renderiza 5 botones de paginación', () => {
render(<Pagination totalPages={5} />);
expect(screen.getAllByRole('button')).toHaveLength(5);
});

---

## 🚀 Deployment en Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

**Configuración**:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

**Variables de entorno sugeridas**:
VITE_API_URL=https://api.tudominio.com
VITE_ENV=production

---

## 🌈 Roadmap
| Estado | Feature | Badge |
|--------|---------|-------|
| ✅ | Autenticación JWT | ![Done](https://img.shields.io/badge/✅-Done-green) |
| 🔜 | Sistema de comentarios | ![In Progress](https://img.shields.io/badge/🔜-In_Progress-orange) |
| ⏳ | Dark Mode | ![Planned](https://img.shields.io/badge/⏳-Planned-blue) |

---

<div align="center">
  ✨ Hecho con ❤️ usando las mejores tecnologías frontend ✨
</div>
