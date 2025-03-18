import { Route, Routes } from "react-router-dom";
import AdminPage from "../pages/AdminPage/AdminPage";
import AuthorPage from "../pages/AuthorPage/AuthorPage";
import CreatePostPage from "../pages/CreatePostPage/CreatePostPage";
import PostDetailsPage from "../pages/PostDetailsPage/PostDetailsPage";
import LogInPage from "../pages/LogInPage/LogInPage";
import AccPage from "../pages/AccPage/AccPage";
import HomePage from "../pages/HomePage/HomePage";
import NewsPage from "../pages/NewsPage/NewsPage";
import FavPage from "../pages/FavPage/FavPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
// import EditarBlogPage from "../pages/EditarBlogPage/EditarBlogPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/logIn"} element={<LogInPage />} />

      <Route element={<PrivateRoutes />} >

        <Route path={"/admin"} element={<AdminPage />} />
        <Route path={"/postDetails/:blog_id"} element={<PostDetailsPage />} />
        <Route path={"/acc/:id_usuario"} element={<AccPage />} />
        {/* <Route path={"/blogs/:tipo_blog"} element={<h1>HOlaaaa</h1>} /> */}
        <Route path={"/createPost"} element={<CreatePostPage />} />
        <Route path={"/author/:authorId"} element={<AuthorPage />} />
        <Route path={"/news"} element={<NewsPage />} />
        <Route path={"/favorite_posts"} element={<FavPage />} />
        <Route path={"/dashboard"} element={<DashboardPage />} />
        <Route path={"/categories/:id_categorie"} element={<CategoryPage />} />
        {/* <Route path={"/editarBlog/:blog_id"} element={<h1>editar</h1>} /> */}
      </Route>

      <Route path={"*"} element={<h1>Esta pagina no existe :(</h1>} />
    </Routes>
  );
};

export default AppRoutes;
