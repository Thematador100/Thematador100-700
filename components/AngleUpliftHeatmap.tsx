"use client";

import React from 'react';
import { AngleUpliftCell } from '../types';

interface AngleUpliftHeatmapProps {
    data: AngleUpliftCell[];
}

const AngleUpliftHeatmap: React.FC<AngleUpliftHeatmapProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="h-full grid place-items-center text-sm text-slate-500">No heatmap data available</div>;
  }
  
  const angles = Array.from(new Set(data.map(d => d.angle)));
  const segments = Array.from(new Set(data.map(d => d.segment)));
  const maxUplift = Math.max(...data.map(d => d.uplift));
  const minUplift = Math.min(...data.map(d => d.uplift));

  const colorScale = (value: number) => {
    // Normalize value from [min, max] to [0, 1]
    const t = (value - minUplift) / (maxUplift - minUplift || 1);
    
    // Diverging color scale: Red -> Yellow -> Green
    const r = Math.round(Math.max(0, 255 * (1 - t * 2)));
    const g = Math.round(Math.max(0, 255 * (t * 2 - 1)));
    const b = 50;
    
    // Middle range (around 0) is yellowish
    const midR = 251;
    const midG = 191;
    const midB = 36;
    
    if (t > 0.4 && t < 0.6) {
        return `rgba(${midR}, ${midG}, ${midB}, 0.7)`;
    }
    
    return `rgba(${r}, ${g}, ${b}, 0.7)`;
  };
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 p-4">
        <div className="grid gap-1.5 w-full h-full heatmap-grid" style={{gridTemplateColumns: `minmax(60px, 1fr) repeat(${angles.length}, minmax(0, 2fr))`}}>
            {/* Header row */}
            <div />
            {angles.map(a => <div key={a} className="text-xs font-semibold text-center truncate self-end" title={a}>{a}</div>)}
            
            {/* Data rows */}
            {segments.map(s => (
                <React.Fragment key={s}>
                    <div className="text-xs font-semibold text-right pr-2 self-center truncate" title={s}>{s}</div>
                    {angles.map(a => {
                        const cell = data.find(d => d.segment === s && d.angle === a);
                        const value = cell ? cell.uplift : 0;
                        return (
                            <div 
                                key={a}
                                className="w-full h-full rounded-md flex items-center justify-center text-xs font-bold text-white relative group"
                                style={{ backgroundColor: colorScale(value) }}
                            >
                                {value.toFixed(2)}
                                <div className="absolute hidden group-hover:block bottom-full left-1/2 z-10 p-1 mb-1 -translate-x-1/2 text-xs font-normal text-slate-200 bg-slate-900 rounded-md shadow-lg border border-slate-700 whitespace-nowrap">
                                    {s} / {a}: {value.toFixed(2)}
                                </div>
                            </div>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    </div>
  );
}

export default AngleUpliftHeatmap;