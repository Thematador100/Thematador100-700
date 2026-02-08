
import React from 'react';
import { ChimericAgentReport, HighStakesSolution } from '../types';

interface ChimericAgentReportProps {
    report: ChimericAgentReport;
    onDeployAgents: (solution: HighStakesSolution, sourceReportType: string) => void;
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

const HighStakesSolutionCard: React.FC<{ solution: HighStakesSolution, onDeploy: (solution: HighStakesSolution) => void }> = ({ solution, onDeploy }) => {
    return (
        <div className="bg-slate-900/50 rounded-xl border border-slate-700 shadow-lg overflow-hidden">
            <div className="p-4 bg-slate-800/50 border-b border-slate-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">{solution.solutionName}</h3>
                <button 
                    onClick={() => onDeploy(solution)}
                    className="no-print bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md transition text-xs flex items-center space-x-2"
                    title="Deploy this solution with the Sovereign Protocol AI C-Suite"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    <span>Deploy</span>
                </button>
            </div>
            <div className="p-4 space-y-4">
                <div>
                    <h4 className="font-semibold text-pink-300 text-sm mb-1">Problem Domain</h4>
                    <p className="text-slate-300 text-sm">{solution.problemDomain}</p>
                </div>

                <div>
                    <h4 className="font-semibold text-pink-300 text-sm mb-1">AI Leverage Point</h4>
                     <p className="text-slate-400 text-xs italic">{solution.aiLeveragePoint}</p>
                </div>
                
                 <div>
                    <h4 className="font-semibold text-pink-300 text-sm mb-1">Monetization Model</h4>
                    <p className="text-amber-300 font-bold text-sm bg-slate-950 p-2 rounded">{solution.monetizationModel}</p>
                </div>

                {solution.firstTouchProtocol && (
                    <div className="pt-3 border-t border-slate-800">
                        <h4 className="font-semibold text-pink-300 text-sm mb-2">First Touch Protocol (The Wedge)</h4>
                         <div className="bg-slate-950/50 p-3 rounded-lg border border-purple-500/30">
                            <p className="text-purple-300 text-xs font-bold">Wedge:</p>
                            <p className="text-slate-300 text-xs mt-1">{solution.firstTouchProtocol.wedge}</p>
                             <p className="text-purple-300 text-xs font-bold mt-2">Rationale:</p>
                            <p className="text-slate-400 text-xs mt-1 italic">{solution.firstTouchProtocol.rationale}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const ChimericAgentReportComponent: React.FC<ChimericAgentReportProps> = ({ report, onDeployAgents }) => {
    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border-2 border-fuchsia-500/50 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-400">
                    🧬 Chimeric Agent Protocol
                </h2>
                <p className="text-slate-400 mt-2 mb-8">An apex-level synthesis of a high-value subject, yielding hyper-personalized strategic solutions.</p>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-semibold text-fuchsia-300">Subject Synthesis</h3>
                    <p className="text-slate-300 text-sm mt-2">{report.subjectSynthesis}</p>
                </div>
            </div>
            
            <div className="mt-8 space-y-8">
                <h3 className="text-2xl font-bold text-slate-100 text-center">High-Stakes Solutions Portfolio</h3>
                {(report.highStakesSolutions || []).map((solution, index) => (
                    <HighStakesSolutionCard key={index} solution={solution} onDeploy={(s) => onDeployAgents(s, 'Chimeric Agent Solution')} />
                ))}
            </div>

            <Methodology models={report.methodology} />
        </div>
    );
};

export default ChimericAgentReportComponent;
