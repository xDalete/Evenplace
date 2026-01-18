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
  payload?: { payload: LocationData; value: number; }[];
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;

  return (
    <div
      style={{
        background: "white",
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        fontSize: 12,
        padding: "6px 10px"
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
        height: 300,
        minHeight: 0,
        minWidth: 0,
        width: "100%"
      }}
    >
      <ResponsiveContainer height="100%" width="100%">
        <BarChart data={mockData} margin={{ bottom: 10, left: 0, right: 10, top: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis angle={-45} dataKey="city" height={80} textAnchor="end" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="inscritos" fill="#5046FF" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LocationBarChart;
