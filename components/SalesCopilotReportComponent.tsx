
import React from 'react';
import { SalesCopilotResponse } from '../types';

interface SalesCopilotReportProps {
    report: SalesCopilotResponse;
}

const SalesCopilotReportComponent: React.FC<SalesCopilotReportProps> = ({ report }) => {
    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border-2 border-red-500/50 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                    🤝 AI Sales Co-pilot Response
                </h2>
                <p className="text-slate-400 mt-2 mb-8">Your real-time script for handling the sales objection.</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-red-500/50">
                <h3 className="font-bold text-red-300">Suggested Response</h3>
                <p className="text-slate-200 mt-2 whitespace-pre-wrap font-mono text-sm">{report.suggestedResponse}</p>
                <div className="mt-4 pt-4 border-t border-slate-700">
                    <h4 className="font-bold text-red-300 text-sm">Psychological Tactic</h4>
                    <p className="text-slate-400 text-xs mt-1">{report.psychologicalTactic}</p>
                </div>
            </div>
        </div>
    );
};

export default SalesCopilotReportComponent;
