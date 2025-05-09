import { Route, Routes } from "react-router-dom";
import AdminPage from "../pages/AdminPage/AdminPage";
import AuthorPage from "../pages/AuthorPage/AuthorPage";
import CreatePostPage from "../pages/CreatePostPage/CreatePostPage";
import PostDetailsPage from "../pages/PostDetailsPage/PostDetailsPage";
import LogInPage from "../pages/LogInPage/LogInPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import HomePage from "../pages/HomePage/HomePage";
import FavPage from "../pages/FavPage/FavPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
// import EditarBlogPage from "../pages/EditarBlogPage/EditarBlogPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import PrivateRoutes from "./PrivateRoutes";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";
import NewsComponent from "../components/dev/NewsComponent/NewsComponent";
import Cookies from "../pages/Cookies/Cookies";
import Privacy from "../pages/Privacy/Privacy";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/logIn"} element={<LogInPage />} />
      <Route path="/email/verify/:id/:hash" element={<VerifyEmail />} />

      <Route element={<PrivateRoutes />} >

        <Route path={"/admin"} element={<AdminPage />} />
        <Route path={"/postDetails/:blog_id"} element={<PostDetailsPage />} />
        <Route path={"/profile"} element={<ProfilePage />} />
        <Route path={"/createPost"} element={<CreatePostPage />} />
        <Route path={"/author/:authorId"} element={<AuthorPage />} />
        <Route path={"/news"} element={<NewsComponent />} />
        <Route path={"/favorite_posts"} element={<FavPage />} />
        <Route path={"/dashboard"} element={<DashboardPage />} />
        <Route path={"/categories/:category_name"} element={<CategoryPage />} />
        {/* <Route path={"/editarBlog/:blog_id"} element={<h1>editar</h1>} /> */}
      </Route>

      <Route path="/cookies" element={<Cookies />} />
      <Route path="/privacidad" element={<Privacy />} />

      <Route path={"*"} element={<h1>Esta pagina no existe :(</h1>} />
    </Routes>
  );
};

export default AppRoutes;
