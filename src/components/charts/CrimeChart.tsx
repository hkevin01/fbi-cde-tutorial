"use client";

import { formatNumber } from '@/lib/utils';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface CrimeData {
  year: number;
  state: string;
  violentCrime: number;
  propertyCrime: number;
  population: number;
}

interface CrimeChartProps {
  data: CrimeData[];
  type?: 'line' | 'bar';
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
        <p className="font-semibold text-gray-800 mb-2">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {`${entry.dataKey === 'violentCrime' ? 'Violent Crime' : 'Property Crime'}: ${formatNumber(entry.value)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const CrimeChart: React.FC<CrimeChartProps> = ({ data, type = 'line' }) => {
  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="state"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="violentCrime"
            name="Violent Crime"
            fill="#dc2626"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="propertyCrime"
            name="Property Crime"
            fill="#2563eb"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="state"
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="violentCrime"
          name="Violent Crime"
          stroke="#dc2626"
          strokeWidth={3}
          dot={{ fill: '#dc2626', strokeWidth: 2, r: 6 }}
          activeDot={{ r: 8, stroke: '#dc2626', strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="propertyCrime"
          name="Property Crime"
          stroke="#2563eb"
          strokeWidth={3}
          dot={{ fill: '#2563eb', strokeWidth: 2, r: 6 }}
          activeDot={{ r: 8, stroke: '#2563eb', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
