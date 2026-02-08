
import React, { useState } from 'react';
import { SovereignEngineReport } from '../types';

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };
    return (
        <button onClick={handleCopy} className="text-xs bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1 px-2 rounded-md transition">
            {copySuccess ? 'Copied!' : 'Copy'}
        </button>
    );
}


const SovereignEngineReportComponent: React.FC<{ report: SovereignEngineReport }> = ({ report }) => {
    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border-2 border-red-500/50 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                    🤖 Sovereign Engine Report
                </h2>
                <p className="text-slate-400 mt-2 mb-8">After-action report for your automated AI workflow.</p>
            </div>
            <div className="space-y-6">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="font-bold text-slate-300">Workflow Summary</h3>
                    <p className="text-sm text-slate-400 mt-1">{report.workflowSummary}</p>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="font-bold text-slate-300 mb-2">Execution Log</h3>
                    <div className="space-y-2">
                        {report.executionLog?.map(log => (
                            <div key={log.step} className="flex items-center text-sm">
                                <span className="text-xs font-mono bg-slate-700 text-slate-300 rounded-full h-5 w-5 flex items-center justify-center mr-3">{log.step}</span>
                                <span className="flex-grow text-slate-400">{log.action}</span>
                                <span className="text-xs font-semibold text-green-400">{log.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="font-bold text-slate-300 mb-2">Final Generated Assets</h3>
                    <div className="space-y-4">
                        {report.finalOutput?.map(asset => (
                            <div key={asset.assetName} className="relative bg-slate-950 p-3 rounded-lg border border-slate-800">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold text-cyan-300">{asset.assetName}</h4>
                                    <CopyButton text={asset.content} />
                                </div>
                                <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono max-h-60 overflow-y-auto">
                                    <code>{asset.content}</code>
                                </pre>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SovereignEngineReportComponent;
