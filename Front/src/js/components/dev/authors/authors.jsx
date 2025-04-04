import React, { useState, useEffect } from 'react';
import "./Authors.css";
import { useTranslation } from 'react-i18next';
import FamousAuthors from '../FamousAuthors/FamousAuthors';
import userService from '../../../services/userService';

const Authors = () => {
  const { t } = useTranslation();
  const [popularAuthors, setPopularAuthors] = useState([]);

  const getPopularAuthors = () => {
    userService
      .getPopularUsers()
      .then(({ data }) => {
        setPopularAuthors(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPopularAuthors();
  }, []);

  return (
    <div className="autoresCompleto bg-base-100 rounded-box shadow-md">
      <h3 className="tituloAutores p-4 pb-2 text-xs opacity-60 tracking-wide">
        {t("authors.title")}
      </h3>
      <ul className="list authors-list"> {/* Agregamos la clase authors-list */}
        {popularAuthors?.map((elm, i) => {
          console.log(elm);
          return <FamousAuthors author={elm} row={i + 1} key={i} />;
        })}
      </ul>
    </div>
  );
};

export default Authors;