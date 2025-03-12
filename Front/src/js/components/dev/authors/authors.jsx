//Authors - ListDaisyUI

import React from 'react';
import "./Authors.css";


const Authors = () => {
  return (
    <ul className="autoresCompleto list bg-base-100 rounded-box shadow-md">
      <li className="tituloAutores p-4 pb-2 text-xs opacity-60 tracking-wide">Autores más activos esta semana</li>
      
      <li className="primerAutor list-row">
        <div className="numeroAutorActivo text-4xl font-thin opacity-30 tabular-nums">01</div>
        <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" alt="Dio Lupa" /></div>
        <div className="list-col-grow">
          <div className="autorActivoNombre">Dio Lupa</div>
          <div className="tagAutorActivo text-xs uppercase font-semibold opacity-60">Deportes</div>
        </div>
        
      </li>
      
      <li className="list-row">
        <div className="numeroAutorActivo text-4xl font-thin opacity-30 tabular-nums">02</div>
        <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp" alt="Ellie Beilish" /></div>
        <div className="list-col-grow">
          <div className="autorActivoNombre">Ellie Beilish</div>
          <div className="tagAutorActivo text-xs uppercase font-semibold opacity-60">Tecnología</div>
        </div>
        
      </li>
      
      <li className="list-row">
        <div className="numeroAutorActivo text-4xl font-thin opacity-30 tabular-nums">03</div>
        <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp" alt="Sabrino Gardener" /></div>
        <div className="list-col-grow">
          <div className="autorActivoNombre">Sabrino Gardener</div>
          <div className="tagAutorActivo text-xs uppercase font-semibold opacity-60">Recetas</div>
        </div>
       
      </li>
    </ul>
  );
}

export default Authors;
