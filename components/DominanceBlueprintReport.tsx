import React from 'react';
import { DominanceBlueprint, PhyGitalVideoStrategy, UnfairAdvantageSalesProtocol, ClientAcquisitionEngine, VideoStrategy } from '../types';
import VideoWedgeStrategyReport from './VideoWedgeStrategyReport'; 
import SalesPitchAssetReport from './SalesPitchAssetReport';
import AIEnhancementCard from './AIEnhancementCard'; // Added


interface DominanceBlueprintReportProps {
    blueprint: DominanceBlueprint;
    onGenerateMarketMap: () => void;
    phyGitalVideoStrategy: PhyGitalVideoStrategy | null;
    businessVideoStrategy: VideoStrategy | null;
    onGeneratePhygitalDemoVideo: () => void;
    onGenerateVideoForBusinessConcept: () => void;
    onDeployAgents: (play: any, sourceReportType: string) => void;
    onGenerateFirstStrike: () => void;
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

const Section: React.FC<{ title: string; children: React.ReactNode; icon?: string; titleColor?: string }> = ({ title, children, icon, titleColor = 'text-slate-200' }) => (
    <div className="pt-6 border-t border-slate-700">
        <h3 className={`text-xl font-semibold ${titleColor} mb-3 flex items-center`}>
             {icon && <span className="text-2xl mr-3 text-amber-400">{icon}</span>}
             {title}
        </h3>
        <div className="space-y-4">
            {children}
        </div>
        {/* Fix: Replaced incorrect "Section>" with correct closing div tag */}
    </div>
);

const DominanceBlueprintReport: React.FC<DominanceBlueprintReportProps> = ({
    blueprint,
    onGenerateMarketMap,
    phyGitalVideoStrategy,
    businessVideoStrategy,
    onGeneratePhygitalDemoVideo,
    onGenerateVideoForBusinessConcept,
    onDeployAgents,
    onGenerateFirstStrike,
}) => {
    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border-2 border-amber-500/50 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                    👑 Dominance Blueprint
                </h2>
                <p className="text-slate-400 mt-2 mb-8">An investment-grade, AI-generated plan for absolute market domination.</p>

                {/* 10X AI ENHANCEMENT PROTOCOL - MANDATORY INTEGRATION */}
                {blueprint.aiEnhancement && <AIEnhancementCard enhancement={blueprint.aiEnhancement} />}

                {blueprint.conceptualImageUrl && (
                    <img src={blueprint.conceptualImageUrl} alt="Conceptual image of the business" className="rounded-lg shadow-lg my-8" />
                )}
                
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 text-left mt-8">
                    <h3 className="text-lg font-semibold text-amber-300">Executive Summary</h3>
                    <p className="text-slate-300 text-sm mt-2">{blueprint.executiveSummary}</p>
                </div>
            </div>

            <div className="mt-8 space-y-8">
                <Section title="Acquisition Strategy" icon="🚀">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <h4 className="font-bold text-cyan-300 mb-2">Traction Channels</h4>
                            <ul className="space-y-2">
                                {blueprint.clientAcquisitionEngine.tractionChannelAnalysis.map((c, i) => (
                                    <li key={i} className="text-xs text-slate-300">
                                        <span className="font-bold text-teal-400">{c.channel}:</span> {c.rationale}
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <h4 className="font-bold text-cyan-300 mb-2">Dream 100 List</h4>
                            <ul className="space-y-2">
                                {blueprint.clientAcquisitionEngine.dream100Protocol.map((d, i) => (
                                    <li key={i} className="text-xs text-slate-300">
                                        <span className="font-bold text-teal-400">Target:</span> {d.targetDescription}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Section>
                
                <Section title="Sales Protocol" icon="💰">
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                         <h4 className="font-bold text-rose-400 mb-2">{blueprint.unfairAdvantageSalesProtocol.agoraAngle.headlineAndHook}</h4>
                         <p className="text-xs text-slate-400 italic">Level of Sophistication: {blueprint.unfairAdvantageSalesProtocol.agoraAngle.marketSophisticationLevel}</p>
                         <div className="mt-4 pt-4 border-t border-slate-800">
                            <p className="text-sm text-slate-200">"{blueprint.unfairAdvantageSalesProtocol.belfortStraightLine.openingScript}"</p>
                         </div>
                    </div>
                </Section>

                <div className="pt-8 mt-8 border-t-2 border-dashed border-red-500/30 text-center no-print">
                    <button
                        onClick={onGenerateFirstStrike}
                        className="bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold py-3 px-6 rounded-lg hover:from-red-700 hover:to-rose-600 transition duration-200 shadow-lg text-lg"
                    >
                        Generate First Strike Protocol
                    </button>
                    <p className="text-xs text-slate-500 mt-2">Bridge the gap from strategy to execution. Find your first 3-5 targets now.</p>
                </div>
            </div>
            
            <Methodology models={blueprint.methodology} />
        </div>
    );
};

export default DominanceBlueprintReport;