
import React, { useState, Suspense, lazy } from 'react';
import { 
    OpportunityBrief, 
    AICode, 
    LandingPageBlueprint, 
    MarketMindAnalysis, 
    QuantitativeModel, 
    DataVisualizationSuiteForQuant 
} from '../types';
import LandingPageArchitect from './LandingPageArchitect';
import SalesPitchAssetReport from './SalesPitchAssetReport';
import AIEnhancementCard from './AIEnhancementCard';

// Added: Missing props interface definition
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

const OpportunityBriefReport: React.FC<OpportunityBriefReportProps> = ({ 
    brief, 
    generatedCode, 
    onGenerateCodeFromOpportunity, 
    landingPageBlueprint, 
    landingPageCode, 
    onGenerateLandingPageBlueprint, 
    onGenerateLandingPageCode, 
    onGenerateAIVideoFoundry, 
    onGenerateArchimedes 
}) => {
    return (
        <>
            <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border border-amber-500/50 shadow-2xl p-6 animate-fade-in">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 text-center">
                    Monetizable Opportunity Brief
                </h2>
                <p className="text-center text-slate-400 mt-1 mb-8">A ruthless, AI-driven analysis focused on finding immediate revenue.</p>
                
                 {/* 10X ENHANCEMENT LAYER */}
                {brief.aiEnhancement && <AIEnhancementCard enhancement={brief.aiEnhancement} />}

                 {/* HAIR ON FIRE SECTION */}
                <div className="space-y-6 mt-8">
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <h3 className="text-xl font-bold text-amber-300">The Starving Crowd</h3>
                        <p className="text-slate-200 mt-2">{brief.starvingCrowd.name}: {brief.starvingCrowd.description}</p>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <h3 className="text-xl font-bold text-amber-300">The Aspirin Problem</h3>
                        <p className="text-slate-200 mt-2">{brief.aspirinProblem.problem}</p>
                    </div>
                </div>

                {brief.aiPoweredSolution && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold text-slate-100 mb-4">AI-Powered Solution</h3>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                            <h4 className="text-lg font-bold text-teal-400">{brief.aiPoweredSolution.solutionName}</h4>
                            <p className="text-slate-300 mt-2">{brief.aiPoweredSolution.description}</p>
                            <div className="mt-4 pt-4 border-t border-slate-800">
                                <p className="text-sm font-bold text-amber-400 uppercase">Irresistible Offer:</p>
                                <p className="text-slate-200">{brief.aiPoweredSolution.irresistibleOffer}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="mt-12 text-center">
                    <button 
                        onClick={() => onGenerateArchimedes(brief)}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition"
                    >
                        Initialize Archimedes Execution Protocol
                    </button>
                </div>
            </div>
            
            <div className="mt-8">
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
