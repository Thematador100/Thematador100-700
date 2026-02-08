
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AudienceForm from './components/AudienceForm';
import AudienceResults from './components/AudienceResults';
import AgentCommandCenter from './components/AgentCommandCenter';
import AuthModal from './components/AuthModal';
import ProjectManager from './components/ProjectManager';
import FirebaseConfigModal from './components/FirebaseConfigModal';
import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from './components/LandingPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { 
    StrategicBrief, 
    Project, 
    SovereignAgent, 
    ProjectResults,
    LoneWolfReport,
    ChimericAgentReport,
    GatekeeperBypassReport,
    AIVentureBlueprint,
    OpportunityBrief,
    AnalysisResult,
    DominanceBlueprint,
    CashflowProtocolReport,
    RealEstateAlphaReport,
    AlphaSignalReport,
    CompetitiveDisplacementBrief,
    B2CMarketDeconstruction,
    LiveMarketIntelReport,
    DemandSignalReport,
    OpportunityRadarReport,
    EdgarAnomalyReport,
    AIVideoFoundryReport,
    MonetizationStrategy,
    HighLeveragePlaybook,
    AlphaAcquisitionPlaybook,
    AICode,
    LandingPageBlueprint,
    FirstStrikeReport,
    ArchimedesProtocolReport,
    ScoredProspect
} from './types';
import { 
    generateLoneWolfReport, 
    generateChimericAgentReport, 
    generateGatekeeperBypassReport,
    generateSovereignAgents,
    generateAIVentureBlueprint,
    generateOpportunityBrief,
    generateB2BAnalysis,
    generateDominanceBlueprint,
    generateCashflowProtocol,
    generateRealEstateAlpha,
    generateAlphaSignalReport,
    generateCompetitiveDisplacementBrief,
    generateB2CDeconstruction,
    generateLiveMarketIntel,
    generateDemandSignal,
    generateOpportunityRadar,
    generateEdgarAnomaly,
    generateAIVideoFoundry,
    generateHighLeveragePlaybook,
    generateAlphaAcquisitionPlaybook,
    generateAICode,
    generateLandingPageBlueprint,
    generateLandingPageCode,
    scoreProspectsList
} from './services/geminiService';
import { saveProjectToFirestore, getProjectsFromFirestore, deleteProjectFromFirestore, saveAgentsToFirestore, getAgentsFromFirestore } from './services/firebaseService';

