
import React from 'react';
import { DominanceBlueprint, PhyGitalVideoStrategy, ProprietaryAiSymbiosis, SEOCompetitorAnalysis, UnfairAdvantageSalesProtocol, ValuationMultiplier, ClientAcquisitionEngine, VideoStrategy } from '../types';
import VideoWedgeStrategyReport from './VideoWedgeStrategyReport'; // Re-using for display
import SalesPitchAssetReport from './SalesPitchAssetReport';


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
    </div>
);

const PhyGitalVideoStrategyReport: React.FC<{ strategy: PhyGitalVideoStrategy }> = ({ strategy }) => (
    <div className="animate-fade-in space-y-6 mt-6">
        <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            🎬 Phygital Video Strategy
        </h3>
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <p><strong>Title:</strong> {strategy.videoTitle}</p>
            <p><strong>Target Audience:</strong> {strategy.targetAudience}</p>
            <p><strong>Core Message:</strong> "{strategy.coreMessage}"</p>
        </div>
        {/* Re-using VideoWedgeStrategyReport for consistent script display */}
        <VideoWedgeStrategyReport strategy={{
            script: strategy.script,
            videoGenerationPrompt: strategy.aiVideoPrompt,
            distributionStrategy: strategy.distributionPlan,
        }} />
    </div>
);

