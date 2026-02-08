import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { MarketOpportunityChart } from '../types';

interface MarketDataChartProps {
    data: MarketOpportunityChart;
}

const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
    return `$${value}`;
};

const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-800 border border-slate-700 p-3 rounded-md text-sm shadow-lg">
                <p className="label font-bold text-slate-100 mb-2">{label}</p>
                {payload.map((pld: any) => (
                    <p key={pld.dataKey} style={{ color: pld.color }}>
                        {pld.name}: {
                            pld.dataKey === 'medianPrice' ? formatCurrency(pld.value) :
                            pld.dataKey === 'foreclosureRate' ? formatPercentage(pld.value) :
                            pld.value.toFixed(2)
                        }
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const MarketDataChart: React.FC<MarketDataChartProps> = ({ data }) => {
    if (!data || !data.data || data.data.length === 0) {
        return <div className="text-slate-500 text-center p-8">No market data available to display.</div>
    }

    return (
        <div className="w-full h-96">
            <h4 className="font-bold text-yellow-300 text-center mb-4">{data.title}</h4>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="county" stroke="#9ca3af" fontSize={12} tick={{ fill: '#d1d5db' }} />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" fontSize={12} tick={{ fill: '#d1d5db' }} tickFormatter={formatCurrency} />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" fontSize={12} tick={{ fill: '#d1d5db' }} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1f2937' }} />
                    <Legend wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }} />
                    <Bar yAxisId="left" dataKey="medianPrice" name="Median Price" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="leverageScore" name="Leverage Score" fill="#82ca9d" />
                    <Bar yAxisId="right" dataKey="foreclosureRate" name="Foreclosure Rate (%)" fill="#ffc658" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MarketDataChart;
