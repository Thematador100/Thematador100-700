
import React, { useState } from 'react';
import { AIVentureBlueprint, AICode, DataFeasibilityAnalysis, AISalesAgent } from '../types';

interface AIVentureBlueprintReportProps {
    blueprint: AIVentureBlueprint;
    onGenerateCode: (ultimatePrompt: string) => void;
    generatedCode: AICode | null;
}

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

const DataFeasibilityReport: React.FC<{ analysis: DataFeasibilityAnalysis }> = ({ analysis }) => {
    const scoreColor = {
        'High': 'text-green-400',
        'Medium': 'text-yellow-400',
        'Low': 'text-orange-400',
        'Very Low': 'text-red-400',
    }[analysis.feasibilityScore];

    return (
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <div className="text-center mb-4">
                <p className="text-xs text-indigo-300 uppercase font-semibold">Data Feasibility Score</p>
                <p className={`text-2xl font-bold ${scoreColor}`}>{analysis.feasibilityScore}</p>
            </div>
            <p className="text-xs text-slate-400 italic mb-3">{analysis.rationale}</p>
            <div>
                <p className="text-xs text-slate-300 uppercase font-semibold">Potential Automated Sources:</p>
                <ul className="list-disc list-inside text-xs text-slate-400 mt-1 space-y-1">
                    {analysis.potentialSources?.map((s, i) => (
                        s ? <li key={s.name || i}><strong>{s.name}</strong> ({s.type}): {s.notes}</li> : null
                    ))}
                </ul>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800">
                <p className="text-xs text-indigo-300 uppercase font-semibold">Recommendation:</p>
                <p className="text-sm text-slate-200 font-semibold">{analysis.recommendation}</p>
            </div>
        </div>
    );
}

