import React from "react";
import { Route, Routes } from "react-router-dom";
import Circle_graphic from "../../components/dev/circle_graphic/Circle_graphic";
import Separador from "../../components/dev/separador/Separador";
import TooltipGraphic from "../../components/dev/TooltipGraph/TooltipGraph";
import AreaChart from "../../components/dev/Areachart/Areachart";
import DataLabelGraphic from "../../components/dev/Datalabel/Datalabel";
import "./DashboardPage.css";

export default function DashboardPage() {  
    return (
        <div className="my-2">
        <h1 className="dashboardTitle">Dashboard</h1>
        <Separador className="separadorDashboard" />
        <main className="dashboardGraphics">
            <div>
                <TooltipGraphic className="tooltipGraphicDashboard dGraphic"/>
                <Circle_graphic className="circleGraphicDashboard dGraphic"/>
            </div>
            <div>
                <AreaChart className="areaChartDashboard dGraphic"/>
                <DataLabelGraphic className="dataLabelGraphicDashboard dGraphic"/>
            </div>
        </main>
        </div>
    );
} 