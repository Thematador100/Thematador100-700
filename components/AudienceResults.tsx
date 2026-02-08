
import React from 'react';
import { 
    AnalysisResult, 
    DiscoveredAudience, 
    ScoredProspect, 
    MonetizationStrategy, 
    HighLeveragePlaybook, 
    StrategicBrief,
    B2CDiscoveredAudience,
    OpportunityBrief,
    CompetitiveDisplacementBrief,
    AlphaAcquisitionPlaybook,
    VideoStrategy,
    AIVentureBlueprint,
    AICode,
    LookalikeProspect,
    B2CMarketDeconstruction,
    DominanceBlueprint,
    PhyGitalVideoStrategy,
    LandingPageBlueprint,
    AlphaSignalReport,
    ChimericAgentReport,
    LoneWolfReport,
    GatekeeperBypassReport,
    CashflowProtocolReport,
    RealEstateAlphaReport,
    ImageFoundryResult,
    SalesCopilotResponse,
    SovereignEngineReport,
    ArchimedesProtocolReport,
    FirstStrikeReport,
    AIVideoFoundryReport,
    EdgarAnomalyReport,
    LiveMarketIntelReport,
    DemandSignalReport,
    MarketMap,
    OpportunityRadarReport
} from '../types';
import DiscoveredAudienceCard from './DiscoveredAudienceCard';
import B2BAnalysisReport from './B2BAnalysisReport';
import ProspectScorer from './ProspectScorer';
import MonetizationStrategyReport from './MonetizationStrategyReport';
import HighLeveragePlaybookReport from './HighLeveragePlaybookReport';
import LeadCard from './LeadCard';
import B2CDeconReport from './B2CDeconReport';
import OpportunityBriefReport from './OpportunityBriefReport';
import CompetitiveDisplacementReport from './CompetitiveDisplacementReport';
import AIVentureBlueprintReport from './AIVentureBlueprintReport';
import DominanceBlueprintReport from './DominanceBlueprintReport';
import AlphaSignalReportComponent from './AlphaSignalReport';
import ChimericAgentReportComponent from './ChimericAgentReport';
import LoneWolfReportComponent from './LoneWolfReport';
import GatekeeperBypassReportComponent from './GatekeeperBypassReportComponent';
import CashflowProtocolReportComponent from './CashflowProtocolReportComponent';
import RealEstateAlphaReportComponent from './RealEstateAlphaReportComponent';
import ImageFoundryReport from './ImageFoundryReport';
import SalesCopilotReportComponent from './SalesCopilotReportComponent';
import SovereignEngineReportComponent from './SovereignEngineReport';
import ArchimedesProtocolReportComponent from './ArchimedesProtocolReport';
import { FirstStrikeReportComponent } from './FirstStrikeReport';
import AIVideoFoundryReportComponent from './AIVideoFoundryReport';
import EdgarAnomalyReportComponent from './EdgarAnomalyReportComponent';
import LiveMarketIntelReportComponent from './LiveMarketIntelReportComponent';
import MarketMapReport from './MarketMapReport';
import { DemandSignalReportComponent } from './DemandSignalReportComponent';
import { OpportunityRadarReportComponent } from './OpportunityRadarReport';

