import CreatePost from "../../components/dev/createPost/createPost";
import Title from "../../components/dev/title/TitleBlog";
import Categorycarousel from "../../components/dev/Categorycarousel/Categorycarousel";
import Separador from "../../components/dev/Separador/Separador";
import ArticleFinder from "../../components/dev/article_finder/ArticleFinder";
import Authors from "../../components/dev/authors/authors";
import Counter from "../../components/dev/counter/Counter";
import NewsComponent from "../../components/dev/NewsComponent/NewsComponent";
import './HomePage.css'
import { useInView } from "react-intersection-observer";
import { useInView as useInView2 } from 'react-intersection-observer'

const HomePage = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  const { ref: ref2, inView: inView2 } = useInView2({ // Usa useInView2 para ref2
    triggerOnce: false,
    threshold: 0.5,
  });
  const animationClasses2 = `transition-all duration-1000 ease-out ${inView2 ? 'opacity-100 ' : 'opacity-0 '
    }`;
  const animationClasses = `transition-all duration-1000 ease-out ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`;
  return (
    <div className="flex flex-col items-center">
      {/* f_size y h_num son opcionales */}
      <Title texto="C-Blog, donde el limite de las ideas, lo pones tú" f_size={43} h_num={1} />
      <Separador />

      <Categorycarousel />
      <Separador />
      <div ref={ref} className={`newsHomeComponent ${animationClasses}`}>
        <NewsComponent />
      </div>

      <Separador />
      <ArticleFinder />
      <Separador />
      <div ref={ref2} className={`autoresCompleto ${animationClasses2}`} >
        <Authors />
      </div>
      <Separador />
      <Counter />
      <CreatePost />
    </div >
  );
};

export default HomePage;
