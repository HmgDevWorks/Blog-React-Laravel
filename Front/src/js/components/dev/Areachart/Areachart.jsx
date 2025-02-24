import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import "./AreaChart.css"; // Archivo CSS para los estilos personalizados
import axios from "axios";

function AreaChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const options = {
        chart: {
          height: "100%",
          maxWidth: "100%",
          type: "area",
          fontFamily: "Inter, sans-serif",
          dropShadow: { enabled: false },
          toolbar: { show: false },
          background: "transparent", // 🔥 Fondo transparente
        },
        tooltip: { enabled: true, x: { show: false } },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#846a6a",
            gradientToColors: ["#846a6a"],
          },
        },
        dataLabels: { enabled: false },
        stroke: { width: 4, colors: ["#846a6a"] },
        grid: { show: false, strokeDashArray: 4, padding: { left: 2, right: 2, top: 0 } },
        series: [
          {
            name: "Publicaciones",
            data: [3, 7, 5, 8, 6, 10, 9, 4, 6, 7, 12, 15], // Datos de publicaciones
            color: "#846a6a",
          },
        ],
        xaxis: {
          categories: [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
          ],
          labels: { 
            style: { colors: "#000" } 
          },
        },
        yaxis: { labels: { style: { colors: "#000" } } },
        markers: {
          size: 6,
          colors: ["#eef0f2"], // 🔥 Color del punto de hover
          strokeColors: "#846a6a",
          hover: { size: 8 },
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => chart.destroy(); // Limpiar el gráfico al desmontar
    }
  }, []);

  return (
    <div className="areaChartGraphic max-w-lg w-full  p-6">
      <div className="text-center">
        <h5 className="titleAreaChart font-bold pb-2">
          Publicaciones Mensuales
        </h5>
      </div>
      {/* Contenedor del Gráfico */}
      <div ref={chartRef} className="flex justify-center"></div>
    </div>
  );
}

export default AreaChart;
