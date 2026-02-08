
import React from 'react';
import { MarketMap } from '../types';

interface MarketMapReportProps {
    report: MarketMap;
}

const Methodology: React.FC<{ models: string[] | undefined }> = ({ models }) => {
    if (!models || models.length === 0) return null;
    return (
        <div className="mt-6 pt-4 border-t border-slate-700">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Analytical Methodology</h4>
            <div className="flex flex-wrap gap-2">
                {models.map(model => (
                    <span key={model} className="text-xs text-slate-400 bg-slate-950/50 border border-slate-700 rounded px-2 py-0.5">{model}</span>
                ))}
            </div>
        </div>
    );
};

const MarketMapReport: React.FC<MarketMapReportProps> = ({ report }) => {
    return (
        <div className="mt-12 max-w-6xl mx-auto bg-slate-800/70 rounded-xl border-2 border-cyan-500/50 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    🗺️ Market Intelligence Map
                </h2>
                <p className="text-slate-400 mt-2 mb-8">A comprehensive, AI-generated overview of the entire market landscape.</p>
                 <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 text-left">
                    <h3 className="text-lg font-semibold text-cyan-300">Executive Summary</h3>
                    <p className="text-slate-300 text-sm mt-2">{report.executiveSummary}</p>
                </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Key Players */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-200 text-center">Key Players</h3>
                    {report.keyPlayers.map((player, i) => (
                        player ? (
                            <div key={player.name || i} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-blue-300">{player.name}</h4>
                                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full font-semibold">{player.marketPosition}</span>
                                </div>
                                <p className="text-slate-400 text-xs mt-1">{player.summary}</p>
                            </div>
                        ) : null
                    ))}
                </div>

                {/* Audience Segments */}
                 <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-200 text-center">Audience Segments</h3>
                    {report.audienceSegments.map((segment, i) => (
                        segment ? (
                             <div key={segment.name || i} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-blue-300">{segment.name}</h4>
                                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full font-semibold">{segment.sizeEstimate}</span>
                                </div>
                                <p className="text-slate-400 text-xs mt-1">{segment.description}</p>
                            </div>
                        ) : null
                    ))}
                </div>

                {/* Whitespace Opportunities */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-200 text-center">Whitespace Opportunities</h3>
                    {report.whitespaceOpportunities.map((opp, i) => (
                        opp ? (
                             <div key={opp.opportunityName || i} className="bg-slate-900/50 p-4 rounded-lg border-2 border-dashed border-green-500/50">
                                <h4 className="font-bold text-green-300">{opp.opportunityName}</h4>
                                <p className="text-slate-300 text-xs mt-1">{opp.description}</p>
                                <div className="mt-3 pt-3 border-t border-slate-700">
                                    <p className="text-xs text-slate-400 uppercase font-semibold">Strategic Angle:</p>
                                    <p className="text-slate-300 text-xs mt-1 italic">"{opp.strategicAngle}"</p>
                                </div>
                            </div>
                        ) : null
                    ))}
                </div>
            </div>

            <Methodology models={report.methodology} />
        </div>
    );
};

export default MarketMapReport;
