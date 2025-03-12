import { useState, useEffect } from "react";
import ApexCharts from "apexcharts";
import "./Datalabel.css"; // Importa el archivo CSS externo
import axios from "axios";

export default function SalesCard() {

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get("/api/data")
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching data: ", error);
  //     });
  // }, []);
  useEffect(() => {
    const options = {
      xaxis: {
        show: true,
        categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        labels: {
          show: true,
          rotate: -45, // Asegura que los meses no se oculten
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400"
          }
        },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400"
          },
        }
      },
      series: [
        { name: "Artículos más leidos", data: [150, 141, 145, 152, 135, 125, 140, 155, 130, 160, 170, 180], color: "#eef0f2" },
        { name: "Relación publicaciones - visitas", data: [43, 13, 65, 12, 42, 73, 50, 80, 90, 75, 85, 95], color: "#846a6a" },
        { name: "Publicaciones mensuales", data: [60, 85, 90, 55, 70, 80, 95, 100, 85, 110, 120, 130], color: "#353b3c" }
      ],
      chart: {
        sparkline: { enabled: false },
        height: "100%",
        width: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: { enabled: false },
        toolbar: { show: false }
      },
      tooltip: { enabled: true, x: { show: false } },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"]
        }
      },
      dataLabels: { enabled: false },
      stroke: { width: 6, colors: ["#eef0f2", "#846a6a", "#353b3c"] },
      legend: { show: false },
      grid: { show: false }
    };

    if (document.getElementById("labels-chart")) {
      const chart = new ApexCharts(document.getElementById("labels-chart"), options);
      chart.render();
    }
  }, []);

  return (
    <div className="sales-card max-w-sm w-full">
      <div className=" p-4 md:p-6 pb-0 md:pb-0">
        <div>
          <h5 className="sales-title">Resumen Global</h5>
        </div>
      </div>
      <div id="labels-chart" className="px-2.5"></div>
    </div>
  );
}
