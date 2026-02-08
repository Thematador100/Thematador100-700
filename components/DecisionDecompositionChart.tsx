import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface ChartData {
    label: string;
    value: number;
}

interface DecisionDecompositionChartProps {
    data: ChartData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-800 border border-slate-700 p-2 rounded-md text-sm">
                <p className="label text-slate-300">{`${label} : ${payload[0].value.toFixed(2)}`}</p>
            </div>
        );
    }
    return null;
};


const DecisionDecompositionChart: React.FC<DecisionDecompositionChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart 
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis type="number" stroke="#9ca3af" fontSize={12} />
        <YAxis 
            type="category" 
            dataKey="label" 
            stroke="#9ca3af" 
            fontSize={12} 
            width={80} 
            tick={{ fill: '#d1d5db' }}
            interval={0}
        />
        <Tooltip content={<CustomTooltip />} cursor={{fill: '#1f2937'}} />
        <Bar dataKey="value" fill="#fbbf24" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DecisionDecompositionChart;