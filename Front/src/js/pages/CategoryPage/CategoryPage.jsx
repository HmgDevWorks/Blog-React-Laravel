import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreatePost from "../../components/dev/CreatePost/CreatePost";
import BackToTop from "../../components/dev/BackToTop/BackToTop";
import PostDetails from "../../components/dev/PostDetails/PostDetails";
import PaginationComponent from "../../components/dev/PaginationComponent/PaginationComponent";
import CategoriesServices from '../../services/categoriesService';
import FavToggle from '../../components/dev/FavToggle/FavToggle';
import './CategoryPage.css';

const CategoryPage = () => {
  const [articulos, setArticulos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("novedades"); // Estado para ordenar

  const postPerPage = 10;
  const { category_name } = useParams();

  useEffect(() => {
    if (category_name) {
      CategoriesServices.getPostForCategory(category_name)
        .then(({ data }) => {
          const posts = data.Post;
          if (Array.isArray(posts)) {
            setArticulos(posts);
          } else {
            console.error('La respuesta de la API no es un array:', posts);
          }
        })
        .catch(error => {
          console.error('Error al obtener los artículos de la categoría:', error);
        });
    }
  }, [category_name]);

  // Función para ordenar por "Más vistos"
  const ordenarMasVistos = () => {
    const sorted = [...articulos].sort((a, b) => {
      if (b.views === a.views) {
        return new Date(b.created_at) - new Date(a.created_at); // Más nuevo primero
      }
      return b.views - a.views; // Más vistos primero
    });
    setArticulos(sorted);
    setSortType("mas_vistos");
  };

  // Función para ordenar por "Novedades"
  const ordenarNovedades = () => {
    const sorted = [...articulos].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setArticulos(sorted);
    setSortType("novedades");
  };

  useEffect(() => {
    if (sortType === "mas_vistos") {
      ordenarMasVistos();
    } else {
      ordenarNovedades();
    }
  }, [sortType]);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPostPage = articulos.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(articulos.length / postPerPage);

  return (
    <div className='categoryPage'>
      <div className="QueVemos">
        {sortType === "novedades" ? `¿Qué vemos hoy en ${category_name} ? (Novedades)` : `¿Qué vemos hoy en ${category_name} ? (Más vistos)`}
      </div>
      <div className="filtro-categorias">
        <button
          className={`filtro-boton ${sortType === "novedades" ? "activo" : ""}`}
          onClick={ordenarNovedades}
        >
          Novedades
        </button>
        <button
          className={`filtro-boton ${sortType === "mas_vistos" ? "activo" : ""}`}
          onClick={ordenarMasVistos}
        >
          Más Vistos
        </button>
      </div>

      <PaginationComponent pageCount={pageCount} currentPage={currentPage} handlePageChange={setCurrentPage} />

      <div>
        <ul className="enlaces-lista">
          {currentPostPage.map((articulo) => (
            <li key={articulo.id} className="enlace-item">
              <PostDetails blog={articulo} />
              <FavToggle fav={articulo.isFav} id={articulo.id} />
            </li>
          ))}
        </ul>
      </div>

      <PaginationComponent pageCount={pageCount} currentPage={currentPage} handlePageChange={setCurrentPage} />
      <BackToTop />
      <CreatePost />
    </div>
  );
};

export default CategoryPage;
