import CreatePost from "../../components/dev/createPost/createPost";
import BackToTop from "../../components/dev/BackToTop/BackToTop";
import Category from "../../components/dev/CategoryPageItem/CategoryPageItem";
const CategoryPage = () => {
  const { title } = useLocation().state || { title: "Categoria" };

  return (
    <div>
      <div className="Titulo_Sin_Fondo text-center p-2">
        {title}
      </div>
      <div className="numArticulos">
        <p></p>
      </div>
      <Category />
      <BackToTop />
      <CreatePost />
    </div>
  );
};

export default CategoryPage;
