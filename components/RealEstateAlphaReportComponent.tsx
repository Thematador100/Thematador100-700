
import React, { useState } from 'react';
import { RealEstateAlphaReport, EsotericStrategy, ProprietaryAiSymbiosis, ValuationMultiplier } from '../types';
import MarketDataChart from './MarketDataChart'; 

interface RealEstateAlphaReportProps {
    report: RealEstateAlphaReport;
    onDeployAgents: (play: any, sourceReportType: string) => void;
    onGenerateFirstStrike: () => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode; icon?: string; accentColor?: string }> = ({ title, children, icon, accentColor = 'text-amber-400' }) => (
    <div className="pt-6 border-t border-slate-700">
        <h3 className={`text-xl font-semibold text-slate-200 mb-3 flex items-center`}>
             {icon && <span className={`text-2xl mr-3 ${accentColor}`}>{icon}</span>}
             {title}
        </h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const StageCard: React.FC<{ stageNumber: number; title: string; stageSummary: string; tasks: { taskName: string; description: string }[]; output: string; leverageScoring?: any }> = ({ stageNumber, title, stageSummary, tasks, output, leverageScoring }) => (
    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
        <h4 className="font-bold text-yellow-300">Stage {stageNumber}: {title}</h4>
        <p className="text-slate-400 text-xs mt-1 italic">{stageSummary}</p>
        <div className="mt-3 pt-3 border-t border-slate-800">
             <p className="text-xs text-slate-400 uppercase font-semibold">AI Tasks:</p>
             <div className="mt-2 space-y-2">
                {tasks?.map((task, i) => (
                    <div key={i} className="p-2 rounded bg-slate-950">
                        <h5 className="font-semibold text-slate-100 text-sm">{task.taskName}</h5>
                        <p className="text-slate-400 text-xs mt-1">{task.description}</p>
                    </div>
                ))}
             </div>
        </div>
        {leverageScoring && (
            <div className="mt-3 pt-3 border-t border-slate-800">
                 <p className="text-xs text-slate-400 uppercase font-semibold">Leverage Scoring Algorithm:</p>
                 <pre className="text-amber-300 text-xs whitespace-pre-wrap font-mono bg-slate-950 p-2 rounded-md mt-1"><code>{leverageScoring.formula}</code></pre>
            </div>
        )}
         <div className="mt-3 pt-3 border-t border-slate-800">
             <p className="text-xs text-slate-400 uppercase font-semibold">Stage Output:</p>
             <p className="text-green-300 text-sm font-semibold mt-1">{output}</p>
        </div>
    </div>
);

const OutreachScriptsDisplay: React.FC<{ scripts: EsotericStrategy['outreachScripts'] }> = ({ scripts }) => {
    const [activeTab, setActiveTab] = useState<'sms' | 'rvm' | 'directMail'>('sms');
    const [copySuccess, setCopySuccess] = useState<string | null>(null);

    if (!scripts) return null;

    const handleCopy = (type: 'sms' | 'rvm' | 'directMail') => {
        const textToCopy = scripts[type];
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopySuccess(type);
            setTimeout(() => setCopySuccess(null), 2000);
        });
    };

    return (
        <div className="mt-3 pt-3 border-t border-slate-800">
            <h5 className="text-xs font-semibold text-slate-400 uppercase mb-2">Actionable Outreach Scripts</h5>
             <div className="border-b border-slate-600 mb-2">
                <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                    <button onClick={() => setActiveTab('sms')} className={`${activeTab === 'sms' ? 'border-amber-400 text-amber-300' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-400'} whitespace-nowrap py-1 px-1 border-b-2 font-medium text-xs transition-colors`}>SMS</button>
                    <button onClick={() => setActiveTab('rvm')} className={`${activeTab === 'rvm' ? 'border-amber-400 text-amber-300' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-400'} whitespace-nowrap py-1 px-1 border-b-2 font-medium text-xs transition-colors`}>RVM</button>
                    <button onClick={() => setActiveTab('directMail')} className={`${activeTab === 'directMail' ? 'border-amber-400 text-amber-300' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-400'} whitespace-nowrap py-1 px-1 border-b-2 font-medium text-xs transition-colors`}>Direct Mail</button>
                </nav>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-slate-300 relative min-h-[80px]">
                <button onClick={() => handleCopy(activeTab)} className="absolute top-2 right-2 text-xs bg-slate-700 hover:bg-slate-600 text-white font-semibold py-1 px-2 rounded-md transition no-print">
                    {copySuccess === activeTab ? 'Copied!' : 'Copy'}
                </button>
                <p className="whitespace-pre-wrap pr-12">{scripts?.[activeTab] || 'No script available.'}</p>
            </div>
        </div>
    )
}

