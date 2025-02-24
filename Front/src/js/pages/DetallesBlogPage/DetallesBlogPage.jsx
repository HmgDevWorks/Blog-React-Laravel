import { useParams } from 'react-router-dom';
import Ciencia from '../../../assets/categorias/Ciencia.webp';
// import Cultura from '../../../assets/categorias/Cultura.webp';
// import Deportes from '../../../assets/categorias/Deportes.webp';
// import Entretenimiento from '../../../assets/categorias/Entretenimiento.webp';
// import Economia from '../../../assets/categorias/economia.webp';
// import Estetica from '../../../assets/categorias/Estetica.webp';
// import Recetas from '../../../assets/categorias/Recetas.webp';
// import salud from '../../../assets/categorias/salud.webp';
// import Tecnologia from '../../../assets/categorias/Tecnologia.webp';
// import Viajes from '../../../assets/categorias/Viajes.webp';
import './DetallesBlogPage.css';
import DetallesBlog from '../../components/dev/DetallesBlog/DetallesBlog';

const DetallesBlogPage = () => {
  const { blog_id } = useParams();



  const blogs =

  {
    id: blog_id,
    titulo: 'prueba',
    contenido: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus aut laudantium nisi assumenda aspernatur, qui saepe maiores necessitatibus itaque aliquid alias autem corrupti eos eveniet harum deleniti blanditiis quisquam impedit!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus aut laudantium nisi assumenda aspernatur, qui saepe maiores necessitatibus itaque aliquid alias autem corrupti eos eveniet harum deleniti blanditiis quisquam impedit!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus aut laudantium nisi assumenda aspernatur, qui saepe maiores necessitatibus itaque aliquid alias autem corrupti eos eveniet harum deleniti blanditiis quisquam impedit!',
    autor: 'prueba de autor',
    tag: '#1er tag',
    image: Ciencia
  }



  return (
    <div>
      <DetallesBlog blog={blogs} />
    </div >

  );
};

export default DetallesBlogPage;
