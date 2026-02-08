
import React, { useState } from 'react';
import { LoneWolfReport, LoneWolfPlay } from '../types';

interface LoneWolfReportProps {
    report: LoneWolfReport;
    onDeployAgents: (play: LoneWolfPlay, sourceReportType: string) => void;
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

const LoneWolfPlayCard: React.FC<{ play: LoneWolfPlay, onDeploy: (play: LoneWolfPlay) => void }> = ({ play, onDeploy }) => {
    const [isDeployed, setIsDeployed] = useState(false);

    const handleDeploy = () => {
        setIsDeployed(true);
        onDeploy(play);
    }

    return (
        <div className="bg-slate-900/50 rounded-xl border border-slate-700 shadow-lg overflow-hidden flex flex-col h-full">
            <div className="p-4 bg-slate-800/50 border-b border-slate-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">{play.playName}</h3>
            </div>
            <div className="p-4 space-y-4 flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-700">
                        <p className="text-xs text-slate-400 font-semibold uppercase">Income Potential</p>
                        <p className="text-xl font-bold text-green-400">{play.incomePotential}</p>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                        <p className="text-xs text-slate-400 font-semibold uppercase">Time to Cash</p>
                        <p className="text-xl font-bold text-amber-300">{play.timeToFirstCash}</p>
                    </div>
                </div>
                 {play.gatekeeperBypassTactic && (
                    <div>
                        <h4 className="font-semibold text-orange-300 text-sm mb-2 flex items-center gap-2">
                            <span className="text-lg">🔑</span> Gatekeeper Bypass
                        </h4>
                        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                            <p className="font-bold text-slate-200 text-xs">{play.gatekeeperBypassTactic.tactic}</p>
                            <p className="text-slate-400 text-xs mt-1 italic">{play.gatekeeperBypassTactic.rationale}</p>
                        </div>
                    </div>
                 )}
                {play.requiredAssets && (play.requiredAssets.length > 0) && (
                    <div>
                        <h4 className="font-semibold text-orange-300 text-sm mb-2">Required Assets</h4>
                        <div className="flex flex-wrap gap-2">
                            {(play.requiredAssets || []).map((asset, i) => (
                                <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full border border-slate-600">{asset}</span>
                            ))}
                        </div>
                    </div>
                )}

                 {play.executionSteps && (play.executionSteps.length > 0) && (
                    <div className="pt-3 border-t border-slate-800">
                        <h4 className="font-semibold text-orange-300 text-sm mb-3">Tactical Execution Sequence</h4>
                        <div className="space-y-3">
                            {(play.executionSteps || []).map((step, i) => (
                                <div key={i} className="flex gap-3 text-xs text-slate-300">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-orange-400">
                                        {i + 1}
                                    </div>
                                    <p className="leading-relaxed pt-0.5">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                 )}

                {play.aiAgentProtocol && (
                    <div className="pt-3 border-t border-slate-800">
                        <h4 className="font-semibold text-orange-300 text-sm mb-2">AI Agent Protocol</h4>
                         <div className="bg-slate-950/50 p-3 rounded-lg border border-purple-500/30">
                            <p className="text-purple-300 text-xs font-bold">Directive:</p>
                            <p className="text-slate-300 text-xs mt-1">{play.aiAgentProtocol.protocol}</p>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="p-4 bg-slate-800/30 border-t border-slate-700 text-center no-print">
                <button 
                    onClick={handleDeploy}
                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-3 px-4 rounded-lg transition shadow-lg flex items-center justify-center gap-2 group"
                >
                    <span className="text-xl group-hover:scale-110 transition-transform">🐺</span>
                    <span>{isDeployed ? 'Deploying...' : 'Deploy Sovereign Agents'}</span>
                </button>
                <p className="text-[10px] text-slate-500 mt-2">Spins up autonomous agents in Command Center to execute this play.</p>
            </div>
        </div>
    );
}

const LoneWolfReportComponent: React.FC<LoneWolfReportProps> = ({ report, onDeployAgents }) => {
    return (
        <div className="max-w-7xl mx-auto bg-slate-800/70 rounded-xl border-2 border-orange-500/50 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                    🐺 Lone Wolf Dealmaker Protocol
                </h2>
                <p className="text-slate-400 mt-2 mb-8">Information Arbitrage & High-Value Intermediary Plays ($100k+/mo Potential).</p>
                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 text-left mb-8">
                    <h3 className="text-lg font-semibold text-orange-300 mb-2">Executive Summary</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{report.executiveSummary}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {(report.loneWolfPlays || []).map((play, index) => (
                    <LoneWolfPlayCard key={index} play={play} onDeploy={(p) => onDeployAgents(p, `Lone Wolf: ${p.playName}`)} />
                ))}
            </div>

            <Methodology models={report.methodology} />
        </div>
    );
};

export default LoneWolfReportComponent;