const AISalesAgentReport: React.FC<{ agent: AISalesAgent, backend: AIVentureBlueprint['backendInstructions'] }> = ({ agent, backend }) => {
    const [copySuccess, setCopySuccess] = useState('');
    
    const handleCopy = (content: string, type: string) => {
        navigator.clipboard.writeText(content).then(() => {
            setCopySuccess(type);
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    return (
        <div className="space-y-4">
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-bold text-cyan-300">AI Sales Agent Strategy</h4>
                <p className="text-xs mt-1 text-slate-400">Persona: <span className="italic">{agent.persona}</span></p>
                <p className="text-xs mt-1 text-slate-400">Trigger: <span className="italic">{agent.triggerLogic}</span></p>
                <p className="text-xs mt-1 text-slate-400">Opener: <span className="italic">"{agent.openingScript}"</span></p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-cyan-300">Backend & Deployment Instructions</h4>
                    <button onClick={() => handleCopy(backend.code, 'backend')} className="text-xs bg-slate-600 hover:bg-slate-700 text-white font-semibold py-1 px-2 rounded-md transition">
                        {copySuccess === 'backend' ? 'Copied!' : 'Copy Code'}
                    </button>
                </div>
                <p className="text-xs text-slate-400 mb-2">To protect your API key, the AI agent communicates through a secure serverless function. Deploy this code on Vercel at the specified file path.</p>
                <p className="text-xs text-slate-300 font-mono bg-slate-950 p-1 rounded inline-block">File Path: {backend.filePath}</p>
                <pre className="text-slate-300 text-[10px] leading-3 whitespace-pre-wrap font-mono bg-slate-950 p-2 rounded-md max-h-48 overflow-y-auto mt-2">
                    <code>{backend.code}</code>
                </pre>
                <h5 className="text-xs text-slate-300 font-semibold mt-3">Deployment Steps:</h5>
                <ol className="list-decimal list-inside text-xs text-slate-400 space-y-1 mt-1">
                    {backend.deploymentSteps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
                <p className="text-center mt-4 text-xs font-bold text-yellow-400 bg-yellow-900/50 border border-yellow-700 p-2 rounded">
                    NOTE: The AI Sales Agent will only become functional after you deploy the tool and this backend code to a hosting service like Vercel. It will not work in the live preview here.
                </p>
            </div>
        </div>
    );
};

const DataAssetReport: React.FC<{ tool: AIVentureBlueprint['resultsInAdvanceTool'] }> = ({ tool }) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    return (
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <h4 className="font-bold text-cyan-300">Data Asset</h4>
            <p className="text-xs text-slate-400 mt-1 mb-3">This data powers your micro-tool. Save it as <code className="font-mono bg-slate-800 p-1 rounded">{tool.dataAssetFilename}</code> in the same folder as your HTML file.</p>
            <div className="relative">
                <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-slate-300 font-semibold">{tool.dataAssetFilename}</p>
                    <button onClick={() => handleCopy(tool.dataAsset)} className="text-xs bg-slate-600 hover:bg-slate-700 text-white font-semibold py-1 px-2 rounded-md transition">
                        {copySuccess ? 'Copied!' : 'Copy Data'}
                    </button>
                </div>
                <pre className="text-slate-300 text-[10px] leading-3 whitespace-pre-wrap font-mono bg-slate-950 p-2 rounded-md max-h-48 overflow-y-auto">
                    <code>{tool.dataAsset}</code>
                </pre>
            </div>
        </div>
    );
};

const AIVentureBlueprintReport: React.FC<AIVentureBlueprintReportProps> = ({ blueprint, onGenerateCode, generatedCode }) => {
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
        onGenerateCode(blueprint.ultimatePrompt);
    }
    
    React.useEffect(() => {
        if(generatedCode){
            setIsBuilding(false);
        }
    }, [generatedCode]);


    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border border-indigo-500/50 shadow-2xl p-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 text-center">
                AI Venture-in-a-Box
            </h2>
            <p className="text-center text-slate-400 mt-1 mb-8">A complete strategic and technical plan for an AI-powered MVP.</p>
            
            <div className="space-y-8">
                
                <h3 className="text-lg font-semibold text-slate-200">1. Data Feasibility Analysis</h3>
                <DataFeasibilityReport analysis={blueprint.dataFeasibilityAnalysis} />
                
                <h3 className="text-lg font-semibold text-slate-200 pt-6 border-t border-slate-700">2. The Strategic Blueprint</h3>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 space-y-3">
                    <div>
                        <p className="text-xs text-indigo-300 uppercase font-semibold">Starving Crowd:</p>
                        <p className="text-slate-300 text-sm font-semibold">{blueprint.validatedOpportunity.starvingCrowd}</p>
                    </div>
                    <div>
                        <p className="text-xs text-indigo-300 uppercase font-semibold">"Aspirin" Problem:</p>
                        <p className="text-slate-300 text-sm font-semibold">{blueprint.validatedOpportunity.aspirinProblem}</p>
                    </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h4 className="font-bold text-cyan-300">The "Results-in-Advance" Tool (Lead Magnet)</h4>
                    <p className="font-semibold text-slate-200 mt-1">{blueprint.resultsInAdvanceTool.toolName}</p>
                    <p className="text-slate-400 text-sm mt-1">{blueprint.resultsInAdvanceTool.description}</p>
                    <div className="mt-3 pt-3 border-t border-slate-800">
                        <h5 className="text-xs font-semibold text-slate-300">Lead Capture Mechanism</h5>
                        <p className="text-xs text-slate-400 mt-1">{blueprint.leadCaptureMechanism.strategy}</p>
                    </div>
                </div>
                
                <div className="pt-6 border-t border-slate-700">
                     <h3 className="text-lg font-semibold text-slate-200 mb-3">3. The Data Asset (for your tool)</h3>
                     <DataAssetReport tool={blueprint.resultsInAdvanceTool} />
                </div>


                <h3 className="text-lg font-semibold text-slate-200 pt-6 border-t border-slate-700">4. AI Sales Agent & Backend</h3>
                <AISalesAgentReport agent={blueprint.aiSalesAgent} backend={blueprint.backendInstructions} />
                
                {/* Ultimate Prompt */}
                <div className="pt-6 border-t border-slate-700">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-slate-200">5. The Ultimate Prompt (Front-End Brief)</h3>
                        <button onClick={() => handleCopy(blueprint.ultimatePrompt)} className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-1 px-3 rounded-md transition">
                            {copySuccess ? 'Copied!' : 'Copy Prompt'}
                        </button>
                    </div>
                    <pre className="text-slate-300 text-xs whitespace-pre-wrap font-mono bg-slate-950 p-4 rounded-md max-h-96 overflow-y-auto">
                        <code>{blueprint.ultimatePrompt}</code>
                    </pre>
                </div>

                <Methodology models={blueprint.methodology} />

                {/* AI Code Foundry Section */}
                <div className="pt-8 mt-8 border-t-2 border-dashed border-cyan-500/30">
                     {!generatedCode && !isBuilding && (
                        <div className="text-center">
                            <button
                                onClick={handleBuild}
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition duration-200 shadow-lg text-lg"
                                disabled={blueprint.dataFeasibilityAnalysis.feasibilityScore === 'Very Low'}
                            >
                                Build This Tool
                            </button>
                            <p className="text-xs text-slate-500 mt-2">The AI will now act as an engineer and generate the front-end code for your 'Results-in-Advance' tool.</p>
                            {blueprint.dataFeasibilityAnalysis.feasibilityScore === 'Very Low' && <p className="text-xs text-red-400 mt-1">Building is disabled due to very low data feasibility.</p>}
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
                        <div className="animate-fade-in space-y-6">
                            <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                AI Code Foundry Output
                            </h3>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Code View */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold text-slate-200">Generated Front-End Code</h4>
                                        <button onClick={() => handleCopy(generatedCode.generatedCode)} className="text-sm bg-slate-600 hover:bg-slate-700 text-white font-semibold py-1 px-3 rounded-md transition">
                                             {copySuccess ? 'Copied!' : 'Copy Code'}
                                        </button>
                                    </div>
                                    <pre className="text-slate-300 text-[10px] leading-3 whitespace-pre-wrap font-mono bg-slate-950 p-4 rounded-md h-96 overflow-y-auto">
                                        <code>{generatedCode.generatedCode}</code>
                                    </pre>
                                </div>
                                {/* Live Preview */}
                                <div>
                                    <h4 className="font-semibold text-slate-200 mb-2">Live Preview</h4>
                                    <div className="w-full h-96 bg-white rounded-md border-4 border-slate-700 overflow-hidden">
                                        <iframe
                                            srcDoc={generatedCode.generatedCode}
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
            </div>
        </div>
    );
};

export default AIVentureBlueprintReport;
