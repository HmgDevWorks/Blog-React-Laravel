import statService from "../../../services/statService";
import Stats from "../Stats/Stats";
import "./Counter.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Counter() {
  const { t } = useTranslation();
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
    <div className="counter flex flex-row flex-wrap w-full">
      {/* <img src="" alt=""></img> */}
      <h3>{t("counter.title")}</h3>
      <Stats stats={stats} />
    </div>
  );
}
