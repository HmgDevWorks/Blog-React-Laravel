import React from 'react';
import { useParams } from 'react-router-dom';
import CreatePost from "../../components/dev/createPost/createPost";
import BackToTop from "../../components/dev/BackToTop/BackToTop";
import CategoryPageItem from "../../components/dev/CategoryPageItem/CategoryPageItem";
import ArticleFinder from "../../components/dev/article_finder/Article_finder_daisy";
import './CategoryPage.css';

const CategoryPage = () => {
  const { id_categoria } = useParams();

  return (
    <div>
      <div className="Titulo_Sin_Fondo text-center p-2">
        {id_categoria}
      </div>
      <div className="numArticulos">
        <p>10 artículos</p>
      </div>
      <ArticleFinder />
      <CategoryPageItem />
      <BackToTop />
      <CreatePost />
    </div>
  );
};

export default CategoryPage;
