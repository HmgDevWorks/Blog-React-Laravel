import Stats from "../stats/Stats";
import "./Counter.css";

export default function Counter() {
  // Llamar a la BD para obtener los datos
  const stats = [
    { name: "Articulos", value: 28 },
    { name: "Lectores", value: 254 },
    { name: "Comentarios", value: 5 },
  ];

  return (
    <div className="counter">
      <img src="" alt=""></img>
      <Stats stats={stats} />
    </div>
  );
}
