
import React from 'react';
import { LiveMarketIntelReport } from '../types';
import AIEnhancementCard from './AIEnhancementCard';

interface LiveMarketIntelReportProps {
    report: LiveMarketIntelReport;
}

const safeRender = (content: any): React.ReactNode => {
    if (typeof content === 'string') return content;
    if (typeof content === 'number') return content;
    if (content === null || content === undefined) return <span className="text-slate-600 italic">N/A</span>;
    
    if (Array.isArray(content)) {
        return (
            <ul className="list-disc list-inside space-y-1">
                {content.map((item, i) => (
                    <li key={i} className="text-slate-300">{safeRender(item)}</li>
                ))}
            </ul>
        );
    }

    if (typeof content === 'object') {
        return (
            <div className="grid grid-cols-1 gap-2 bg-slate-900/40 p-2 rounded border border-slate-800 mt-2">
                {Object.entries(content).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:justify-between text-xs border-b border-slate-800/50 last:border-0 pb-1 last:pb-0">
                        <span className="font-semibold text-slate-500 uppercase tracking-wide text-[10px]">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-slate-300 font-mono text-right">{typeof value === 'object' ? '...' : String(value)}</span>
                    </div>
                ))}
            </div>
        );
    }
    return String(content);
};

const Methodology: React.FC<{ models: string[] | undefined }> = ({ models }) => {
    if (!models || models.length === 0) return null;
    return (
        <div className="mt-8 pt-6 border-t border-slate-800">
            <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3">Synthesis Protocols Applied</h4>
            <div className="flex flex-wrap gap-2">
                {models.map((model, i) => (
                    <span key={i} className="text-[10px] font-mono text-emerald-500 bg-emerald-950/30 border border-emerald-900/50 rounded px-2 py-1 uppercase tracking-wider">
                        {String(model)}
                    </span>
                ))}
            </div>
        </div>
    );
};

