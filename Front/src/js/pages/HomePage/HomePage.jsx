import CreatePost from "../../components/dev/createPost/createPost";
import Title from "../../components/dev/title/TitleBlog";
import BackToTop from "../../components/dev/backToTop/BackToTop";
import LikeButton from "../../components/dev/likeButton/LikeButton";
import Categorycarousel from "../../components/dev/Categorycarousel/Categorycarousel";
import Separador from "../../components/dev/Separador/Separador";
import ArticleFinder from "../../components/dev/article_finder/ArticleFinder";
import CategoryFinder from "../../components/dev/categoryFinder/CategoryFinder";
import Authors from "../../components/dev/authors/authors";
import Counter from "../../components/dev/counter/Counter";

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
      <Authors/>
      <Separador />
      <Counter />
      <BackToTop />
      <CreatePost />
      <LikeButton />
    </div>
  );
};

export default HomePage;
