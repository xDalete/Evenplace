"use client"; 
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Desktop", "Mobile", "Tablet", "Smart TV", "Others"],
  datasets: [
    {
      label: "Traffic Share",
      data: [45, 30, 15, 7, 3],
      backgroundColor: [
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#8B5CF6"
      ],
      borderColor: "rgba(128,128,128, 0.1)",
      borderWidth: 4,
      hoverOffset: 12
    }
  ]
};

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyle: "circle",
        font: {
          size: 14
        }
      }
    },
    tooltip: {
      callbacks: {
        label: context => {
          const value = context.parsed || 0;
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${context.label}: ${value}% (${percentage}%)`;
        }
      }
    }
  },
  cutout: "65%"
};

export function DoughnutChart() {
  return <Doughnut data={data} options={options} />;
}
