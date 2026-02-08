
import React, { useState } from 'react';
import { OpportunityBrief, LandingPageBlueprint, AICode, LandingPageSection } from '../types';

interface LandingPageArchitectProps {
    brief: OpportunityBrief;
    blueprint: LandingPageBlueprint | null;
    code: AICode | null;
    onGenerateBlueprint: (prompt: string) => void;
    onGenerateCode: () => void;
}

const SectionDisplay: React.FC<{ section: LandingPageSection }> = ({ section }) => {
    const [isOpen, setIsOpen] = useState(true);

    // Fallback for undefined sectionType to prevent crashes
    const type = section.sectionType || 'generic';

    const getIcon = (type: string) => {
        const normalizedType = type.toLowerCase();
        if (normalizedType.includes('hero')) return '🎯';
        if (normalizedType.includes('problem')) return '🔥';
        if (normalizedType.includes('solution')) return '💡';
        if (normalizedType.includes('feature')) return '✨';
        if (normalizedType.includes('social') || normalizedType.includes('proof')) return '🗣️';
        if (normalizedType.includes('action') || normalizedType.includes('cta')) return '🚀';
        if (normalizedType.includes('faq')) return '❓';
        return '📄';
    };

    const formatTitle = (str: string) => {
        if (!str) return 'Generic Section';
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
    };

    return (
        <div className="bg-slate-950/70 border border-slate-700 rounded-lg">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 text-left"
            >
                <h5 className="font-semibold text-slate-200 flex items-center">
                    <span className="text-lg mr-2">{getIcon(type)}</span>
                    {formatTitle(type)}
                </h5>
                <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && (
                <div className="p-3 border-t border-slate-700 space-y-2">
                    <p className="text-sm font-bold text-cyan-300">{section.headline || 'No Headline'}</p>
                    {section.subheadline && <p className="text-xs text-slate-300 italic">"{section.subheadline}"</p>}
                    <p className="text-xs text-slate-400">{section.body || 'No content generated.'}</p>
                    {section.ctaButtonText && <p className="text-xs font-semibold text-amber-300">Button: "{section.ctaButtonText}"</p>}
                </div>
            )}
        </div>
    );
}


const LandingPageArchitect: React.FC<LandingPageArchitectProps> = ({ brief, blueprint, code, onGenerateBlueprint, onGenerateCode }) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleGenerateBlueprint = () => {
        // Safe access to nested properties
        const targetAudience = brief.starvingCrowd?.name || "Target Audience";
        const problem = brief.aspirinProblem?.problem || "Main Problem";
        const solutionName = brief.aiPoweredSolution?.solutionName || "Solution Name";
        const irresistibleOffer = brief.aiPoweredSolution?.irresistibleOffer || "Irresistible Offer";
        const hookName = brief.aiPoweredSolution?.resultsInAdvanceMechanism?.name || "Hook";
        const hookDesc = brief.aiPoweredSolution?.resultsInAdvanceMechanism?.description || "Description";

        const prompt = `Generate a landing page blueprint for the following AI-powered solution. 
        The target audience is the '${targetAudience}' who are dealing with the problem: '${problem}'. 
        The solution is called '${solutionName}' and it offers '${irresistibleOffer}'. 
        The 'Results-in-Advance' hook is '${hookName}: ${hookDesc}'. 
        Focus the copy on solving their urgent problem with a clear, compelling narrative.`;
        onGenerateBlueprint(prompt);
    };

    const handleCopyCode = () => {
        if (!code) return;
        navigator.clipboard.writeText(code.generatedCode).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    return (
        <div className="pt-8 mt-8 border-t-2 border-dashed border-cyan-500/30">
            <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Landing Page Architect
            </h3>
            <p className="text-center text-slate-500 text-xs mt-1 mb-6">Go from strategy to a deployable asset in two clicks.</p>

            {!blueprint && (
                <div className="text-center">
                    <button
                        onClick={handleGenerateBlueprint}
                        className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:from-cyan-700 hover:to-blue-600 transition duration-200 shadow-lg"
                    >
                        Step 1: Generate Landing Page Blueprint
                    </button>
                    <p className="text-xs text-slate-500 mt-2">The AI will generate the strategic copy and structure for your page.</p>
                </div>
            )}
            
            {blueprint && (
                <div className="mt-6 animate-fade-in space-y-6">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Blueprint View */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold text-slate-200">The Blueprint (Strategy & Copy)</h4>
                                {!code && (
                                     <button
                                        onClick={onGenerateCode}
                                        className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:from-amber-600 hover:to-yellow-500 transition text-sm"
                                    >
                                        Step 2: Generate Code
                                    </button>
                                )}
                            </div>
                            <div className="space-y-2 p-2 bg-slate-800/50 rounded-lg max-h-96 overflow-y-auto">
                               <p className="text-xs text-center text-slate-400 p-2"><strong>Page Title:</strong> {blueprint.pageTitle}</p>
                               {blueprint.sections && blueprint.sections.length > 0 ? (
                                   blueprint.sections.map((section, i) => (
                                       <SectionDisplay key={i} section={section} />
                                   ))
                               ) : (
                                   <p className="text-xs text-slate-500 text-center">No sections generated.</p>
                               )}
                            </div>
                        </div>

                        {/* Code Preview */}
                        <div>
                            {code ? (
                                <>
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold text-slate-200">Live Preview & Code</h4>
                                        <button onClick={handleCopyCode} className="text-sm bg-slate-600 hover:bg-slate-700 text-white font-semibold py-1 px-3 rounded-md transition">
                                             {copySuccess ? 'Copied!' : 'Copy Code'}
                                        </button>
                                    </div>
                                    <div className="w-full h-96 bg-white rounded-md border-4 border-slate-700 overflow-hidden">
                                        <iframe
                                            srcDoc={code.generatedCode}
                                            title="Generated Landing Page Preview"
                                            className="w-full h-full border-0"
                                            sandbox="allow-scripts allow-forms"
                                        />
                                    </div>
                                </>
                            ) : (
                                 <div>
                                     <h4 className="font-semibold text-slate-200 mb-2">Live Preview & Code</h4>
                                     <div className="w-full h-96 bg-slate-800/50 rounded-md border-2 border-dashed border-slate-700 flex items-center justify-center">
                                        <p className="text-slate-500">Click "Generate Code" to build the page.</p>
                                     </div>
                                 </div>
                            )}
                        </div>
                     </div>
                </div>
            )}

        </div>
    );
};

export default LandingPageArchitect;
    