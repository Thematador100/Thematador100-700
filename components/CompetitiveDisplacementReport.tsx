

import React, { useState, Suspense, lazy } from 'react';
import { CompetitiveDisplacementBrief, VideoStrategy, MarketMindAnalysis, QuantitativeModel, DataVisualizationSuiteForQuant } from '../types';
import VideoWedgeStrategyReport from './VideoWedgeStrategyReport';

const DecisionDecompositionChart = lazy(() => import('./DecisionDecompositionChart'));
const AngleUpliftHeatmap = lazy(() => import('./AngleUpliftHeatmap'));


interface CompetitiveDisplacementReportProps {
    brief: CompetitiveDisplacementBrief;
    onGenerateVideoWedge: () => void;
    videoStrategy: VideoStrategy | null;
    onGenerateMarketMap: () => void;
}

const EmptyState: React.FC<{ message?: string }> = ({ message = "No data available" }) => (
  <div className="h-full grid place-items-center text-sm text-slate-500">{message}</div>
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

const MarketMindAnalysisReport: React.FC<{ analysis: MarketMindAnalysis }> = ({ analysis }) => (
    <div className="pt-6 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200 mb-2">The Market Mind: Psycholinguistic Analysis</h3>
        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 mt-2 space-y-4">
            <div>
                <h4 className="font-bold text-purple-300">Dominant Emotional Drivers</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                    {analysis.dominantEmotionalDrivers.map(driver => (
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
                    {analysis.hotButtonKeywords.map(kw => (
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
                    <p className="text-xs text-slate-400 italic">{analysis.psycholinguisticRoutingEngine.routingLogic}</p>
                    <div className="pt-3 border-t border-slate-800">
                        <h5 className="text-xs font-semibold text-slate-300 mb-2">Verbatim Hero Variants & Ad Hooks:</h5>
                        <div className="space-y-2">
                            {analysis.psycholinguisticRoutingEngine.heroVariants.map(variant => (
                                <div key={variant.angle} className="p-2 rounded bg-slate-800/50">
                                    <p className="font-semibold text-cyan-300 text-sm">{variant.angle}</p>
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
);

const QuantitativeModelReport: React.FC<{ model: QuantitativeModel }> = ({ model }) => (
    <div className="space-y-4">
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <h4 className="font-bold text-purple-300">Decision Score Formula</h4>
            <pre className="text-purple-300 text-sm whitespace-pre-wrap font-mono bg-slate-950 p-3 rounded-md mt-2"><code>{model.decisionScoreFormula}</code></pre>
        </div>
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <h4 className="font-bold text-purple-300">Variable Definitions</h4>
            <div className="space-y-2 mt-2 text-xs">
                {model.variableDefinitions.map(v => (
                    <div key={v.variable}>
                        <code className="font-mono text-slate-300 bg-slate-800 p-1 rounded">{v.variable}</code>: <span className="text-slate-400">{v.definition}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const DataVisualizationSuiteReport: React.FC<{ suite: DataVisualizationSuiteForQuant }> = ({ suite }) => {
    const barData = (suite.decisionDecomposition ?? []).map(d => ({ label: d.label ?? "—", value: Number(d.value ?? 0) })).filter(d => Number.isFinite(d.value));
    const heatData = (suite.angleUplift ?? []).map(c => ({ segment: c.segment ?? "Unknown", angle: c.angle ?? "Unknown", uplift: Number(c.uplift ?? 0) })).filter(c => Number.isFinite(c.uplift));

    return (
        <div className="space-y-6">
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                 <h4 className="font-bold text-purple-300 mb-2">Decision Decomposition</h4>
                 <div className="w-full h-72 md:h-96">
                    <Suspense fallback={<EmptyState message="Loading Chart..." />}>
                        {barData.length > 0 ? <DecisionDecompositionChart data={barData} /> : <EmptyState />}
                    </Suspense>
                 </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                 <h4 className="font-bold text-purple-300 mb-2">Angle Uplift by Emotion</h4>
                 <div className="w-full h-72 md:h-96">
                    <Suspense fallback={<EmptyState message="Loading Heatmap..." />}>
                        {heatData.length > 0 ? <AngleUpliftHeatmap data={heatData} /> : <EmptyState />}
                    </Suspense>
                 </div>
            </div>
        </div>
    );
};


const CompetitiveDisplacementReport: React.FC<CompetitiveDisplacementReportProps> = ({ brief, onGenerateVideoWedge, videoStrategy, onGenerateMarketMap }) => {
    const [activeTab, setActiveTab] = useState<'email' | 'rvm' | 'text'>('email');
    const [copySuccess, setCopySuccess] = useState<string | null>(null);

    const handleCopy = (type: 'email' | 'rvm' | 'text') => {
        let textToCopy = '';
        const { subjectLine, body, rvmScript, textMessage } = brief.outreachCopy;
        switch (type) {
            case 'email':
                textToCopy = `Subject: ${subjectLine}\n\n${body}`;
                break;
            case 'rvm':
                textToCopy = rvmScript;
                break;
            case 'text':
                textToCopy = textMessage;
                break;
        }
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopySuccess(type);
            setTimeout(() => setCopySuccess(null), 2000);
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border border-purple-500/50 shadow-2xl p-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-center">
                Competitive Displacement Brief
            </h2>
            <p className="text-center text-slate-400 mt-1 mb-8">An AI-generated intelligence asset for strategic infiltration.</p>

            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">Competitor Traffic & Reach Analysis</h3>
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <p className="text-lg font-bold text-purple-300">{brief.trafficAnalysis.marketPosition}</p>
                        {brief.marketSizeEstimate && <p className="text-sm text-amber-300 font-semibold">Est. Market Size: {brief.marketSizeEstimate}</p>}
                        <p className="text-xs text-slate-400 mt-2 uppercase font-semibold">Supporting Signals:</p>
                        <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 mt-1">
                            {brief.trafficAnalysis.supportingSignals.map((signal, i) => <li key={i}>{signal}</li>)}
                        </ul>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">Quantitative Model</h3>
                    <QuantitativeModelReport model={brief.quantitativeModel} />
                </div>
                
                <div className="pt-6 border-t border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">Data Visualizations</h3>
                    <DataVisualizationSuiteReport suite={brief.dataVisualizationSuite} />
                </div>
                
                {brief.marketMindAnalysis && <MarketMindAnalysisReport analysis={brief.marketMindAnalysis} />}

                <div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">The AI-Powered "Wedge"</h3>
                     <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <p className="text-xs text-purple-300 uppercase font-semibold">Identified Blind Spot:</p>
                        <p className="text-slate-300 text-sm font-semibold mb-3">{brief.aiPoweredWedge.blindSpot}</p>
                        
                        <div className="p-3 rounded bg-slate-950 border border-purple-500/30">
                            <p className="text-purple-300 text-sm font-bold">Wedge Idea (Results in Advance):</p>
                            <h4 className="text-slate-100 font-semibold mt-1">{brief.aiPoweredWedge.wedgeIdea}</h4>
                            <p className="text-slate-400 text-xs mt-1">{brief.aiPoweredWedge.wedgeDescription}</p>
                        </div>
                    </div>
                </div>
                
                 <div className="pt-6 border-t border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">The "Irresistible Outreach" Multichannel Sequence</h3>
                    
                    <div className="border-b border-slate-600 mb-2">
                        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('email')}
                                className={`${activeTab === 'email' ? 'border-purple-400 text-purple-300' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-400'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors`}
                            >
                                Email
                            </button>
                            <button
                                onClick={() => setActiveTab('rvm')}
                                className={`${activeTab === 'rvm' ? 'border-purple-400 text-purple-300' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-400'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors`}
                            >
                                RVM Script
                            </button>
                            <button
                                onClick={() => setActiveTab('text')}
                                className={`${activeTab === 'text' ? 'border-purple-400 text-purple-300' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-400'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors`}
                            >
                                Text Message
                            </button>
                        </nav>
                    </div>

                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 font-mono text-xs text-slate-300 relative min-h-[150px]">
                        {activeTab === 'email' && (
                            <div className="animate-fade-in">
                                <button onClick={() => handleCopy('email')} className="absolute top-2 right-2 text-sm bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded-md transition">
                                    {copySuccess === 'email' ? 'Copied!' : 'Copy'}
                                </button>
                                <p><strong className="text-purple-300">Subject:</strong> {brief.outreachCopy.subjectLine}</p>
                                <hr className="border-slate-700 my-2" />
                                <p className="whitespace-pre-wrap">{brief.outreachCopy.body}</p>
                            </div>
                        )}
                        {activeTab === 'rvm' && (
                            <div className="animate-fade-in">
                                <button onClick={() => handleCopy('rvm')} className="absolute top-2 right-2 text-sm bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded-md transition">
                                    {copySuccess === 'rvm' ? 'Copied!' : 'Copy'}
                                </button>
                                <p className="text-purple-300 mb-2">[Voicemail Script - under 30s]</p>
                                <p className="whitespace-pre-wrap">{brief.outreachCopy.rvmScript}</p>
                            </div>
                        )}
                        {activeTab === 'text' && (
                            <div className="animate-fade-in">
                                <button onClick={() => handleCopy('text')} className="absolute top-2 right-2 text-sm bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded-md transition">
                                    {copySuccess === 'text' ? 'Copied!' : 'Copy'}
                                </button>
                                 <p className="text-purple-300 mb-2">[SMS/Text Message]</p>
                                <p className="whitespace-pre-wrap">{brief.outreachCopy.textMessage}</p>
                            </div>
                        )}
                    </div>
                </div>
                
                <Methodology models={brief.methodology} />

                <div className="pt-8 mt-8 border-t border-slate-700">
                    {!videoStrategy ? (
                        <div className="text-center">
                            <button
                                onClick={onGenerateVideoWedge}
                                className="bg-gradient-to-r from-pink-600 to-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:from-pink-700 hover:to-purple-600 transition duration-200 shadow-lg"
                            >
                                Generate Video Wedge Strategy
                            </button>
                            <p className="text-xs text-slate-500 mt-2">Generate a script and plan for a personalized video to deliver this wedge with maximum impact.</p>
                        </div>
                    ) : (
                        <VideoWedgeStrategyReport strategy={videoStrategy} />
                    )}
                </div>
                
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

export default CompetitiveDisplacementReport;