const ClientAcquisitionEngineReport: React.FC<{ engine: ClientAcquisitionEngine, onDeploy: () => void }> = ({ engine, onDeploy }) => {
    if (!engine) return null;

    return (
        <div className="bg-purple-900/20 border border-purple-500/50 p-4 rounded-lg space-y-4">
            <h4 className="text-xl font-bold text-purple-300 text-center">24/7 Client Acquisition Engine</h4>
            
            <div className="bg-slate-900/50 p-3 rounded-lg">
                <h5 className="font-bold text-cyan-300">Traction Channel Analysis (Weinberg)</h5>
                <div className="mt-2 space-y-2">
                    {engine.tractionChannelAnalysis?.map((channel, i) => (
                        <div key={i} className="p-2 rounded bg-slate-950">
                            <p className="font-semibold text-slate-100 text-sm">{channel.channel}</p>
                            <p className="text-slate-400 text-xs mt-1 italic">{channel.rationale}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-slate-900/50 p-3 rounded-lg">
                <h5 className="font-bold text-cyan-300">"Dream 100" Protocol (Brunson)</h5>
                 <div className="mt-2 space-y-2">
                    {engine.dream100Protocol?.map((target, i) => (
                        <div key={i} className="p-2 rounded bg-slate-950">
                            <p className="font-semibold text-slate-100 text-sm">{target.targetDescription}</p>
                            <p className="text-slate-400 text-xs mt-1 italic">{target.rationale}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-slate-900/50 p-3 rounded-lg">
                <h5 className="font-bold text-cyan-300">Strategic Partnership Protocol (Serling)</h5>
                <p className="text-xs text-slate-400 mt-1">Partner Profile: <span className="font-semibold text-slate-200">{engine.strategicPartnershipProtocol?.idealPartnerProfile}</span></p>
                <p className="text-xs text-slate-400 mt-1">Irresistible Offer: <span className="font-semibold text-slate-200">"{engine.strategicPartnershipProtocol?.irresistibleOffer}"</span></p>
                <blockquote className="mt-2 border-l-2 border-cyan-400 pl-2 text-xs text-slate-300 italic">Outreach Angle: {engine.strategicPartnershipProtocol?.outreachAngle}</blockquote>
            </div>
            
            <div className="text-center pt-4 border-t border-slate-800">
                <button
                    onClick={onDeploy}
                    className="bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition"
                >
                    Deploy Acquisition Agents
                </button>
            </div>
        </div>
    );
};


const UnfairAdvantageSalesProtocolReport: React.FC<{ protocol: UnfairAdvantageSalesProtocol }> = ({ protocol }) => {
    if (!protocol) return null;
    return (
        <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg space-y-4">
            <h4 className="text-xl font-bold text-red-300 text-center">Unfair Advantage Sales Protocol</h4>
            {/* Agora Angle */}
            <div className="bg-slate-900/50 p-3 rounded-lg">
                <h5 className="font-bold text-rose-300">The Agora Angle (Market-Aware Copy)</h5>
                <p className="text-xs text-slate-400 mt-1">Sophistication: <span className="font-semibold text-slate-200">{protocol.agoraAngle?.marketSophisticationLevel}</span></p>
                <p className="text-xs text-slate-400 mt-1">Headline/Hook: <span className="font-semibold text-slate-200">"{protocol.agoraAngle?.headlineAndHook}"</span></p>
                <blockquote className="mt-2 border-l-2 border-rose-400 pl-2 text-xs text-slate-300 italic">Core Angle: {protocol.agoraAngle?.coreBodyCopyAngle}</blockquote>
            </div>
            {/* Belfort Straight Line */}
            <div className="bg-slate-900/50 p-3 rounded-lg">
                <h5 className="font-bold text-rose-300">The Belfort "Straight Line" Sequence</h5>
                <p className="text-xs text-slate-400 mt-1 italic">Opening: "{protocol.belfortStraightLine?.openingScript}"</p>
                <p className="text-xs text-slate-400 mt-2">Intel Questions:</p>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 mt-1 pl-2">
                    {protocol.belfortStraightLine?.intelligenceGatheringQuestions?.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
            </div>
            {/* Fladlien Offer Stack */}
            <div className="bg-slate-900/50 p-3 rounded-lg">
                <h5 className="font-bold text-rose-300">The Fladlien/Popeil Irresistible Offer Stack</h5>
                <p className="text-xs text-slate-200 mt-1 font-semibold">Core: {protocol.fladlienOfferStack?.coreOffer}</p>
                <div className="mt-2 space-y-1">
                    {protocol.fladlienOfferStack?.premiumBonuses?.map((b, i) => (
                        b ? <p key={i} className="text-xs text-slate-300">+ {b.name} <span className="text-amber-300">(Value: {b.value})</span></p> : null
                    ))}
                </div>
                <p className="text-xs text-slate-200 mt-2">Risk Reversal: <span className="font-semibold text-green-300">{protocol.fladlienOfferStack?.riskReversal}</span></p>
                <p className="text-xs text-slate-200 mt-2">Urgency Driver: <span className="font-semibold text-red-300">{protocol.fladlienOfferStack?.urgencyDriver}</span></p>
            </div>
            {/* Bleeding Neck Qualification */}
            <div className="bg-slate-900/50 p-3 rounded-lg">
                <h5 className="font-bold text-rose-300">"Bleeding Neck" Qualification</h5>
                <p className="text-xs text-slate-400 mt-1 italic">{protocol.bleedingNeckQualification?.rationale}</p>
                <p className="text-xs text-slate-400 mt-2">Filter Questions:</p>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 mt-1 pl-2">
                    {protocol.bleedingNeckQualification?.filterQuestions?.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
            </div>
        </div>
    );
};


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
                {blueprint.conceptualImageUrl && (
                    <img src={blueprint.conceptualImageUrl} alt="Conceptual image of the business" className="rounded-lg shadow-lg mb-8" />
                )}
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 text-left">
                    <h3 className="text-lg font-semibold text-amber-300">Executive Summary</h3>
                    <p className="text-slate-300 text-sm mt-2">{blueprint.executiveSummary}</p>
                </div>
            </div>

            <div className="mt-8 space-y-8">
                <Section title="Client Acquisition & Sales" icon="🚀">
                    <ClientAcquisitionEngineReport engine={blueprint.clientAcquisitionEngine} onDeploy={() => onDeployAgents(blueprint.clientAcquisitionEngine, 'Dominance Blueprint Acquisition Engine')} />
                    <UnfairAdvantageSalesProtocolReport protocol={blueprint.unfairAdvantageSalesProtocol} />
                </Section>
                
                {phyGitalVideoStrategy && (
                     <Section title="Phygital Video Strategy" icon="🎬">
                        <PhyGitalVideoStrategyReport strategy={phyGitalVideoStrategy} />
                    </Section>
                )}
                {!phyGitalVideoStrategy && blueprint.phygitalSynergyProtocol && (
                    <div className="text-center no-print">
                         <button onClick={onGeneratePhygitalDemoVideo} className="bg-gradient-to-r from-pink-600 to-purple-500 text-white font-bold py-2 px-4 rounded-lg">Generate "Billy Mays" Demo Video</button>
                    </div>
                )}
                
                 {businessVideoStrategy && (
                     <Section title="Brand Manifesto Video" icon="🎬">
                        <VideoWedgeStrategyReport strategy={businessVideoStrategy} />
                    </Section>
                )}
                 {!businessVideoStrategy && (
                    <div className="text-center no-print">
                         <button onClick={onGenerateVideoForBusinessConcept} className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold py-2 px-4 rounded-lg">Generate Brand Manifesto Video</button>
                    </div>
                )}


                <div className="pt-8 mt-8 border-t-2 border-dashed border-cyan-500/30 text-center no-print">
                    <button
                        onClick={onGenerateMarketMap}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition duration-200 shadow-lg"
                    >
                        Generate Full Market Map
                    </button>
                    <p className="text-xs text-slate-500 mt-2">Expand this blueprint to the entire market landscape.</p>
                </div>

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
