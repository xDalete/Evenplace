"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type LocationBarChartProps = {
  className?: string;
};

type LocationData = {
  city: string;
  inscritos: number;
};
// SUBSTITUIR POR DADOS REAIS VINDOS DA API
const mockData: LocationData[] = [
  { city: "Belo Horizonte", inscritos: 853 },
  { city: "Uberlândia", inscritos: 743 },
  { city: "Contagem", inscritos: 763 },
  { city: "Juiz de Fora", inscritos: 934 },
  { city: "Betim", inscritos: 783 },
  { city: "Montes Claros", inscritos: 643 },
  { city: "Ribeirão das Neves", inscritos: 687 },
  { city: "Uberaba", inscritos: 936 },
  { city: "Governador Valadares", inscritos: 573 },
  { city: "Ipatinga", inscritos: 345 }
];

type CustomTooltipProps = {
  active?: boolean;
  payload?: { value: number; payload: LocationData }[];
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;

  return (
    <div
      style={{
        background: "white",
        borderRadius: 8,
        padding: "6px 10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        fontSize: 12
      }}
    >
      <div>
        <strong>{data.city}</strong>
      </div>
      <div>{data.inscritos} inscritos</div>
    </div>
  );
};

const LocationBarChart: React.FC<LocationBarChartProps> = ({ className }) => {
  return (
    <div 
      className={className} 
      style={{ 
        width: "100%", 
        height: 300,
        minWidth: 0,
        minHeight: 0
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={mockData} 
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="city" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="inscritos" radius={[8, 8, 0, 0]} fill="#5046FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LocationBarChart;