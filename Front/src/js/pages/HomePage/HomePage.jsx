import CreatePost from "../../components/dev/CreatePost/CreatePost";
import Title from "../../components/dev/Title/TitleBlog";
import Categorycarousel from "../../components/dev/Categorycarousel/Categorycarousel";
import Separador from "../../components/dev/Separador/Separador";
import ArticleFinder from "../../components/dev/article_finder/ArticleFinder";
import Authors from "../../components/dev/Authors/authors";
import Counter from "../../components/dev/Counter/Counter";
import NewsComponent from "../../components/dev/NewsComponent/NewsComponent";
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      {/* f_size y h_num son opcionales */}
      <Title texto="C-Blog, donde el limite de las ideas, lo pones tú" f_size={43} h_num={1} />
      <Separador />
      <Categorycarousel />
      <Separador />
      <div className="newsHomeComponent">
        <NewsComponent />
      </div>

      <Separador />
      <ArticleFinder />
      <Separador />
      <Authors />
      <Separador />
      <Counter />
      <CreatePost />
    </div>
  );
};

export default HomePage;
