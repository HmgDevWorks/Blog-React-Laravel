import statService from "../../../services/statService";
import Stats from "../Stats/Stats";
import "./Counter.css";
import { useEffect, useState } from "react";

export default function Counter() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    statService.getCounterStats()
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the stats!", error);
      });
  }, []);

  return (
    <div className="counter w-full">
      {/* <img src="" alt=""></img> */}
      <h3>Contador</h3>
      <Stats stats={stats} />
    </div>
  );
}