const SentimentGauge: React.FC<{ sentiment: string, rationale: string, quotes: string[] }> = ({ sentiment, rationale, quotes }) => {
    const isBullish = String(sentiment).toLowerCase().includes('bullish');
    const isBearish = String(sentiment).toLowerCase().includes('bearish');
    const color = isBullish ? 'text-emerald-400' : isBearish ? 'text-rose-400' : 'text-amber-400';
    const bgColor = isBullish ? 'bg-emerald-900/20 border-emerald-500/30' : isBearish ? 'bg-rose-900/20 border-rose-500/30' : 'bg-amber-900/20 border-amber-500/30';
    const icon = isBullish ? '▲' : isBearish ? '▼' : '●';

    return (
        <div className={`p-5 rounded-lg border ${bgColor} relative overflow-hidden`}>
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Market Sentiment Velocity</p>
                    <h3 className={`text-3xl font-black ${color} flex items-center gap-2 mt-1`}>
                        {icon} {safeRender(sentiment)}
                    </h3>
                </div>
                <div className="text-right">
                    <span className="text-[10px] bg-slate-900 px-2 py-1 rounded border border-slate-700 text-slate-400 font-mono text-emerald-400 animate-pulse">SEARCH GROUNDED</span>
                </div>
            </div>
            
            <div className="text-sm text-slate-300 font-medium leading-relaxed relative z-10">
                {safeRender(rationale)}
            </div>

            {quotes && quotes.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-800/50 relative z-10">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Key Market Chatter:</p>
                    <ul className="space-y-2">
                        {quotes.map((q, i) => (
                            <li key={i} className="text-xs text-slate-400 italic flex gap-2">
                                <span className="text-slate-600">"</span>
                                {safeRender(q)}
                                <span className="text-slate-600">"</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const LiveMarketIntelReportComponent: React.FC<LiveMarketIntelReportProps> = ({ report }) => {
    const reportTopic = report.topic || 'Global Market Analysis';

    return (
        <div className="max-w-6xl mx-auto bg-slate-950 rounded-xl border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in font-sans">
            
            {/* Header / Ticker */}
            <div className="border-b border-slate-800 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Live Intelligence Feed</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                        {safeRender(reportTopic)}
                    </h2>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Analyst System: Gemini 3 (Search Grounded)</p>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Timestamp: {new Date().toLocaleTimeString()}</p>
                </div>
            </div>

            {/* 10X ENHANCEMENT LAYER */}
            {report.aiEnhancement && (
                <div className="mb-12">
                    <AIEnhancementCard enhancement={report.aiEnhancement} />
                </div>
            )}

            {/* Executive Summary */}
            <div className="bg-slate-900/50 p-6 rounded-lg border-l-4 border-indigo-500 mb-8">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Executive Situation Report</h3>
                <div className="text-slate-200 text-sm md:text-base leading-relaxed font-medium">
                    {safeRender(report.executiveSummary)}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Sentiment & Competitors */}
                <div className="lg:col-span-1 space-y-8">
                    {report.marketSentiment && (
                        <SentimentGauge 
                            sentiment={report.marketSentiment.sentiment} 
                            rationale={report.marketSentiment.rationale} 
                            quotes={report.marketSentiment.keyQuotes} 
                        />
                    )}

                    {/* Competitor War Room */}
                    <div className="bg-slate-900/30 rounded-lg border border-slate-800 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
                                <span>♟️</span> Competitor Moves
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {(report.competitorMoves || []).map((move, i) => (
                                <div key={i} className="relative pl-4 border-l-2 border-slate-700">
                                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-slate-600"></div>
                                    <div className="font-bold text-white text-sm">{safeRender(move.company)}</div>
                                    <div className="text-xs text-slate-400 mt-1">{safeRender(move.action)}</div>
                                    <div className="mt-2 bg-slate-950 p-2 rounded border border-slate-800">
                                        <p className="text-[10px] text-indigo-400 font-bold uppercase mb-0.5">Strategic Implication</p>
                                        <p className="text-xs text-indigo-200 leading-snug">{safeRender(move.implication)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Latest Developments Feed */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-900/30 rounded-lg border border-slate-800 p-6 h-full">
                        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span>📡</span> Intel Stream: Latest Developments
                        </h3>
                        
                        <div className="relative border-l border-slate-700 ml-3 space-y-8">
                            {(report.latestDevelopments || []).map((dev, i) => (
                                <div key={i} className="relative pl-8">
                                    {/* Timeline Node */}
                                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-900 border-2 border-indigo-500"></div>
                                    
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                                        <h4 className="font-bold text-slate-100 text-base">{safeRender(dev.headline)}</h4>
                                        <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 whitespace-nowrap mt-1 sm:mt-0">
                                            {safeRender(dev.date)}
                                        </span>
                                    </div>
                                    
                                    <div className="text-xs text-slate-500 mb-2 font-mono uppercase tracking-wide">
                                        Source: {safeRender(dev.source)}
                                    </div>
                                    
                                    <div className="text-sm text-slate-300 mb-3 leading-relaxed">
                                        {safeRender(dev.summary)}
                                    </div>
                                    
                                    <div className="bg-indigo-900/10 border-l-2 border-indigo-500 p-3 rounded-r-md">
                                        <p className="text-[10px] font-bold text-indigo-400 uppercase mb-1">Impact Analysis Formula</p>
                                        <p className="text-xs text-indigo-100 font-medium leading-relaxed">{safeRender(dev.impactAnalysis)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sources Footer */}
            <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Verified Grounding Sources</h3>
                    <ul className="text-xs text-blue-400 space-y-1 font-mono">
                        {(report.sources || []).map((source, i) => (
                            <li key={i} className="truncate">
                                <a href={source.uri} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
                                    <span>🔗</span> {source.title || source.uri}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <Methodology models={report.methodology} />
                </div>
            </div>
        </div>
    );
};

export default LiveMarketIntelReportComponent;
