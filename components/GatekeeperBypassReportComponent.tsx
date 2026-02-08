
import React, { useState } from 'react';
import { GatekeeperBypassReport } from '../types';

interface GatekeeperBypassReportProps {
    report: GatekeeperBypassReport;
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

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };
    return (
        <button onClick={handleCopy} className="text-xs bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1 px-2 rounded-md transition ml-auto">
            {copySuccess ? 'Copied!' : 'Copy Script'}
        </button>
    );
}

const GatekeeperBypassReportComponent: React.FC<GatekeeperBypassReportProps> = ({ report }) => {
    // Check if new schema exists
    const isNewSchema = !!report.jvAssetMap;

    if (!isNewSchema) {
        // Fallback for old reports if any exist in state
        return (
            <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border border-red-500/50 p-6 text-center">
                <p className="text-slate-300">Legacy report format detected. Please regenerate this report to use the new JV Protocol.</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto bg-slate-800/70 rounded-xl border-2 border-indigo-500/50 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="text-center mb-10">
                 <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
                    🤝 JV & Asset Leverage Protocol
                </h2>
                <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
                    A blueprint for finding "Distressed" lists and "Natural Fit" partners to generate immediate 6-figure windfalls without ad spend.
                </p>
            </div>
            
            <div className="space-y-8">
                {/* Asset Map Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700">
                        <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
                            <span>⬆️</span> Upstream Partners (The "Before")
                        </h3>
                        <p className="text-xs text-slate-400 mb-4">Businesses that hold the credit card data <em>before</em> the customer needs your solution.</p>
                        <div className="space-y-3">
                            {report.jvAssetMap.upstreamPartners.map((p, i) => (
                                <div key={i} className="bg-slate-950 p-3 rounded border border-slate-800">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-semibold text-slate-200 text-sm">{p.businessType}</h4>
                                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{p.estimatedListSize}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1 italic">{p.whyTheyHaveTheBuyers}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700">
                        <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
                            <span>⬇️</span> Downstream Partners (The "After")
                        </h3>
                        <p className="text-xs text-slate-400 mb-4">Businesses that need your customer <em>after</em> you are done with them (or vice versa).</p>
                        <div className="space-y-3">
                            {report.jvAssetMap.downstreamPartners.map((p, i) => (
                                <div key={i} className="bg-slate-900 p-3 rounded border border-slate-800">
                                    <h4 className="font-semibold text-slate-200 text-sm">{p.businessType}</h4>
                                    <div className="mt-2 text-xs text-green-400 font-semibold bg-green-900/10 p-1.5 rounded border border-green-900/30">
                                        Gap: {p.monetizationGap}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Distress Radar */}
                <div className="bg-red-900/10 border border-red-500/30 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-red-400 mb-2 flex items-center gap-2">
                        <span>🚨</span> The Distress Radar
                    </h3>
                    <p className="text-sm text-slate-300 mb-4">Identify partners who are bleeding cash. They are 10x more likely to accept a rev-share deal to save their business.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {report.distressRadar.signals.map((s, i) => (
                            <div key={i} className="bg-slate-900/80 p-4 rounded-lg border border-red-500/20 hover:border-red-500/50 transition-colors">
                                <h4 className="font-bold text-slate-200 text-sm">{s.signal}</h4>
                                <p className="text-xs text-slate-400 mt-2 mb-2">{s.interpretation}</p>
                                <div className="mt-auto pt-2 border-t border-slate-800">
                                    <p className="text-[10px] text-red-300 font-mono uppercase">How to find:</p>
                                    <p className="text-[10px] text-slate-400">{s.findingMethod}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* The Godfather Proposal */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-yellow-500/30 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                                The Godfather Proposal
                            </h3>
                            <p className="text-xs text-amber-200/60 uppercase tracking-widest font-bold mt-1">An Offer They Cannot Refuse</p>
                        </div>
                        <div className="text-right hidden sm:block">
                            <span className="text-4xl">🌹</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-slate-950/50 p-3 rounded border border-slate-700">
                            <p className="text-[10px] text-slate-500 uppercase font-bold">The Ask</p>
                            <p className="text-sm text-slate-200 font-semibold">{report.godfatherProposal.theAsk}</p>
                        </div>
                        <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                            <p className="text-[10px] text-slate-500 uppercase font-bold">The Give</p>
                            <p className="text-sm text-green-400 font-semibold">{report.godfatherProposal.theGive}</p>
                        </div>
                        <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Risk Reversal</p>
                            <p className="text-sm text-yellow-300 font-semibold">{report.godfatherProposal.riskReversal}</p>
                        </div>
                    </div>

                    <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 relative">
                        <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                            <p className="text-xs font-mono text-slate-500">EMAIL_SCRIPT.txt</p>
                            <CopyButton text={report.godfatherProposal.emailScript} />
                        </div>
                        <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                            {report.godfatherProposal.emailScript}
                        </pre>
                    </div>
                </div>

                {/* Product Bridge Ideas */}
                {report.productBridgeIdeas && report.productBridgeIdeas.length > 0 && (
                    <div className="border-t border-slate-700 pt-8">
                        <h3 className="text-xl font-bold text-slate-200 mb-4">
                            🛠️ Product Bridge (No Product? No Problem.)
                        </h3>
                        <p className="text-sm text-slate-400 mb-6">If you don't have an asset to sell, build one of these specific "Bridges" for the partner's list.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {report.productBridgeIdeas.map((idea, i) => (
                                <div key={i} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                                    <h4 className="font-bold text-green-300">{idea.conceptName}</h4>
                                    <p className="text-xs text-slate-300 mt-2">{idea.description}</p>
                                    <div className="mt-3 pt-3 border-t border-slate-800">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Why it fits:</p>
                                        <p className="text-xs text-slate-400 italic">{idea.whyItFitsPartner}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <Methodology models={report.methodology} />
            </div>
        </div>
    );
};

export default GatekeeperBypassReportComponent;
