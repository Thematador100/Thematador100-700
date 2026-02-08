
import React, { useState, Suspense, lazy } from 'react';
import { OpportunityBrief, AICode, LandingPageBlueprint, MarketMindAnalysis, QuantitativeModel, DataVisualizationSuiteForQuant } from '../types';
import LandingPageArchitect from './LandingPageArchitect';
import SalesPitchAssetReport from './SalesPitchAssetReport';

const DecisionDecompositionChart = lazy(() => import('./DecisionDecompositionChart'));
const AngleUpliftHeatmap = lazy(() => import('./AngleUpliftHeatmap'));


interface OpportunityBriefReportProps {
    brief: OpportunityBrief;
    generatedCode: AICode | null;
    onGenerateCodeFromOpportunity: (brief: OpportunityBrief) => void;
    landingPageBlueprint: LandingPageBlueprint | null;
    landingPageCode: AICode | null;
    onGenerateLandingPageBlueprint: (prompt: string) => void;
    onGenerateLandingPageCode: () => void;
    onGenerateAIVideoFoundry: (script: string) => void;
    onGenerateArchimedes: (brief: OpportunityBrief) => void;
}

const EmptyState: React.FC<{ message?: string }> = ({ message = "No data available" }) => (
  <div className="h-full grid place-items-center text-sm text-slate-500">{message}</div>
);