const EsotericStrategyCard: React.FC<{ strategy: EsotericStrategy }> = ({ strategy }) => (
    <div className="p-3 rounded bg-slate-950 border border-slate-800">
        <h5 className="font-semibold text-slate-100">{strategy.name} <span className="text-xs text-slate-500">({strategy.source})</span></h5>
        <p className="text-slate-400 text-xs mt-1">{strategy.strategy}</p>
        <OutreachScriptsDisplay scripts={strategy.outreachScripts} />
    </div>
);

const RealEstateAlphaReportComponent: React.FC<RealEstateAlphaReportProps> = ({ report, onDeployAgents, onGenerateFirstStrike }) => {
     const { esotericAlpha, uploadedDataAnalysis, dealFlowEngine, investorPlaybook, dataVisualizationSuite, aiAgentProtocol } = report;

    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border-2 border-amber-500/50 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                    🏠 Real Estate Alpha Protocol
                </h2>
                <p className="text-slate-400 mt-2 mb-8">A Hedge Fund-Grade Blueprint for Dominating Niche Real Estate Markets.</p>
            </div>

            <div className="mt-8 space-y-8">
                
                {/* Data Stack Recommendation Panel */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded-lg border border-slate-600 shadow-inner">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-800 rounded-md border border-slate-700 hidden sm:block">
                            <span className="text-2xl">💾</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-100 mb-1">Recommended Data Feed</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                To execute this protocol with maximum ROI, avoid expensive generic brokers. Feed the engine below using:
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-2 py-1 bg-green-900/30 text-green-300 border border-green-500/30 rounded text-xs font-semibold">PropertyRadar (Market Data)</span>
                                <span className="px-2 py-1 bg-blue-900/30 text-blue-300 border border-blue-500/30 rounded text-xs font-semibold">BatchLeads (Skip Tracing)</span>
                                <span className="px-2 py-1 bg-yellow-900/30 text-yellow-300 border border-yellow-500/30 rounded text-xs font-semibold">Melissa Data (Verification)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {esotericAlpha && (
                    <Section title={esotericAlpha.title} icon="🤫" accentColor="text-red-400">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <p className="text-slate-300 text-sm mb-4">{esotericAlpha.description}</p>
                            <div className="space-y-3">
                                {esotericAlpha.strategies?.map((s, i) => (
                                    s ? <EsotericStrategyCard key={i} strategy={s} /> : null
                                ))}
                            </div>
                        </div>
                    </Section>
                )}
                
                {uploadedDataAnalysis && (
                     <Section title="Proprietary Data Analysis" icon="📈">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <h4 className="font-bold text-yellow-300">Summary of Your Data:</h4>
                            <p className="text-slate-300 text-sm mt-1">{uploadedDataAnalysis.summary}</p>
                             <h4 className="font-bold text-yellow-300 mt-3">Actionable Insights:</h4>
                             <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 mt-2">
                                {uploadedDataAnalysis.insights.map((insight, i) => <li key={i}>{insight}</li>)}
                            </ul>
                        </div>
                    </Section>
                )}

                {dealFlowEngine && (
                    <Section title="The 'AI Rainmaker' Deal Flow Engine" icon="🌧️">
                        {dealFlowEngine.harvester && <StageCard stageNumber={1} title="The Harvester" {...dealFlowEngine.harvester} />}
                        {dealFlowEngine.validator && <StageCard stageNumber={2} title="The Validator" {...dealFlowEngine.validator} leverageScoring={dealFlowEngine.validator.leverageScoringAlgorithm} />}
                        {dealFlowEngine.dossier && <StageCard stageNumber={3} title="The Dossier" {...dealFlowEngine.dossier} />}
                    </Section>
                )}

                 {dataVisualizationSuite && (
                    <Section title="Synthesized Market Intelligence" icon="📊">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <MarketDataChart data={dataVisualizationSuite.marketOpportunityChart} />
                             <div className="mt-4 pt-4 border-t border-slate-700 text-center no-print">
                                <h5 className="text-sm font-semibold text-slate-300">Data Source Note</h5>
                                <p className="text-xs text-slate-400 mt-1 max-w-xl mx-auto">
                                    The data in this visualization is synthesized. For live execution, connect this dashboard to the <strong>PropertyRadar API</strong> or import CSV exports from <strong>BatchLeads</strong>.
                                </p>
                            </div>
                        </div>
                         {dataVisualizationSuite.samplePropertyDossier && (
                             <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 mt-4">
                                <h4 className="font-bold text-yellow-300 mb-3 text-center">Sample Property Dossier</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                    {dataVisualizationSuite.samplePropertyDossier.imageUrl && (
                                        <img src={dataVisualizationSuite.samplePropertyDossier.imageUrl} alt="Sample Property" className="rounded-lg w-full h-auto object-cover border-2 border-slate-700" />
                                    )}
                                    <div>
                                        <h5 className="font-semibold text-slate-100">{dataVisualizationSuite.samplePropertyDossier.address}</h5>
                                        <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                                            {dataVisualizationSuite.samplePropertyDossier.stats?.map((s: any) => <div key={s.label} className="bg-slate-800 p-1.5 rounded"><p className="text-slate-400">{s.label}</p><p className="font-bold text-slate-200">{s.value}</p></div>)}
                                        </div>
                                    </div>
                                </div>
                                 <div className="mt-3 pt-3 border-t border-slate-800">
                                     <h5 className="font-semibold text-slate-100 text-sm">Investment Thesis</h5>
                                     <p className="text-xs text-slate-300 mt-1">{dataVisualizationSuite.samplePropertyDossier.investmentThesis}</p>
                                </div>
                            </div>
                         )}
                    </Section>
                 )}
                
                {investorPlaybook && (
                    <Section title={investorPlaybook.title} icon="♟️">
                         <ol className="list-decimal list-inside text-sm text-slate-300 space-y-3 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            {investorPlaybook.steps?.map((step, i) => <li key={i}><strong className="text-slate-100">{step.stepName}:</strong> {step.description}</li>)}
                        </ol>
                    </Section>
                )}

                {aiAgentProtocol && (
                    <div className="pt-8 mt-8 border-t-2 border-dashed border-purple-500/30 text-center no-print">
                        <h3 className="text-lg font-semibold text-purple-300 mb-2">AI Agent Protocol & Deployment</h3>
                        <p className="text-xs text-slate-400 mb-4 max-w-lg mx-auto">{aiAgentProtocol.protocol}</p>
                        <button
                            onClick={() => onDeployAgents(report, 'Real Estate Alpha Protocol')}
                            className="bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition"
                        >
                            Deploy AI Agent Workforce
                        </button>
                        <p className="text-xs text-slate-500 mt-2">Instantiate your AI workforce to accelerate this protocol.</p>
                    </div>
                )}

                <div className="mt-8 pt-8 border-t-2 border-dashed border-red-500/30 text-center no-print">
                    <button
                        onClick={onGenerateFirstStrike}
                        className="bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold py-3 px-6 rounded-lg hover:from-red-700 hover:to-rose-600 transition duration-200 shadow-lg text-lg"
                    >
                        Generate First Strike Protocol
                    </button>
                    <p className="text-xs text-slate-500 mt-2">Bridge the gap from strategy to execution. Find your first 3-5 targets now.</p>
                </div>

            </div>
        </div>
    );
};

export default RealEstateAlphaReportComponent;