interface AudienceResultsProps {
    analysisType: Exclude<StrategicBrief['analysisType'], 'veoVideo'>;
    analysis: AnalysisResult | null;
    discovery: DiscoveredAudience[] | null;
    b2cDiscovery: B2CDiscoveredAudience[] | null;
    b2cDeconResult: B2CMarketDeconstruction | null;
    opportunityBrief: OpportunityBrief | null;
    competitiveDisplacementBrief: CompetitiveDisplacementBrief | null;
    aiVentureBlueprint: AIVentureBlueprint | null;
    dominanceBlueprint: DominanceBlueprint | null;
    alphaSignalReport: AlphaSignalReport | null;
    chimericAgentReport: ChimericAgentReport | null;
    loneWolfReport: LoneWolfReport | null;
    gatekeeperBypassReport: GatekeeperBypassReport | null;
    cashflowProtocolReport: CashflowProtocolReport | null;
    realEstateAlphaReport: RealEstateAlphaReport | null;
    imageFoundryResult: ImageFoundryResult | null;
    salesCopilotReport: SalesCopilotResponse | null;
    sovereignEngineReport: SovereignEngineReport | null;
    archimedesProtocolReport: ArchimedesProtocolReport | null;
    firstStrikeReport: FirstStrikeReport | null;
    aiVideoFoundryReport: AIVideoFoundryReport | null;
    edgarAnomalyReport: EdgarAnomalyReport | null;
    liveMarketIntelReport: LiveMarketIntelReport | null;
    demandSignalReport: DemandSignalReport | null;
    opportunityRadarReport?: OpportunityRadarReport | null;
    scoredProspects: ScoredProspect[] | null;
    monetizationStrategy: MonetizationStrategy | null;
    playbook: HighLeveragePlaybook | null;
    alphaAcquisitionPlaybook: AlphaAcquisitionPlaybook | null;
    onScore: (prospectsToScore: string) => void;
    onMonetize: (audience: DiscoveredAudience | B2CDiscoveredAudience) => void;
    onGeneratePlaybook: () => void;
    onGenerateAcquisitionPlaybook: () => void;
    onRediscover: () => void;
    onValidateLeads: (prospectsToValidate: LookalikeProspect[]) => void;
    activeAudience: DiscoveredAudience | B2CDiscoveredAudience | null;
    videoStrategy: VideoStrategy | null;
    businessVideoStrategy: VideoStrategy | null;
    phyGitalVideoStrategy: PhyGitalVideoStrategy | null;
    onGenerateVideoWedge: () => void;
    onGenerateVideoForBusinessConcept: () => void;
    onGeneratePhygitalDemoVideo: () => void;
    generatedCode: AICode | null;
    onGenerateCode: (prompt: string) => void;
    onGenerateCodeFromOpportunity: (brief: OpportunityBrief) => void;
    landingPageBlueprint: LandingPageBlueprint | null;
    landingPageCode: AICode | null;
    onGenerateLandingPageBlueprint: (prompt: string) => void;
    onGenerateLandingPageCode: () => void;
    onDeployAgents: (play: any, sourceReportType: string) => void;
    marketMap: MarketMap | null;
    onGenerateMarketMap: (context: any, sourceReportType: string) => void;
    onSaveProject: (name: string) => void;
    onGenerateFirstStrike: (context: any) => void;
    onGenerateAIVideoFoundry: (script: string) => void;
    onGenerateArchimedes: (context: any) => void;
}

const ZoneHeader: React.FC<{ title: string; icon: string }> = ({ title, icon }) => (
    <div className="flex items-center gap-3 py-6 mt-8 mb-4 border-b-2 border-slate-800">
        <div className="p-2 bg-slate-800 rounded-lg border border-slate-700 shadow-sm">
            <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-2xl font-black text-slate-200 uppercase tracking-wide">{title}</h3>
    </div>
);

