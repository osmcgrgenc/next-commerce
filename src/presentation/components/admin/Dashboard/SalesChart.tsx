"use client";

import ChartComponent from "../../ui/ChartComponent";
import { ChartOptions } from "@/lib/Chart";

export function SalesChart() {
  const chartOptions: ChartOptions = {
    lines: [
      {
        data: [[1, 12000], [2, 19000], [3, 15000], [4, 25000], [5, 22000], [6, 30000]],
      },
    ],
    xAxis: {
      title: "Aylar",
      min: 1,
      max: 6,
    },
    yAxis: {
      title: "Satışlar",
      min: 0,
      max: 30000,
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <ChartComponent 
        options={chartOptions} 
        selector="salesChart" 
      />
    </div>
  );
} 