import CreatePost from "../../components/dev/CreatePost/createPost";
import Title from "../../components/dev/Title/TitleBlog";
import BackToTop from "../../components/dev/BackToTop/BackToTop";
import Categorycarousel from "../../components/dev/Categorycarousel/Categorycarousel";
import Separador from "../../components/dev/Separador/Separador";
import ArticleFinder from "../../components/dev/article_finder/ArticleFinder";
import CategoryFinder from "../../components/dev/categoryFinder/CategoryFinder";
import Authors from "../../components/dev/Authors/authors";
import Counter from "../../components/dev/Counter/Counter";

const HomePage = () => {
  return (
    <div>
      {/* f_size y h_num son opcionales */}
      <Title texto="C-Blog, donde el limite de las ideas, lo pones tú" f_size={43} h_num={1} />
      <Separador />
      <Categorycarousel />
      <Separador />
      <ArticleFinder />
      <Separador />
      <Authors />
      <Separador />
      <Counter />
      <BackToTop />
      <CreatePost />
    </div>
  );
};

export default HomePage;