const CheckListItem: React.FC<{ label: string; checked: boolean }> = ({ label, checked }) => (
    <li className={`flex items-center text-xs ${checked ? 'text-green-300' : 'text-red-300'}`}>
        {checked ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
        )}
        {label}
    </li>
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
                <h4 className="font-bold text-yellow-300">Dominant Emotional Drivers</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                    {analysis.dominantEmotionalDrivers?.map(driver => (
                        <div key={driver.emotion} className="bg-slate-950 p-2 rounded border border-slate-800 flex-grow" title={driver.rationale}>
                            <span className="font-bold text-lg text-amber-300">{driver.weight}%</span>
                            <span className="ml-2 text-sm text-slate-300">{driver.emotion}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-bold text-yellow-300">"Hot-Button" Keywords & Phrases</h4>
                 <div className="space-y-2 mt-2">
                    {analysis.hotButtonKeywords?.map(kw => (
                        <div key={kw.keyword} className="bg-slate-950 p-2 rounded">
                            <p className="text-sm font-semibold text-slate-100">"{kw.keyword}"</p>
                            <p className="text-xs text-slate-400 italic mt-1">{kw.context}</p>
                        </div>
                    ))}
                </div>
            </div>
             <div>
                <h4 className="font-bold text-yellow-300">Psycholinguistic Routing Engine</h4>
                 <div className="bg-slate-950 p-3 rounded-lg mt-2 space-y-3">
                    <p className="text-xs text-slate-400 italic">{analysis.psycholinguisticRoutingEngine?.routingLogic}</p>
                    <div className="pt-3 border-t border-slate-800">
                        <h5 className="text-xs font-semibold text-slate-300 mb-2">Verbatim Hero Variants & Ad Hooks:</h5>
                        <div className="space-y-2">
                            {analysis.psycholinguisticRoutingEngine?.heroVariants?.map(variant => (
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
            <h4 className="font-bold text-amber-300">Decision Score Formula</h4>
            <pre className="text-amber-300 text-sm whitespace-pre-wrap font-mono bg-slate-950 p-3 rounded-md mt-2"><code>{model.decisionScoreFormula}</code></pre>
        </div>
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <h4 className="font-bold text-amber-300">Variable Definitions</h4>
            <div className="space-y-2 mt-2 text-xs">
                {model.variableDefinitions?.map(v => (
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
                 <h4 className="font-bold text-amber-300 mb-2">Decision Decomposition</h4>
                 <div className="w-full h-72 md:h-96">
                    <Suspense fallback={<EmptyState message="Loading Chart..." />}>
                        {barData.length > 0 ? <DecisionDecompositionChart data={barData} /> : <EmptyState />}
                    </Suspense>
                 </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                 <h4 className="font-bold text-amber-300 mb-2">Angle Uplift by Emotion</h4>
                 <div className="w-full h-72 md:h-96">
                    <Suspense fallback={<EmptyState message="Loading Heatmap..." />}>
                        {heatData.length > 0 ? <AngleUpliftHeatmap data={heatData} /> : <EmptyState />}
                    </Suspense>
                 </div>
            </div>
        </div>
    );
};


const AICodeFoundry: React.FC<{
    brief: OpportunityBrief;
    generatedCode: AICode | null;
    onGenerateCode: (brief: OpportunityBrief) => void;
}> = ({ brief, generatedCode, onGenerateCode }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const [isBuilding, setIsBuilding] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    const handleBuild = () => {
        setIsBuilding(true);
        onGenerateCode(brief);
    }

    React.useEffect(() => {
        if(generatedCode){
            setIsBuilding(false);
        }
    }, [generatedCode]);

    // Clean any accidental markdown wrappers from the AI
    const cleanSourceCode = (code: string) => {
        if (!code) return '';
        return code.replace(/```html/g, '').replace(/```/g, '').trim();
    };
    
    return (
        <div className="pt-8 mt-8 border-t-2 border-dashed border-cyan-500/30">
            <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                AI Code Foundry
            </h3>
            <p className="text-center text-slate-400 mt-1 mb-6">Build your 'Results-in-Advance' tool to start generating leads.</p>
            
            {!generatedCode && !isBuilding && (
                <div className="text-center">
                    <button
                        onClick={handleBuild}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition duration-200 shadow-lg text-lg"
                    >
                        Build "{brief.aiPoweredSolution?.resultsInAdvanceMechanism?.name || 'Tool'}" Tool
                    </button>
                    <p className="text-xs text-slate-500 mt-2">The AI will now act as an engineer and generate the code for your micro-tool.</p>
                </div>
            )}

            {isBuilding && !generatedCode && (
                <div className="flex flex-col items-center justify-center space-y-4 py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
                    <p className="text-slate-300 text-lg">AI Engineer is coding your tool...</p>
                    <p className="text-slate-500 text-sm">This may take a moment.</p>
                </div>
            )}
            
            {generatedCode && (
                <div className="animate-fade-in space-y-6 mt-6">
                    <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                        AI Code Foundry Output
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Code View */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold text-slate-200">Generated Code</h4>
                                <button onClick={() => handleCopy(cleanSourceCode(generatedCode.generatedCode))} className="text-sm bg-slate-600 hover:bg-slate-700 text-white font-semibold py-1 px-3 rounded-md transition">
                                     {copySuccess ? 'Copied!' : 'Copy Code'}
                                </button>
                            </div>
                            <pre className="text-slate-300 text-[10px] leading-3 whitespace-pre-wrap font-mono bg-slate-950 p-4 rounded-md h-96 overflow-y-auto">
                                <code>{cleanSourceCode(generatedCode.generatedCode)}</code>
                            </pre>
                        </div>
                        {/* Live Preview */}
                        <div>
                            <h4 className="font-semibold text-slate-200 mb-2">Live Preview</h4>
                            <div className="w-full h-96 bg-white rounded-md border-4 border-slate-700 overflow-hidden">
                                <iframe
                                    srcDoc={cleanSourceCode(generatedCode.generatedCode)}
                                    title="Generated Tool Preview"
                                    className="w-full h-full border-0"
                                    sandbox="allow-scripts allow-forms"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


const OpportunityBriefReport: React.FC<OpportunityBriefReportProps> = ({ brief, generatedCode, onGenerateCodeFromOpportunity, landingPageBlueprint, landingPageCode, onGenerateLandingPageBlueprint, onGenerateLandingPageCode, onGenerateAIVideoFoundry, onGenerateArchimedes }) => {
    // Robust destructuring with fallback to avoid crashes
    const starvingCrowd = brief.starvingCrowd || { name: 'Unknown', description: 'Data missing' };
    const aspirinProblem = brief.aspirinProblem || { problem: 'Data missing' };
    const gauntletVerdict = brief.gauntletVerdict || { passes: false, summary: 'N/A', checklist: {} };
    const aiPoweredSolution = brief.aiPoweredSolution || { 
        solutionName: 'N/A', 
        description: 'N/A', 
        irresistibleOffer: 'N/A', 
        resultsInAdvanceMechanism: { name: 'N/A', description: 'N/A' },
        aiAutomationProtocol: { protocol: 'N/A', rationale: 'N/A' },
        salesPitchAsset: { pitchPersona: '', pitchScript: '', videoScenePrompt: '' }
    };
    const fastestPathToCash = brief.fastestPathToCash || { channel: 'N/A', rationale: 'N/A' };
    const mentalModelApplicable = brief.mentalModelApplicable || { model: 'N/A', rationale: 'N/A' };
    const quantitativeModel = brief.quantitativeModel || { decisionScoreFormula: 'N/A', variableDefinitions: [] };
    const asymmetricJVProtocol = brief.asymmetricJVProtocol || { idealPartnerProfile: 'N/A', valueProposition: 'N/A', outreachAngle: 'N/A' };
    const businessInABoxAngle = brief.businessInABoxAngle || { opportunityName: 'N/A', targetBuyer: 'N/A', salesPitch: 'N/A' };
    
    const checklist = gauntletVerdict.checklist || {};

    const urgencyColor = {
        'High': 'text-red-400',
        'Medium': 'text-yellow-400',
        'Low': 'text-green-400',
    }[brief.urgencyLevel || ''] || 'text-slate-300';


    return (
        <>
            <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border border-amber-500/50 shadow-2xl p-6 animate-fade-in">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 text-center">
                    Monetizable Opportunity Brief
                </h2>
                <p className="text-center text-slate-400 mt-1 mb-8">A ruthless, AI-driven analysis focused on finding immediate revenue.</p>
                
                 {/* HAIR ON FIRE SECTION */}
                <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg mb-8">
                     <h3 className="text-xl font-bold text-red-300 text-center">"Hair on Fire" Problem Identified</h3>
                     <div className="bg-slate-900/50 p-3 rounded-lg mt-3">
                       <h4 className="font-bold text-yellow-300">{starvingCrowd.name}</h4>
                       <p className="text-slate-300 text-sm mt-1">{starvingCrowd.description}</p>
                       <div className="mt-3 pt-3 border-t border-slate-700">
                         <p className="text-xs text-slate-400 uppercase font-semibold">The Aspirin:</p>
                         <p className="text-slate-200 text-sm font-semibold">{aspirinProblem.problem}</p>
                       </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Gauntlet */}
                    <div className="lg:col-span-1 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <h3 className="text-lg font-semibold text-amber-300 mb-2 border-b border-amber-400/20 pb-1">The Gauntlet Verdict</h3>
                        <div className={`text-center p-2 rounded mb-4 ${gauntletVerdict.passes ? 'bg-green-900/50 border border-green-700' : 'bg-red-900/50 border border-red-700'}`}>
                            <p className={`text-2xl font-bold ${gauntletVerdict.passes ? 'text-green-300' : 'text-red-300'}`}>
                                {gauntletVerdict.passes ? "GO" : "NO-GO"}
                            </p>
                        </div>
                        <p className="text-xs text-slate-400 italic mb-4">{gauntletVerdict.summary}</p>
                        <ul className="space-y-1.5">
                            <CheckListItem label="Is it an Aspirin?" checked={!!checklist.isAspirin} />
                            <CheckListItem label="Is it a Starving Crowd?" checked={!!checklist.isStarvingCrowd} />
                            <CheckListItem label="Is the Market Big Enough?" checked={!!checklist.isBigEnough} />
                            <CheckListItem label="Is the Market Reachable?" checked={!!checklist.isReachable} />
                            <CheckListItem label="Is the Need URGENT?" checked={!!checklist.isUrgent} />
                            <CheckListItem label="Can Sell for a High Price?" checked={!!checklist.canSellHighPrice} />
                            <CheckListItem label="Has a Back-End?" checked={!!checklist.hasBackEnd} />
                            <CheckListItem label="Is it a Tollbooth?" checked={!!checklist.isTollbooth} />
                            <CheckListItem label="Is it Unique (USP)?" checked={!!checklist.isUnique} />
                            <CheckListItem label="Is the Market Growing?" checked={!!checklist.isGrowing} />
                        </ul>
                    </div>

                    {/* Right Column: The Plan */}
                    <div className="lg:col-span-2 space-y-6">
                         {(brief.marketSizeEstimate || brief.urgencyLevel) && (
                            <div>
                                <h3 className="text-lg font-semibold text-slate-200">Quantitative Snapshot</h3>
                                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {brief.marketSizeEstimate && (
                                        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 text-center">
                                            <p className="text-xs text-slate-400 font-semibold uppercase">Market Size Est.</p>
                                            <p className="text-lg font-bold text-amber-300">{brief.marketSizeEstimate}</p>
                                        </div>
                                    )}
                                    {brief.urgencyLevel && (
                                        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 text-center">
                                            <p className="text-xs text-slate-400 font-semibold uppercase">Urgency Level</p>
                                            <p className={`text-lg font-bold ${urgencyColor}`}>{brief.urgencyLevel}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div>
                            <h3 className="text-lg font-semibold text-slate-200 mb-2">Quantitative Model & Core Hypothesis</h3>
                            <QuantitativeModelReport model={quantitativeModel} />
                        </div>

                         {brief.dataVisualizationSuite && (
                            <div className="pt-6 border-t border-slate-700">
                                <h3 className="text-lg font-semibold text-slate-200 mb-2">Data Visualizations</h3>
                                <DataVisualizationSuiteReport suite={brief.dataVisualizationSuite} />
                            </div>
                         )}

                         {brief.marketMindAnalysis && <MarketMindAnalysisReport analysis={brief.marketMindAnalysis} />}

                         {brief.urgencyTriggers && brief.urgencyTriggers.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-red-400">URGENCY TRIGGERS</h3>
                                <div className="bg-red-900/20 border border-red-500/50 p-3 rounded-lg mt-2 space-y-1">
                                    {brief.urgencyTriggers.map((trigger, i) => <p key={i} className="text-sm text-red-200">&#9888; {trigger}</p>)}
                                </div>
                            </div>
                        )}

                         <div>
                            <h3 className="text-lg font-semibold text-slate-200">The AI-Powered Solution & Offer</h3>
                             <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 mt-2 space-y-3">
                               <h4 className="font-bold text-yellow-300">{aiPoweredSolution.solutionName}</h4>
                               <p className="text-slate-300 text-sm">{aiPoweredSolution.description}</p>
                               
                               <div className="p-3 rounded bg-slate-950 border border-teal-500/30">
                                 <p className="text-teal-300 text-sm font-bold">Results-in-Advance Mechanism (The Hook):</p>
                                 <h5 className="text-slate-100 font-semibold mt-1">{aiPoweredSolution.resultsInAdvanceMechanism?.name}</h5>
                                 <p className="text-slate-400 text-xs mt-1">{aiPoweredSolution.resultsInAdvanceMechanism?.description}</p>
                               </div>

                               <div className="p-3 rounded bg-slate-950 border border-amber-500/30">
                                 <p className="text-amber-300 text-sm font-bold">Irresistible Offer (The Paid Solution):</p>
                                 <p className="text-slate-200 text-sm mt-1">{aiPoweredSolution.irresistibleOffer}</p>
                               </div>
                               
                               <div className="p-3 rounded bg-slate-950 border border-purple-500/30">
                                    <p className="text-purple-300 text-sm font-bold">AI Automation Protocol (The Scalability Engine):</p>
                                    <h5 className="text-slate-100 font-semibold mt-1">Protocol:</h5>
                                    <p className="text-slate-400 text-xs mt-1">{aiPoweredSolution.aiAutomationProtocol?.protocol}</p>
                                    <h5 className="text-slate-100 font-semibold mt-2">Rationale:</h5>
                                    <p className="text-slate-400 text-xs mt-1 italic">{aiPoweredSolution.aiAutomationProtocol?.rationale}</p>
                               </div>
                               <SalesPitchAssetReport asset={aiPoweredSolution.salesPitchAsset} title="Solution Pitch Asset" onGenerateAIVideoFoundry={onGenerateAIVideoFoundry} />
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-200">Fastest Path to Cash (Traction Channel)</h3>
                                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 mt-2">
                                   <p className="text-yellow-300 font-bold">{fastestPathToCash.channel}</p>
                                   <p className="text-slate-400 text-xs mt-1 italic">{fastestPathToCash.rationale}</p>
                                </div>
                            </div>
                             <div>
                                <h3 className="text-lg font-semibold text-slate-200">Applicable Mental Model</h3>
                                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 mt-2">
                                   <p className="text-yellow-300 font-bold">{mentalModelApplicable.model}</p>
                                   <p className="text-slate-400 text-xs mt-1 italic">{mentalModelApplicable.rationale}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-slate-200">Asymmetric JV Protocol (Leverage Multiplier)</h3>
                            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 mt-2 space-y-3">
                                <div>
                                    <p className="text-xs text-rose-300 uppercase font-semibold">Ideal (Non-Obvious) Partner Profile:</p>
                                    <p className="text-slate-300 text-sm">{asymmetricJVProtocol.idealPartnerProfile}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-rose-300 uppercase font-semibold">Value Proposition to Partner:</p>
                                    <p className="text-slate-300 text-sm">{asymmetricJVProtocol.valueProposition}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-rose-300 uppercase font-semibold">Counterintuitive Outreach Angle:</p>
                                    <blockquote className="mt-1 border-l-4 border-rose-500 pl-3 italic text-slate-300 text-xs bg-slate-950 p-2 rounded-r-lg">
                                        {asymmetricJVProtocol.outreachAngle}
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-700">
                            <h3 className="text-lg font-semibold text-slate-200">"Business-in-a-Box" Angle (Meta-Monetization)</h3>
                            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 mt-2 space-y-3">
                                <div>
                                    <p className="text-xs text-cyan-300 uppercase font-semibold">Opportunity Name:</p>
                                    <p className="text-slate-300 text-sm font-bold">{businessInABoxAngle.opportunityName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-cyan-300 uppercase font-semibold">Target Buyer Profile:</p>
                                    <p className="text-slate-300 text-sm">{businessInABoxAngle.targetBuyer}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-cyan-300 uppercase font-semibold">Core Sales Pitch:</p>
                                    <blockquote className="mt-1 border-l-4 border-cyan-500 pl-3 italic text-slate-300 text-xs bg-slate-950 p-2 rounded-r-lg">
                                        {businessInABoxAngle.salesPitch}
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                        <Methodology models={brief.methodology} />
                        
                        <div className="pt-8 mt-8 border-t-2 border-dashed border-amber-500/30 text-center no-print">
                            <button
                                onClick={() => onGenerateArchimedes(brief)}
                                className="group relative bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-black py-4 px-10 rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(245,158,11,0.4)]"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span className="text-2xl">🏛️</span>
                                    DEPLOY ARCHIMEDES PROTOCOL
                                </span>
                            </button>
                            <p className="text-xs text-slate-500 mt-3 uppercase tracking-widest font-bold">Generate Specific Automation Layer for this Opportunity</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 no-print">
                 <AICodeFoundry 
                    brief={brief}
                    generatedCode={generatedCode}
                    onGenerateCode={onGenerateCodeFromOpportunity}
                />
            </div>
            <div className="mt-12 no-print">
                <LandingPageArchitect 
                    brief={brief} 
                    blueprint={landingPageBlueprint}
                    code={landingPageCode}
                    onGenerateBlueprint={onGenerateLandingPageBlueprint}
                    onGenerateCode={onGenerateLandingPageCode}
                />
            </div>
        </>
    );
};

export default OpportunityBriefReport;
