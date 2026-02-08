
import React from 'react';
import { AlphaSignalReport, RevenuePlay } from '../types';

interface AlphaSignalReportProps {
    report: AlphaSignalReport;
    onDeployAgents: (play: RevenuePlay, sourceReportType: string) => void;
}

const Methodology: React.FC<{ models: string[] | undefined }> = ({ models }) => {
    if (!models || models.length === 0) return null;
    return (
        <div className="mt-8 pt-6 border-t border-slate-700">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Analytical Methodology</h4>
            <div className="flex flex-wrap gap-2">
                {models.map(model => (
                    <span key={model} className="text-xs text-slate-400 bg-slate-950/50 border border-slate-700 rounded px-2 py-0.5">{model}</span>
                ))}
            </div>
        </div>
    );
};

const RevenuePlayCard: React.FC<{ play: RevenuePlay, onDeploy: (play: RevenuePlay) => void }> = ({ play, onDeploy }) => {
    const score = play.probabilityOfSuccess?.score || 0;
    const probabilityColor = score > 75 
        ? 'text-green-400 border-green-500' 
        : score > 50
        ? 'text-yellow-400 border-yellow-500'
        : 'text-red-400 border-red-500';

    return (
        <div className="bg-slate-900/50 rounded-xl border border-slate-700 shadow-lg overflow-hidden">
            <div className="p-4 bg-slate-800/50 border-b border-slate-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">{play.playName}</h3>
                <button 
                    onClick={() => onDeploy(play)}
                    className="no-print bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md transition text-xs flex items-center space-x-2"
                    title="Deploy this play with the Sovereign Protocol AI C-Suite"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    <span>Deploy</span>
                </button>
            </div>
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-700">
                        <p className="text-xs text-slate-400 font-semibold uppercase">Probability</p>
                        <p className={`text-3xl font-bold ${probabilityColor}`}>{score}%</p>
                        <p className="text-xs text-slate-500 italic mt-1" title={play.probabilityOfSuccess?.rationale}>Based on quantitative analysis</p>
                    </div>
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-700">
                        <p className="text-xs text-slate-400 font-semibold uppercase">Potential Revenue</p>
                        <p className="text-3xl font-bold text-amber-300">{play.potentialRevenue}</p>
                    </div>
                </div>
                 {play.psychologicalEdge && (
                    <div>
                        <h4 className="font-semibold text-rose-300 text-sm mb-1">Psychological Edge</h4>
                        <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-700">
                            <p className="font-bold text-slate-200 text-xs">{play.psychologicalEdge.principle}</p>
                            <p className="text-slate-400 text-xs mt-1">{play.psychologicalEdge.application}</p>
                        </div>
                    </div>
                 )}
                {play.requiredAssets && (play.requiredAssets.length > 0) && (
                    <div>
                        <h4 className="font-semibold text-rose-300 text-sm mb-1">Required Assets</h4>
                        <div className="flex flex-wrap gap-2">
                            {(play.requiredAssets || []).map((asset, i) => (
                                <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{asset}</span>
                            ))}
                        </div>
                    </div>
                )}

                 {play.executionSteps && (play.executionSteps.length > 0) && (
                    <div className="pt-3 border-t border-slate-800">
                        <h4 className="font-semibold text-rose-300 text-sm mb-2">Execution Steps</h4>
                        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-2">
                            {(play.executionSteps || []).map((step, i) => <li key={i}>{step}</li>)}
                        </ol>
                    </div>
                 )}

                {play.aiAgentProtocol && (
                    <div className="pt-3 border-t border-slate-800">
                        <h4 className="font-semibold text-rose-300 text-sm mb-2">AI Agent Protocol</h4>
                         <div className="bg-slate-950/50 p-3 rounded-lg border border-purple-500/30">
                            <p className="text-purple-300 text-xs font-bold">Protocol:</p>
                            <p className="text-slate-300 text-xs mt-1">{play.aiAgentProtocol.protocol}</p>
                             <p className="text-purple-300 text-xs font-bold mt-2">Rationale:</p>
                            <p className="text-slate-400 text-xs mt-1 italic">{play.aiAgentProtocol.rationale}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const AlphaSignalReportComponent: React.FC<AlphaSignalReportProps> = ({ report, onDeployAgents }) => {
    if (!report) return null;
    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border-2 border-red-500/50 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                    ⚡ Alpha Signal Protocol
                </h2>
                <p className="text-slate-400 mt-2 mb-8">High-probability revenue plays generated by a Quantitative Dealmaker AI.</p>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-semibold text-red-300">Executive Summary</h3>
                    <p className="text-slate-300 text-sm mt-2">{report.executiveSummary}</p>
                </div>
            </div>
            
            <div className="mt-8 space-y-8">
                {(report.revenuePlays || []).map((play, index) => (
                    <RevenuePlayCard key={index} play={play} onDeploy={(p) => onDeployAgents(p, 'Alpha Signal Play')} />
                ))}
            </div>

            <Methodology models={report.methodology} />
        </div>
    );
};

export default AlphaSignalReportComponent;
