"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

type LineChartData = {
  month: string;
  value: number;
  percentage: string;
};

type LineChartProps = {
  data: LineChartData[];
  className?: string;
};

const CustomTooltip: React.FC<{ active?: boolean; payload?: any[] }> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "var(--bg-light)",
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid var(--border-muted)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}
      >
        <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>
          {data.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </p>
        <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "var(--text-muted)" }}>
          {data.percentage}
        </p>
      </div>
    );
  }
  return null;
};

export const LineChartComponent: React.FC<LineChartProps> = ({ data, className }) => {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "300px",
        minWidth: 0,
        minHeight: 0
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-muted)" />
          <XAxis
            dataKey="month"
            stroke="var(--text-muted)"
            style={{ fontSize: "12px" }}
            tick={{ fill: "var(--text-muted)" }}
          />
          <YAxis
            stroke="var(--text-muted)"
            style={{ fontSize: "12px" }}
            tick={{ fill: "var(--text-muted)" }}
            tickFormatter={value => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--primary)"
            strokeWidth={3}
            dot={{ fill: "var(--primary)", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

