import { Route, Routes } from "react-router-dom";
import Counter from "../components/dev/counter/Counter";
import Prueba from "../components/dev/prueba/Prueba";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Prueba />} />
      <Route path={"/logIn"} element={<h1>LOG IN</h1>} />
      <Route path={"/signUp"} element={<h1>Sing up</h1>} />
      <Route path={"/detallesBlog/:blog_id"} element={<h1>detalles</h1>} />
      <Route path={"/blogs/:tipo_blog"} element={<h1>HOlaaaa</h1>} />
      <Route path={"/contador"} element={<Counter />} />
    </Routes>
  );
};

export default AppRoutes;