const AppContent: React.FC = () => {
    const { currentUser } = useAuth();
    const [currentView, setCurrentView] = useState<'landing' | 'strategy' | 'commandCenter'>('landing');
    const [isTurboMode, setIsTurboMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [brief, setBrief] = useState<StrategicBrief | null>(null);
    const [analysisType, setAnalysisType] = useState<StrategicBrief['analysisType']>('b2b');
    const [generationError, setGenerationError] = useState<string | null>(null);
    
    // Project Results State
    const [loneWolfReport, setLoneWolfReport] = useState<LoneWolfReport | null>(null);
    const [chimericAgentReport, setChimericAgentReport] = useState<ChimericAgentReport | null>(null);
    const [gatekeeperBypassReport, setGatekeeperBypassReport] = useState<GatekeeperBypassReport | null>(null);
    const [aiVentureBlueprint, setAIVentureBlueprint] = useState<AIVentureBlueprint | null>(null);
    const [opportunityBrief, setOpportunityBrief] = useState<OpportunityBrief | null>(null);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [dominanceBlueprint, setDominanceBlueprint] = useState<DominanceBlueprint | null>(null);
    const [cashflowProtocolReport, setCashflowProtocolReport] = useState<CashflowProtocolReport | null>(null);
    const [realEstateAlphaReport, setRealEstateAlphaReport] = useState<RealEstateAlphaReport | null>(null);
    const [alphaSignalReport, setAlphaSignalReport] = useState<AlphaSignalReport | null>(null);
    const [competitiveDisplacementBrief, setCompetitiveDisplacementBrief] = useState<CompetitiveDisplacementBrief | null>(null);
    const [b2cDeconResult, setB2CDeconResult] = useState<B2CMarketDeconstruction | null>(null);
    
    // Deep Recon State (Restored)
    const [liveMarketIntelReport, setLiveMarketIntelReport] = useState<LiveMarketIntelReport | null>(null);
    const [demandSignalReport, setDemandSignalReport] = useState<DemandSignalReport | null>(null);
    const [opportunityRadarReport, setOpportunityRadarReport] = useState<OpportunityRadarReport | null>(null);
    const [edgarAnomalyReport, setEdgarAnomalyReport] = useState<EdgarAnomalyReport | null>(null);
    const [aiVideoFoundryReport, setAIVideoFoundryReport] = useState<AIVideoFoundryReport | null>(null);
    
    // Fabrication State (Foundry, Code, Pages)
    const [generatedCode, setGeneratedCode] = useState<AICode | null>(null);
    const [landingPageBlueprint, setLandingPageBlueprint] = useState<LandingPageBlueprint | null>(null);
    const [landingPageCode, setLandingPageCode] = useState<AICode | null>(null);
    const [scoredProspects, setScoredProspects] = useState<ScoredProspect[] | null>(null);
    
    // Legacy support states (for MonetizationStrategyReport usage)
    const [monetizationStrategy, setMonetizationStrategy] = useState<MonetizationStrategy | null>(null);
    const [playbook, setPlaybook] = useState<HighLeveragePlaybook | null>(null);
    const [alphaAcquisitionPlaybook, setAlphaAcquisitionPlaybook] = useState<AlphaAcquisitionPlaybook | null>(null);

    // Auth & Modals
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showProjectsModal, setShowProjectsModal] = useState(false);
    const [showFirebaseConfigModal, setShowFirebaseConfigModal] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    
    // Agents
    const [workforce, setWorkforce] = useState<SovereignAgent[]>([]);

    const clearAllReports = () => {
        setLoneWolfReport(null);
        setChimericAgentReport(null);
        setGatekeeperBypassReport(null);
        setAIVentureBlueprint(null);
        setOpportunityBrief(null);
        setAnalysisResult(null);
        setDominanceBlueprint(null);
        setCashflowProtocolReport(null);
        setRealEstateAlphaReport(null);
        setAlphaSignalReport(null);
        setCompetitiveDisplacementBrief(null);
        setB2CDeconResult(null);
        setLiveMarketIntelReport(null);
        setDemandSignalReport(null);
        setOpportunityRadarReport(null);
        setEdgarAnomalyReport(null);
        setAIVideoFoundryReport(null);
        setPlaybook(null);
        setAlphaAcquisitionPlaybook(null);
        setGeneratedCode(null);
        setLandingPageBlueprint(null);
        setLandingPageCode(null);
        setScoredProspects(null);
        setMonetizationStrategy(null);
    };

    const handleGenerate = async (newBrief: StrategicBrief) => {
        setIsLoading(true);
        setGenerationError(null);
        setBrief(newBrief);
        
        clearAllReports();

        try {
            console.log("Starting generation for:", newBrief.analysisType);
            switch (newBrief.analysisType) {
                case 'aiVentureArchitect':
                    setAIVentureBlueprint(await generateAIVentureBlueprint(newBrief, isTurboMode));
                    break;
                case 'starvingCrowd':
                    setOpportunityBrief(await generateOpportunityBrief(newBrief, isTurboMode));
                    break;
                case 'b2b':
                    setAnalysisResult(await generateB2BAnalysis(newBrief, isTurboMode));
                    break;
                case 'dominanceBlueprint':
                    setDominanceBlueprint(await generateDominanceBlueprint(newBrief, isTurboMode));
                    break;
                case 'chimericAgent':
                    setChimericAgentReport(await generateChimericAgentReport(newBrief, isTurboMode));
                    break;
                case 'loneWolf':
                    setLoneWolfReport(await generateLoneWolfReport(newBrief, isTurboMode));
                    break;
                case 'gatekeeperBypass':
                    setGatekeeperBypassReport(await generateGatekeeperBypassReport(newBrief, isTurboMode));
                    break;
                case 'cashflowProtocol':
                    setCashflowProtocolReport(await generateCashflowProtocol(newBrief, isTurboMode));
                    break;
                case 'realEstateAlpha':
                    setRealEstateAlphaReport(await generateRealEstateAlpha(newBrief, isTurboMode));
                    break;
                case 'alphaSignal':
                    setAlphaSignalReport(await generateAlphaSignalReport(newBrief, isTurboMode));
                    break;
                case 'competitiveDisplacement':
                    setCompetitiveDisplacementBrief(await generateCompetitiveDisplacementBrief(newBrief, isTurboMode));
                    break;
                case 'b2c':
                    setB2CDeconResult(await generateB2CDeconstruction(newBrief, isTurboMode));
                    break;
                case 'liveMarketIntel':
                    setLiveMarketIntelReport(await generateLiveMarketIntel(newBrief, isTurboMode));
                    break;
                case 'demandSignal':
                    setDemandSignalReport(await generateDemandSignal(newBrief, isTurboMode));
                    break;
                case 'opportunityRadar':
                    setOpportunityRadarReport(await generateOpportunityRadar(newBrief, isTurboMode));
                    break;
                case 'edgarAnomaly':
                    setEdgarAnomalyReport(await generateEdgarAnomaly(newBrief, isTurboMode));
                    break;
                case 'aiVideoFoundry':
                    setAIVideoFoundryReport(await generateAIVideoFoundry(newBrief, isTurboMode));
                    break;
                default:
                    console.error("Analysis type not implemented:", newBrief.analysisType);
                    setGenerationError(`Unknown analysis type: ${newBrief.analysisType}`);
            }
        } catch (error: any) {
            console.error("Generation failed", error);
            setGenerationError(error.message || "An unexpected error occurred during generation.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleScoreProspects = async (rawList: string) => {
        if (!analysisResult) {
            alert("Please generate a B2B ICP Analysis first to define the scoring criteria.");
            return;
        }
        setIsLoading(true);
        try {
            const scores = await scoreProspectsList(rawList, analysisResult, isTurboMode);
            setScoredProspects(scores);
        } catch (error) {
            console.error("Scoring failed", error);
            setGenerationError("Failed to score prospects.");
        } finally {
            setIsLoading(false);
        }
    };

    // --- FOUNDRY HANDLERS ---

    const handleGenerateCode = async (prompt: string) => {
        setIsLoading(true);
        try {
            const code = await generateAICode(prompt, isTurboMode);
            setGeneratedCode(code);
        } catch (error) {
            console.error(error);
            setGenerationError("Failed to generate code.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateCodeFromOpportunity = async (brief: OpportunityBrief) => {
        // Robust fallback if the AI didn't generate deeply nested fields
        const solution = (brief.aiPoweredSolution || {}) as any;
        const mechanism = (solution.resultsInAdvanceMechanism || {}) as any;
        const crowd = (brief.starvingCrowd || {}) as any;
        const problem = (brief.aspirinProblem || {}) as any;

        const prompt = `Create a fully functional micro-SaaS tool based on this concept:
        Tool Name: ${mechanism.name || 'Micro-SaaS Tool'}
        Description: ${mechanism.description || 'A calculator or generator to solve the user problem.'}
        Target Audience: ${crowd.name || 'General Audience'}
        Core Problem: ${problem.problem || 'Inefficiency'}
        
        The tool should be a single HTML file (with React/Tailwind CDN) that allows the user to input data and get a "Result-in-Advance". Make it look modern and professional (dark mode).`;
        
        handleGenerateCode(prompt);
    };

    const handleGenerateLandingPageBlueprint = async (prompt: string) => {
        setIsLoading(true);
        try {
            const bp = await generateLandingPageBlueprint(prompt, isTurboMode);
            setLandingPageBlueprint(bp);
        } catch (error) {
            console.error(error);
            setGenerationError("Failed to generate landing page blueprint.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateLandingPageCode = async () => {
        if (!landingPageBlueprint) return;
        setIsLoading(true);
        try {
            const code = await generateLandingPageCode(landingPageBlueprint, isTurboMode);
            setLandingPageCode(code);
        } catch (error) {
            console.error(error);
            setGenerationError("Failed to code landing page.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeployAgents = async (play: any, sourceReportType: string) => {
        setIsLoading(true);
        try {
            const newAgents = await generateSovereignAgents(play, sourceReportType, isTurboMode);
            const updatedWorkforce = [...workforce, ...newAgents];
            setWorkforce(updatedWorkforce);
            if (currentUser) {
                await saveAgentsToFirestore(currentUser.uid, updatedWorkforce);
            }
            setCurrentView('commandCenter');
        } catch (error) {
            console.error("Failed to deploy agents", error);
            setGenerationError("Failed to deploy agents. Check console.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGeneratePlaybook = async () => {
        if (!monetizationStrategy) return;
        setIsLoading(true);
        try {
            const result = await generateHighLeveragePlaybook(monetizationStrategy, isTurboMode);
            setPlaybook(result);
        } catch (error) {
            console.error(error);
            setGenerationError("Failed to generate Playbook.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleGenerateAcquisitionPlaybook = async () => {
        if (!playbook) return;
        setIsLoading(true);
        try {
            const result = await generateAlphaAcquisitionPlaybook(playbook, isTurboMode);
            setAlphaAcquisitionPlaybook(result);
        } catch (error) {
            console.error(error);
            setGenerationError("Failed to generate Acquisition Protocol.");
        } finally {
            setIsLoading(false);
        }
    }

    // Load projects and agents on login
    useEffect(() => {
        if (currentUser) {
            getProjectsFromFirestore(currentUser.uid).then(setProjects);
            getAgentsFromFirestore(currentUser.uid).then(setWorkforce);
        }
    }, [currentUser]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
            {currentView === 'landing' ? (
                <LandingPage onEnterApp={() => setCurrentView('strategy')} />
            ) : (
                <>
                    <Header 
                        currentView={currentView as 'strategy' | 'commandCenter'} 
                        onSetView={(view) => setCurrentView(view)} 
                        onShowProjects={() => setShowProjectsModal(true)}
                        onShowAuth={() => setShowAuthModal(true)}
                        onConfigureBackend={() => setShowFirebaseConfigModal(true)}
                    />
                    
                    <main className="container mx-auto px-4 py-8">
                        <ErrorBoundary onReset={clearAllReports}>
                            {currentView === 'strategy' && (
                                <>
                                    <AudienceForm 
                                        onGenerate={handleGenerate} 
                                        isLoading={isLoading} 
                                        searchHistory={[]} 
                                        isTurboMode={isTurboMode} 
                                        setIsTurboMode={setIsTurboMode}
                                        analysisType={analysisType}
                                        setAnalysisType={setAnalysisType}
                                        briefToLoad={brief}
                                    />
                                    
                                    {generationError && (
                                        <div className="mt-6 bg-red-900/50 border border-red-500 rounded-lg p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">⚠️</span>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-red-200">Generation Error</h3>
                                                    <p className="text-sm text-red-300 break-words">{generationError}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setGenerationError(null)} className="text-red-300 hover:text-white">&times;</button>
                                        </div>
                                    )}

                                    <div className="mt-8">
                                        <AudienceResults 
                                            analysisType={analysisType}
                                            analysis={analysisResult}
                                            discovery={null}
                                            b2cDiscovery={null}
                                            b2cDeconResult={b2cDeconResult}
                                            opportunityBrief={opportunityBrief}
                                            competitiveDisplacementBrief={competitiveDisplacementBrief}
                                            aiVentureBlueprint={aiVentureBlueprint}
                                            dominanceBlueprint={dominanceBlueprint}
                                            alphaSignalReport={alphaSignalReport}
                                            chimericAgentReport={chimericAgentReport}
                                            loneWolfReport={loneWolfReport}
                                            gatekeeperBypassReport={gatekeeperBypassReport}
                                            cashflowProtocolReport={cashflowProtocolReport}
                                            realEstateAlphaReport={realEstateAlphaReport}
                                            imageFoundryResult={null}
                                            salesCopilotReport={null}
                                            sovereignEngineReport={null}
                                            archimedesProtocolReport={null}
                                            firstStrikeReport={null}
                                            aiVideoFoundryReport={aiVideoFoundryReport}
                                            edgarAnomalyReport={edgarAnomalyReport}
                                            liveMarketIntelReport={liveMarketIntelReport}
                                            demandSignalReport={demandSignalReport}
                                            opportunityRadarReport={opportunityRadarReport}
                                            scoredProspects={scoredProspects}
                                            monetizationStrategy={monetizationStrategy}
                                            playbook={playbook}
                                            alphaAcquisitionPlaybook={alphaAcquisitionPlaybook}
                                            onScore={handleScoreProspects}
                                            onMonetize={() => {}}
                                            onGeneratePlaybook={handleGeneratePlaybook}
                                            onGenerateAcquisitionPlaybook={handleGenerateAcquisitionPlaybook}
                                            onRediscover={() => {}}
                                            onValidateLeads={() => {}}
                                            activeAudience={null}
                                            videoStrategy={null}
                                            businessVideoStrategy={null}
                                            phyGitalVideoStrategy={null}
                                            onGenerateVideoWedge={() => {}}
                                            onGenerateVideoForBusinessConcept={() => {}}
                                            onGeneratePhygitalDemoVideo={() => {}}
                                            generatedCode={generatedCode}
                                            onGenerateCode={handleGenerateCode}
                                            onGenerateCodeFromOpportunity={handleGenerateCodeFromOpportunity}
                                            landingPageBlueprint={landingPageBlueprint}
                                            landingPageCode={landingPageCode}
                                            onGenerateLandingPageBlueprint={handleGenerateLandingPageBlueprint}
                                            onGenerateLandingPageCode={handleGenerateLandingPageCode}
                                            onDeployAgents={handleDeployAgents}
                                            marketMap={null}
                                            onGenerateMarketMap={() => {}}
                                            onSaveProject={() => {}}
                                            onGenerateFirstStrike={() => {}}
                                            onGenerateAIVideoFoundry={() => {}}
                                            onGenerateArchimedes={() => {}}
                                        />
                                    </div>
                                </>
                            )}

                            {currentView === 'commandCenter' && (
                                <AgentCommandCenter 
                                    workforce={workforce}
                                    onAssignTask={() => {}}
                                    onBuildToolFromAgent={handleGenerateCode}
                                    onGoToStrategy={() => setCurrentView('strategy')}
                                />
                            )}
                        </ErrorBoundary>
                    </main>

                    <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
                    <FirebaseConfigModal isOpen={showFirebaseConfigModal} onClose={() => setShowFirebaseConfigModal(false)} />
                    <ProjectManager 
                        isVisible={showProjectsModal} 
                        onClose={() => setShowProjectsModal(false)}
                        projects={projects}
                        onLoadProject={() => {}}
                        onDeleteProject={() => {}}
                    />
                </>
            )}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;
