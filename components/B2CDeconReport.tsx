import React from 'react';
import { B2CMarketDeconstruction } from '../types';

interface B2CDeconReportProps {
    brief: B2CMarketDeconstruction;
    onGenerateMarketMap: () => void;
}

const Tag: React.FC<{ text: string }> = ({ text }) => (
    <span className="inline-block bg-slate-700 rounded-full px-3 py-1 text-xs font-semibold text-slate-300 mr-2 mb-2">
      {text}
    </span>
);

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

const B2CDeconReport: React.FC<B2CDeconReportProps> = ({ brief, onGenerateMarketMap }) => {
    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border border-pink-500/50 shadow-2xl p-6 animate-fade-in">
             <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 text-center">
                B2C Market Deconstruction
            </h2>
            <p className="text-center text-slate-400 mt-1 mb-8">An AI-generated landscape of the target consumer tribe.</p>
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">Defining Interests</h3>
                     <div className="flex flex-wrap">{brief.definingInterests.map(t => <Tag key={t} text={t} />)}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                         <h3 className="text-lg font-semibold text-slate-200 mb-2">Influential Brands & Communities</h3>
                         <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">{brief.influentialBrands.map(p => <li key={p}>{p}</li>)}</ul>
                    </div>
                     <div>
                         <h3 className="text-lg font-semibold text-slate-200 mb-2">Competitor Brands / Channels</h3>
                         <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">{brief.competitorBrands.map(p => <li key={p}>{p}</li>)}</ul>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">Customer Personas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {brief.customerPersonas.map(p => (
                             <div key={p.name} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                                <h4 className="font-bold text-pink-300">{p.name}</h4>
                                <p className="text-slate-400 text-xs mt-1">{p.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                 <div className="pt-4 mt-4 border-t border-slate-700/50">
                    <h3 className="text-lg font-semibold text-pink-400 mb-2">Buying Triggers & Intent Signals</h3>
                     <div className="space-y-3">
                        {brief.b2cBuyingTriggers.map((t, i) => (
                            <div key={i} className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                               <p className="font-bold text-rose-400 text-sm">{t.trigger}</p>
                               <p className="text-slate-400 text-xs mt-1 italic">{t.implication}</p>
                            </div>
                        ))}
                     </div>
                 </div>

                <div className="pt-6 border-t border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">The Market Mind: Psycholinguistic Analysis</h3>
                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 mt-2 space-y-4">
                        <div>
                            <h4 className="font-bold text-purple-300">Dominant Emotional Drivers</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {brief.marketMindAnalysis.dominantEmotionalDrivers.map(driver => (
                                    <div key={driver.emotion} className="bg-slate-950 p-2 rounded border border-slate-800 flex-grow" title={driver.rationale}>
                                        <span className="font-bold text-lg text-pink-300">{driver.weight}%</span>
                                        <span className="ml-2 text-sm text-slate-300">{driver.emotion}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-purple-300">"Hot-Button" Keywords & Phrases</h4>
                            <div className="space-y-2 mt-2">
                                {brief.marketMindAnalysis.hotButtonKeywords.map(kw => (
                                    <div key={kw.keyword} className="bg-slate-950 p-2 rounded">
                                        <p className="text-sm font-semibold text-slate-100">"{kw.keyword}"</p>
                                        <p className="text-xs text-slate-400 italic mt-1">{kw.context}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-purple-300">Psycholinguistic Routing Engine</h4>
                            <div className="bg-slate-950 p-3 rounded-lg mt-2 space-y-3">
                                <p className="text-xs text-slate-400 italic">{brief.marketMindAnalysis.psycholinguisticRoutingEngine.routingLogic}</p>
                                <div className="pt-3 border-t border-slate-800">
                                    <h5 className="text-xs font-semibold text-slate-300 mb-2">Verbatim Hero Variants & Ad Hooks:</h5>
                                    <div className="space-y-2">
                                        {brief.marketMindAnalysis.psycholinguisticRoutingEngine.heroVariants.map(variant => (
                                            <div key={variant.angle} className="p-2 rounded bg-slate-800/50">
                                                <p className="font-semibold text-pink-400 text-sm">{variant.angle}</p>
                                                <p className="text-slate-200 text-xs mt-1"><strong>Headline:</strong> "{variant.headline}"</p>
                                                <p className="text-slate-300 text-xs mt-1"><strong>Ad Hook:</strong> "{variant.adHook}"</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Methodology models={brief.methodology} />

                <div className="pt-8 mt-8 border-t-2 border-dashed border-cyan-500/30 text-center no-print">
                    <button
                        onClick={onGenerateMarketMap}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition duration-200 shadow-lg"
                    >
                        Generate Full Market Map
                    </button>
                    <p className="text-xs text-slate-500 mt-2">Expand this analysis to the entire market landscape.</p>
                </div>
            </div>
        </div>
    );
};

export default B2CDeconReport;