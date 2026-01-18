"use client";
import { ArcElement, Chart as ChartJS, ChartOptions, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
      borderColor: "rgba(128,128,128, 0.1)",
      borderWidth: 4,
      data: [45, 30, 15, 7, 3],
      hoverOffset: 12,
      label: "Traffic Share"
    }
  ],
  labels: ["Desktop", "Mobile", "Tablet", "Smart TV", "Others"]
};

const options: ChartOptions<"doughnut"> = {
  cutout: "65%",
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: {
          size: 14
        },
        padding: 20,
        pointStyle: "circle",
        usePointStyle: true
      },
      position: "bottom" as const
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
  responsive: true
};

export function DoughnutChart() {
  return <Doughnut data={data} options={options} />;
}
