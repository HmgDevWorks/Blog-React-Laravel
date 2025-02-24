import Stats from "../Stats/Stats";
import "./Counter.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Counter() {
  // Llamar a la BD para obtener los datos
  const stats = [
    { name: "Articulos", value: 28 },
    { name: "Autores", value: 9 },
    { name: "Lectores", value: 456 },
  ];

  // const [stats, setStats] = useState([]);

  // useEffect(() => {
  //   axios.get('/stats')
  //     .then(response => {
  //       setStats(response.data);
  //     })
  //     .catch(error => {
  //       console.error("There was an error fetching the stats!", error);
  //     });
  // }, []);

  return (
    <div className="counter">
      {/* <img src="" alt=""></img> */}
      <h3>Contador</h3>
      <Stats stats={stats} />
    </div>
  );
}
