
import React from 'react';
import { MonetizationStrategy, ProductIdea } from '../types';

interface MonetizationStrategyReportProps {
    strategy: MonetizationStrategy;
    onGeneratePlaybook: () => void;
    analysisType: 'b2b' | 'b2c';
    onGenerateArchimedes: (strategy: MonetizationStrategy) => void;
}

const ProductIdeaCard: React.FC<{ idea: ProductIdea }> = ({ idea }) => {
    if (!idea) return null;
    return (
        <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-colors">
            <h4 className="font-bold text-teal-400 text-lg">{idea.ideaName || 'New Venture Blueprint'}</h4>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{idea.description || 'Strategic concept for market monetization.'}</p>
            
            <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Profit Potential</p>
                    <p className="text-amber-300 font-black text-xl">{idea.profitPotential || 'High'}</p>
                </div>
                 <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">AI Leverage Point</p>
                    <p className="text-slate-200 text-sm font-semibold">{idea.aiLeveragePoint || 'Standard Analysis'}</p>
                </div>
            </div>

            {idea.pricingModel?.tiers && (
                <div className="mt-6 pt-4 border-t border-slate-800">
                     <p className="text-[10px] text-slate-500 font-bold uppercase mb-3 tracking-widest">Pricing Architecture</p>
                     <div className="space-y-3">
                        {idea.pricingModel.tiers.map((tier, i) => (
                            <div key={i} className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h5 className="font-bold text-cyan-400 text-sm">{tier?.name || 'Tier'}</h5>
                                        <p className="text-[10px] text-slate-500 uppercase mt-0.5">{tier?.description}</p>
                                    </div>
                                    <p className="font-black text-xl text-amber-400">{tier?.pricePerMonth || 'Custom'}</p>
                                </div>
                                {tier?.features && (
                                    <ul className="mt-3 space-y-1">
                                        {tier.features.map((f, fi) => (
                                            <li key={fi} className="text-[10px] text-slate-400 flex items-center gap-2">
                                                <span className="text-teal-500">✓</span> {f}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                     </div>
                </div>
            )}
        </div>
    );
};

const MonetizationStrategyReport: React.FC<MonetizationStrategyReportProps> = ({ strategy, onGeneratePlaybook, analysisType, onGenerateArchimedes }) => {
    if (!strategy) return null;

    return (
        <div className="mt-12 bg-slate-800/80 backdrop-blur-md rounded-2xl border-2 border-teal-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-teal-300 tracking-tighter uppercase">Monetization Intelligence</h2>
                    <p className="text-slate-400 text-sm italic">Strategic Alpha Generation for {analysisType?.toUpperCase()} Segment.</p>
                </div>
                <div className="bg-teal-900/30 px-4 py-2 rounded-full border border-teal-500/50">
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Strategy Phase 02</span>
                </div>
            </div>

            <div className="space-y-10">
                <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">The Core Opportunity</h3>
                    <p className="text-slate-200 text-lg font-medium leading-relaxed">{strategy.coreOpportunity || 'Analysis in progress...'}</p>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Strategic Venture Blueprints</h3>
                    <div className="grid grid-cols-1 gap-6">
                        {strategy.productIdeas?.length ? strategy.productIdeas.map((idea, i) => (
                           <ProductIdeaCard key={i} idea={idea} />
                        )) : <p className="text-slate-500 italic">No blueprints generated. Please retry.</p>}
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-700">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Lead Acquisition Protocol</h3>
                     <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden shadow-inner">
                        <table className="w-full text-sm text-left">
                            <thead className="text-[10px] text-slate-500 uppercase bg-slate-950/80">
                                <tr>
                                    <th className="px-6 py-4 tracking-widest">Target Platform</th>
                                    <th className="px-6 py-4 tracking-widest">Filtering Logic</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {strategy.leadSourceProtocol?.map((protocol, i) => (
                                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4 font-bold text-cyan-300">{protocol?.sourcePlatform || 'Platform'}</td>
                                        <td className="px-6 py-4 text-xs text-slate-400">
                                            {protocol?.filteringCriteria?.join(', ') || 'N/A'}
                                            <p className="mt-1 text-[10px] text-slate-600 italic">{protocol?.rationale}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-800 text-center no-print flex flex-col sm:flex-row justify-center gap-4">
                    <div>
                        <button
                            onClick={onGeneratePlaybook}
                            className="group relative bg-gradient-to-br from-amber-400 to-orange-600 text-black font-black py-4 px-12 rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(245,158,11,0.3)] w-full sm:w-auto"
                        >
                            <span className="relative z-10">GENERATE BILLIONAIRE PLAYBOOK</span>
                            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <p className="text-[10px] text-slate-600 mt-4 font-bold tracking-[0.3em] uppercase">Advance to High-Ticket Positioning</p>
                    </div>
                    <div>
                        <button
                            onClick={() => onGenerateArchimedes(strategy)}
                            className="group relative bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-4 px-12 rounded-xl border border-slate-600 hover:border-amber-500/50 transition-all duration-200 w-full sm:w-auto"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <span className="text-xl">🏛️</span>
                                Deploy Archimedes Protocol
                            </span>
                        </button>
                        <p className="text-[10px] text-slate-600 mt-4 font-bold tracking-[0.3em] uppercase">Automate Execution</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonetizationStrategyReport;
