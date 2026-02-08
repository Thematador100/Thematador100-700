
import React from 'react';
import { DemandSignalReport } from '../types';

interface DemandSignalReportProps {
    report: DemandSignalReport;
}

// Utility to safely render content
const safeRender = (content: any): React.ReactNode => {
    if (typeof content === 'string') return content;
    if (typeof content === 'number') return content;
    if (!content) return null;
    
    if (typeof content === 'object') {
        return (
            <div className="text-xs text-slate-400 font-mono mt-1">
                {JSON.stringify(content).slice(0, 100)}...
            </div>
        );
    }
    return String(content);
};

const safeArray = (arr: any) => Array.isArray(arr) ? arr : [];

const Methodology: React.FC<{ models: string[] | undefined }> = ({ models }) => {
    const safeModels = safeArray(models);
    if (safeModels.length === 0) return null;
    return (
        <div className="mt-8 pt-6 border-t border-slate-700">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Analytical Methodology</h4>
            <div className="flex flex-wrap gap-2">
                {safeModels.map((model: any, i: number) => (
                    <span key={i} className="text-xs text-slate-400 bg-slate-950/50 border border-slate-700 rounded px-2 py-0.5">{safeRender(model)}</span>
                ))}
            </div>
        </div>
    );
};

const ScoreGauge: React.FC<{ score: number; rationale: string }> = ({ score, rationale }) => {
    // Ensure score is a number
    const safeScore = typeof score === 'number' ? score : parseInt(score) || 0;
    
    const color = safeScore > 75 ? 'text-green-400' : safeScore > 50 ? 'text-yellow-400' : 'text-red-400';
    const borderColor = safeScore > 75 ? 'border-green-500' : safeScore > 50 ? 'border-yellow-500' : 'border-red-500';
    
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-lg border border-slate-700 text-center">
            <div className={`w-32 h-32 rounded-full border-4 ${borderColor} flex items-center justify-center mb-4 bg-slate-950 shadow-[0_0_20px_rgba(0,0,0,0.3)]`}>
                <span className={`text-4xl font-bold ${color}`}>{safeScore}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-200">Buying Probability Score</h3>
            <p className="text-xs text-slate-400 mt-2 max-w-sm">{safeRender(rationale)}</p>
        </div>
    );
};

export const DemandSignalReportComponent: React.FC<DemandSignalReportProps> = ({ report }) => {
    // Defensive check if report itself is somehow malformed
    if (!report) return null;

    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border-2 border-teal-500/50 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                    📡 Predictive Demand Signal
                </h2>
                <p className="text-slate-400 mt-2">Quantitative analysis of intent for <span className="font-bold text-slate-200">{safeRender(report.targetAudience)}</span>.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ScoreGauge score={report.buyingProbabilityScore} rationale={report.scoreRationale} />
                
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-teal-300">Intent Decay Timeline</h3>
                    <div className="space-y-3">
                        {safeArray(report.intentDecayTimeline).map((item: any, i: number) => (
                            <div key={i} className="flex items-center text-xs bg-slate-900/50 p-3 rounded border border-slate-700">
                                <div className="w-24 font-bold text-slate-300">{safeRender(item.phase)}</div>
                                <div className="flex-grow px-3 border-l border-slate-700">
                                    <p className="text-slate-200">{safeRender(item.action)}</p>
                                    <p className="text-red-400 mt-1 font-mono">{safeRender(item.probabilityDrop)}</p>
                                </div>
                            </div>
                        ))}
                        {safeArray(report.intentDecayTimeline).length === 0 && (
                            <p className="text-xs text-slate-500 italic">No timeline data generated.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-200 mb-4">Leading Indicators (The "Alpha")</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {safeArray(report.leadingIndicators).map((indicator: any, i: number) => (
                        <div key={i} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-2xl">⚡</span>
                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${indicator.predictiveWeight === 'High' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                                    {safeRender(indicator.predictiveWeight)} Impact
                                </span>
                            </div>
                            <h4 className="font-bold text-slate-200 text-sm">{safeRender(indicator.signal)}</h4>
                            <p className="text-xs text-slate-400 mt-2">{safeRender(indicator.rationale)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 bg-teal-900/20 p-6 rounded-lg border border-teal-500/30">
                <h3 className="text-xl font-bold text-teal-300 mb-2">💰 Engineering as Marketing Channels</h3>
                <p className="text-sm text-slate-400 mb-6">Target these aggregators with a free tool or resource to instantly access their audience.</p>
                <div className="grid grid-cols-1 gap-4">
                    {safeArray(report.signalSources).map((source: any, i: number) => (
                        <div key={i} className="bg-slate-900/60 p-4 rounded-lg border border-slate-800 hover:border-teal-500/50 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-bold text-slate-100">{safeRender(source.name)}</h4>
                                    <span className="text-xs bg-slate-700 text-teal-300 px-2 py-0.5 rounded-full mt-1 inline-block">{safeRender(source.type)}</span>
                                </div>
                                <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-700">
                                    Est. Reach: {safeRender(source.reachEstimate)}
                                </span>
                            </div>
                            
                            <div className="bg-slate-950/50 p-3 rounded border-l-2 border-teal-500">
                                <p className="text-[10px] uppercase font-bold text-teal-500 mb-1">Engineering as Marketing Play</p>
                                <p className="text-sm text-slate-300 italic">"{safeRender(source.engineeringAsMarketingPlay)}"</p>
                            </div>

                            <div className="mt-3 flex justify-end">
                                <button 
                                    onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(String(source.name))}`, '_blank')}
                                    className="text-xs bg-slate-700 hover:bg-teal-600 text-white px-3 py-1.5 rounded transition flex items-center gap-2"
                                >
                                    <span>Find Contact Info</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Methodology models={report.methodology} />
        </div>
    );
};