const AudienceResults: React.FC<AudienceResultsProps> = ({
    analysisType, analysis, discovery, b2cDiscovery, b2cDeconResult, opportunityBrief, competitiveDisplacementBrief, 
    aiVentureBlueprint, dominanceBlueprint, alphaSignalReport, chimericAgentReport, loneWolfReport, 
    gatekeeperBypassReport, cashflowProtocolReport, realEstateAlphaReport, imageFoundryResult,
    salesCopilotReport, sovereignEngineReport, archimedesProtocolReport, firstStrikeReport, aiVideoFoundryReport,
    edgarAnomalyReport, liveMarketIntelReport, demandSignalReport, opportunityRadarReport,
    scoredProspects, monetizationStrategy, playbook, alphaAcquisitionPlaybook, onScore, onMonetize, 
    onGeneratePlaybook, onGenerateAcquisitionPlaybook, onRediscover, onValidateLeads, activeAudience,
    videoStrategy, businessVideoStrategy, phyGitalVideoStrategy, onGenerateVideoWedge, onGenerateVideoForBusinessConcept, 
    onGeneratePhygitalDemoVideo, generatedCode, onGenerateCode, onGenerateCodeFromOpportunity, landingPageBlueprint, landingPageCode, 
    onGenerateLandingPageBlueprint, onGenerateLandingPageCode, onDeployAgents, marketMap, onGenerateMarketMap, onSaveProject,
    onGenerateFirstStrike, onGenerateAIVideoFoundry, onGenerateArchimedes
}) => {
    
    // Robust checks to prevent crashes. Even if data is malformed, we default to empty arrays.
    const b2bAudiences = Array.isArray(discovery) ? discovery : [];
    const b2cAudiences = Array.isArray(b2cDiscovery) ? b2cDiscovery : [];

    // Aggregating all data presence to determine if we should show the empty state
    const hasAnyData = 
        analysis || 
        b2bAudiences.length > 0 || 
        b2cAudiences.length > 0 || 
        b2cDeconResult ||
        opportunityBrief ||
        competitiveDisplacementBrief ||
        aiVentureBlueprint ||
        dominanceBlueprint ||
        alphaSignalReport ||
        chimericAgentReport ||
        loneWolfReport ||
        gatekeeperBypassReport ||
        cashflowProtocolReport ||
        realEstateAlphaReport ||
        imageFoundryResult ||
        salesCopilotReport ||
        sovereignEngineReport ||
        aiVideoFoundryReport ||
        edgarAnomalyReport ||
        liveMarketIntelReport ||
        demandSignalReport ||
        opportunityRadarReport;

    if (!hasAnyData) {
        return (
            <div className="mt-8 bg-slate-900/50 border border-slate-700 rounded-xl p-12 text-center animate-fade-in">
                <div className="text-4xl mb-4">🔮</div>
                <h3 className="text-xl font-bold text-slate-300">Ready for Analysis</h3>
                <p className="text-slate-400 mt-2">
                    Select a protocol from the Mission Briefing above and click the button to generate intelligence.
                </p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in space-y-8">
            <div className="flex justify-between items-center mb-6 no-print">
                <h2 className="text-xl font-bold text-slate-400">Strategic Intelligence Dashboard</h2>
                <div className="flex gap-2">
                    <button onClick={() => window.print()} className="text-sm bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-md transition">
                        Print / Save PDF
                    </button>
                    <button onClick={() => {
                        const name = prompt("Enter project name:");
                        if (name) onSaveProject(name);
                    }} className="text-sm bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition">
                        Save Project
                    </button>
                </div>
            </div>

            {/* --- SECTION 1: CORE INTELLIGENCE REPORTS --- */}
            <ZoneHeader title="Intelligence Reports" icon="📡" />
            
            {/* B2B Analysis */}
            {analysis && <div className="animate-fade-in"><B2BAnalysisReport analysis={analysis} /></div>}
            
            {/* B2B Audiences */}
            {b2bAudiences.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                    {b2bAudiences.map((audience, index) => (
                        <DiscoveredAudienceCard 
                            key={index} 
                            audience={audience} 
                            index={index} 
                            analysisType={'b2b'}
                            onMonetize={onMonetize}
                            activeAudienceName={activeAudience?.audienceName}
                        />
                    ))}
                </div>
            )}

            {/* B2C Audiences */}
            {b2cAudiences.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                    {b2cAudiences.map((audience, index) => (
                        <DiscoveredAudienceCard 
                            key={index} 
                            audience={audience} 
                            index={index} 
                            analysisType={'b2c'}
                            onMonetize={onMonetize}
                            activeAudienceName={activeAudience?.audienceName}
                        />
                    ))}
                </div>
            )}
            
            {/* B2C Discover (Deconstruction) */}
            {b2cDeconResult && (
                <div className="animate-fade-in"><B2CDeconReport brief={b2cDeconResult} onGenerateMarketMap={() => onGenerateMarketMap(b2cDeconResult, 'B2C Market Deconstruction')} /></div>
            )}

            {/* Opportunity Brief (Starving Crowd) - Includes Foundry & Landing Page */}
            {opportunityBrief && (
                <div className="animate-fade-in">
                    <OpportunityBriefReport 
                        brief={opportunityBrief} 
                        generatedCode={generatedCode}
                        onGenerateCodeFromOpportunity={onGenerateCodeFromOpportunity}
                        landingPageBlueprint={landingPageBlueprint}
                        landingPageCode={landingPageCode}
                        onGenerateLandingPageBlueprint={onGenerateLandingPageBlueprint}
                        onGenerateLandingPageCode={onGenerateLandingPageCode}
                        onGenerateAIVideoFoundry={onGenerateAIVideoFoundry}
                        onGenerateArchimedes={onGenerateArchimedes}
                    />
                </div>
            )}

            {/* Competitive Displacement */}
            {competitiveDisplacementBrief && (
                <div className="animate-fade-in">
                    <CompetitiveDisplacementReport 
                        brief={competitiveDisplacementBrief} 
                        onGenerateVideoWedge={onGenerateVideoWedge} 
                        videoStrategy={videoStrategy}
                        onGenerateMarketMap={() => onGenerateMarketMap(competitiveDisplacementBrief, 'Competitive Displacement Brief')}
                    />
                </div>
            )}

            {/* AI Venture Blueprint (Foundry) */}
            {aiVentureBlueprint && (
                <div className="animate-fade-in">
                    <AIVentureBlueprintReport blueprint={aiVentureBlueprint} onGenerateCode={onGenerateCode} generatedCode={generatedCode} />
                </div>
            )}

            {/* Dominance Blueprint */}
            {dominanceBlueprint && (
                <div className="animate-fade-in">
                    <DominanceBlueprintReport 
                        blueprint={dominanceBlueprint} 
                        onGenerateMarketMap={() => onGenerateMarketMap(dominanceBlueprint, 'Dominance Blueprint')}
                        phyGitalVideoStrategy={phyGitalVideoStrategy}
                        businessVideoStrategy={businessVideoStrategy}
                        onGeneratePhygitalDemoVideo={onGeneratePhygitalDemoVideo}
                        onGenerateVideoForBusinessConcept={onGenerateVideoForBusinessConcept}
                        onDeployAgents={onDeployAgents}
                        onGenerateFirstStrike={() => onGenerateFirstStrike(dominanceBlueprint)}
                    />
                </div>
            )}

            {/* Various Specialized Reports */}
            {alphaSignalReport && <div className="animate-fade-in"><AlphaSignalReportComponent report={alphaSignalReport} onDeployAgents={onDeployAgents} /></div>}
            {chimericAgentReport && <div className="animate-fade-in"><ChimericAgentReportComponent report={chimericAgentReport} onDeployAgents={onDeployAgents} /></div>}
            {loneWolfReport && <div className="animate-fade-in"><LoneWolfReportComponent report={loneWolfReport} onDeployAgents={onDeployAgents} /></div>}
            {gatekeeperBypassReport && <div className="animate-fade-in"><GatekeeperBypassReportComponent report={gatekeeperBypassReport} /></div>}
            {cashflowProtocolReport && <div className="animate-fade-in"><CashflowProtocolReportComponent report={cashflowProtocolReport} onDeployAgents={onDeployAgents} /></div>}
            {realEstateAlphaReport && <div className="animate-fade-in"><RealEstateAlphaReportComponent report={realEstateAlphaReport} onDeployAgents={onDeployAgents} onGenerateFirstStrike={() => onGenerateFirstStrike(realEstateAlphaReport)} /></div>}

            {/* SEC / Edgar Anomaly - RESTORED */}
            {edgarAnomalyReport && (
                <div className="animate-fade-in"><EdgarAnomalyReportComponent report={edgarAnomalyReport} /></div>
            )}
            
            {/* Live Intel & Demand Signal */}
            {liveMarketIntelReport && <div className="animate-fade-in"><LiveMarketIntelReportComponent report={liveMarketIntelReport} /></div>}
            {demandSignalReport && <div className="animate-fade-in"><DemandSignalReportComponent report={demandSignalReport} /></div>}

            {/* Opportunity Radar */}
            {opportunityRadarReport && (
                <div className="animate-fade-in">
                    <OpportunityRadarReportComponent 
                        report={opportunityRadarReport} 
                        onGenerateCode={onGenerateCode}
                        generatedCode={generatedCode}
                    />
                </div>
            )}

            {/* --- SECTION 2: TACTICAL EXECUTION (Prospects, Monetization, Playbooks) --- */}
            {(monetizationStrategy || playbook || analysis?.lookalikeProspects) && (
                <ZoneHeader title="Tactical Execution" icon="⚔️" />
            )}

            {analysis && analysis.lookalikeProspects && (
                <div className="mt-12 space-y-6 pt-8 border-t border-slate-700">
                    <h3 className="text-xl font-bold text-slate-200">Lookalike Prospects (Based on ICP)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {analysis.lookalikeProspects.map((p, i) => (
                            <LeadCard 
                                key={i} 
                                prospect={p} 
                                isSelected={false} 
                                onToggleSelect={() => {}} 
                            />
                        ))}
                    </div>
                    
                    <div className="mt-8 flex justify-center no-print">
                        <button
                            onClick={() => onValidateLeads(analysis.lookalikeProspects)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg"
                        >
                            Validate All Leads with AI
                        </button>
                    </div>
                </div>
            )}

            {(analysis || b2bAudiences.length > 0 || b2cAudiences.length > 0) && (
                <div className="mt-12 space-y-12">
                    <ProspectScorer onScore={onScore} scoredProspects={scoredProspects} />
                </div>
            )}
            
            {monetizationStrategy && (
                <div className="animate-fade-in">
                    <MonetizationStrategyReport 
                        strategy={monetizationStrategy} 
                        onGeneratePlaybook={onGeneratePlaybook}
                        analysisType={analysisType as 'b2b' | 'b2c'}
                        onGenerateArchimedes={onGenerateArchimedes}
                    />
                </div>
            )}

            {playbook && (
                <div className="animate-fade-in">
                    <HighLeveragePlaybookReport 
                        playbook={playbook} 
                        analysisType={analysisType as 'b2b' | 'b2c'}
                        onGenerateAcquisitionPlaybook={onGenerateAcquisitionPlaybook}
                        alphaAcquisitionPlaybook={alphaAcquisitionPlaybook}
                        onDeployAgents={onDeployAgents}
                        onGenerateAIVideoFoundry={onGenerateAIVideoFoundry}
                        onGenerateArchimedes={onGenerateArchimedes}
                    />
                </div>
            )}

            {firstStrikeReport && <div className="animate-fade-in"><FirstStrikeReportComponent report={firstStrikeReport} /></div>}
            {marketMap && <div className="animate-fade-in"><MarketMapReport report={marketMap} /></div>}


            {/* --- SECTION 3: ASSET FOUNDRY (Video, Images, Code) --- */}
            {(aiVideoFoundryReport || imageFoundryResult || sovereignEngineReport || archimedesProtocolReport) && (
                <ZoneHeader title="Asset Foundry" icon="🏭" />
            )}
            
            {/* AI Video Foundry - RESTORED */}
            {aiVideoFoundryReport && (
                <div className="animate-fade-in pt-8 border-t border-slate-700">
                    <AIVideoFoundryReportComponent report={aiVideoFoundryReport} />
                </div>
            )}

            {imageFoundryResult && (
                <div className="animate-fade-in pt-8 border-t border-slate-700"><ImageFoundryReport result={imageFoundryResult} /></div>
            )}
            
            {salesCopilotReport && (
                <div className="animate-fade-in"><SalesCopilotReportComponent report={salesCopilotReport} /></div>
            )}

            {sovereignEngineReport && (
                <div className="animate-fade-in"><SovereignEngineReportComponent report={sovereignEngineReport} /></div>
            )}

            {/* Archimedes Report */}
            {archimedesProtocolReport && (
                <div id="archimedes-report-section" className="mt-12 border-t-4 border-amber-500/30 pt-12 animate-fade-in">
                    <h3 className="text-2xl font-bold text-center text-amber-300 mb-6 uppercase tracking-widest">
                        Tactical Automation Layer
                    </h3>
                    <ArchimedesProtocolReportComponent report={archimedesProtocolReport} onDeployAgents={onDeployAgents} />
                </div>
            )}
        </div>
    );
};

export default AudienceResults;
