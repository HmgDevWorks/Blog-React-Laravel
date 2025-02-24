import { Route, Routes } from "react-router-dom";
import AutorPage from "../pages/AutorPage/AutorPage";
import CrearBlogPage from "../pages/CrearBlogPage/CrearBlogPage";
import DetallesBlogPage from "../pages/DetallesBlogPage/DetallesBlogPage";
import LogInPage from "../pages/LogInPage/LogInPage";
import PerfilPage from "../pages/PerfilPage/PerfilPage";
// import HomePage from "../pages/HomePage/HomePage";
import NovedadesPage from "../pages/NovedadesPage/NovedadesPage";
import FavPage from "../pages/FavPage/FavPage";
// import EditarBlogPage from "../pages/EditarBlogPage/EditarBlogPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path={"/"} element={<HomePage />} /> */}
      <Route path={"/logIn"} element={<LogInPage />} />
      {/* <Route path={"/novedades"} element={<NovedadesPage />} /> */}
      <Route path={"/dashboard"} element={<DashboardPage />} />
      <Route path={"/detallesBlog/:blog_id"} element={<DetallesBlogPage />} />
      <Route path={"/perfil/:id_usuario"} element={<PerfilPage />} />
      <Route path={"/blogs/:tipo_blog"} element={<h1>HOlaaaa</h1>} />
      <Route path={"/crearBlog"} element={<CrearBlogPage />} />
      <Route path={"/autor/:id_usuario"} element={<AutorPage />} />
      <Route path={"/novedades"} element={<NovedadesPage />} />
      <Route path={"/favoritos"} element={<FavPage />} />

      {/* <Route path={"/signUp"} element={<h1>Sing up</h1>} /> */}
      {/* <Route path={"/editarBlog/:blog_id"} element={<h1>editar</h1>} /> */}
      {/* <Route path={"/contador"} element={<Counter />} /> */}
    </Routes>
  );
};

export default AppRoutes;
