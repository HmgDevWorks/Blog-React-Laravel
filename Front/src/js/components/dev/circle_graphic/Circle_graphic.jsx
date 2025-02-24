import React, { useEffect, useState } from "react";
import axios from "axios";
import ApexCharts from "apexcharts";
import getChartOptions from "./Options";
import "./Circle_graphic.css";

export default function Circle_graphic() {
  const [chartData, setChartData] = useState({
    series: [52.8, 26.8, 20.4, 10.0],
    labels: ["Articulo 1", "Articulo 2", "Articulo 3", "Articulo 4"],
  });

//   useEffect(() => {
//     axios.get("/api/chart-data")
//       .then(response => {
//         setChartData({
//           series: response.data.series,
//           labels: response.data.labels,
//         });
//       })
//       .catch(error => {
//         console.error("Error fetching chart data:", error);
//       });
//   }, []);

  useEffect(() => {
    const chartElement = document.getElementById("pie-chart");
    if (chartElement && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(chartElement, getChartOptions(chartData));
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [chartData]);

  return (
    <div className="graphiCircle max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <h5 className="articulosMasLeidos">Los artículos más leidos</h5>
      <div className="flex justify-between items-start w-full">
        <div className="flex-col items-center">
          <div className="flex items-center mb-1">
            <div data-popover id="chart-info" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
              <div data-popper-arrow></div>
            </div>
          </div>
        </div>
        <div id="dateRangeDropdown" className=" z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-80 lg:w-96 dark:bg-gray-700 dark:divide-gray-600">
          <div className="p-3" aria-labelledby="dateRangeButton">
            <div date-rangepicker datepicker-autohide className="flex items-center">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                  </svg>
                </div>
              </div>
              <span className="mx-2 text-gray-500 dark:text-gray-400">to</span>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 circulo" id="pie-chart"></div>

    </div>
  );
}
              

