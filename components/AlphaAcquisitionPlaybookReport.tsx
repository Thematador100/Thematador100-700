
import React from 'react';
import { AlphaAcquisitionPlaybook } from '../types';

interface AlphaAcquisitionPlaybookReportProps {
    playbook: AlphaAcquisitionPlaybook;
}

const AlphaAcquisitionPlaybookReport: React.FC<AlphaAcquisitionPlaybookReportProps> = ({ playbook }) => {
    if (!playbook || !playbook.channelPartnershipProtocol) return null;

    return (
        <div className="mt-12 bg-slate-900 rounded-xl border-2 border-red-500/50 shadow-2xl p-6 animate-fade-in">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                    ⚡ Alpha Acquisition Protocol
                </h2>
                <p className="text-slate-400 mt-2">Elite lead generation and partnership scaling strategy.</p>
            </div>

            <div className="space-y-10">
                {/* Channel Partnership Protocol */}
                <div>
                    <h3 className="text-xl font-semibold text-rose-400 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🤝</span> Part 1: Asymmetric Partnerships
                    </h3>
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 space-y-6">
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Ideal Partner Profile (Watering Holes)</h4>
                            <p className="text-slate-200 text-lg font-semibold">{playbook.channelPartnershipProtocol.idealPartnerProfile}</p>
                        </div>
                         <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">AI-Powered Prospecting Queries</h4>
                            <div className="space-y-2 mt-3">
                                {playbook.channelPartnershipProtocol.aiPoweredSearchQueries?.map((query, i) => (
                                    <div key={i} className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs text-blue-300">
                                        <code>{query}</code>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">The Irresistible Partnership Offer</h4>
                             <blockquote className="mt-3 border-l-4 border-red-500 pl-4 italic text-slate-300 bg-slate-900/50 p-4 rounded-r-lg">
                                "{playbook.channelPartnershipProtocol.irresistiblePartnershipOffer}"
                            </blockquote>
                        </div>
                    </div>
                </div>

                {/* Buying Trigger Protocol */}
                 <div>
                    <h3 className="text-xl font-semibold text-rose-400 mb-4 flex items-center gap-2">
                        <span className="text-2xl">📡</span> Part 2: Buying Trigger Signals
                    </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {playbook.buyingTriggerProtocol?.map((trigger, i) => (
                             <div key={i} className="bg-slate-800/70 p-5 rounded-lg border border-slate-700 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-red-900/40 text-red-400 text-[10px] font-bold px-2 py-1 rounded uppercase">Signal {i+1}</span>
                                    <span className="text-2xl">📶</span>
                                </div>
                                <h4 className="font-bold text-slate-100 text-lg mb-2">{trigger.triggerEvent}</h4>
                                <div className="space-y-4 flex-grow">
                                    <div className="bg-slate-950/50 p-3 rounded border border-slate-800">
                                        <h5 className="text-[10px] font-bold text-slate-500 uppercase mb-1">Signal Intelligence</h5>
                                        <p className="text-xs text-slate-300">{trigger.signalIntelligence}</p>
                                    </div>
                                     <div className="bg-slate-950/50 p-3 rounded border border-slate-800">
                                        <h5 className="text-[10px] font-bold text-slate-500 uppercase mb-1">Strategic Approach</h5>
                                        <p className="text-xs text-slate-400 italic">"{trigger.strategicApproach}"</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>

                <div className="pt-8 border-t border-slate-800 text-center">
                    <p className="text-xs text-slate-500">Execute these protocols to bridge the gap between "Insight" and "Income".</p>
                </div>
            </div>
        </div>
    );
};

export default AlphaAcquisitionPlaybookReport;
