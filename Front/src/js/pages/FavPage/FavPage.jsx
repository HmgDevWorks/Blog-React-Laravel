import React, { useEffect, useState } from 'react';
import "./FavPage.css";
import PostTablePagination from '../../components/dev/PostTablePagination/PostTablePagination';
import { useTranslation } from 'react-i18next';

const FavPage = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-4 mb-4 favourites-page">
      <h1 className='favourites'>{t("fav")}</h1>
      {/* <NewsCarousel className="carousel-news" newsItems={newsItems} /> */}
      <PostTablePagination filter={"favs"} />
    </div>
  );
};
export default FavPage;