import React from 'react';


export default function getChartOptions  ()  {
    return {
      series: [52.8, 26.8, 20.4, 10.0], 
      colors: ["#846a6a", "#eef0e2", "#846a6a", "#eef0e2"],
      chart: {
        height: 420,
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["#eef0e2"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%",
          dataLabels: {
            offset: -10
          }
        },
      },
      labels: ["Articulo 1", "Articulo 2", "Articulo 3", "Articulo 4"], 
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
          colors: ["black"],
          fontSize: "0.8rem"
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + "%"
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value  + "%"
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    }
  };