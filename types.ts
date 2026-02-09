
export interface AIEnhancement {
    the10xIdea: string;
    competitiveAdvantage: string;
    godTierPrompt: string;
}

export interface Demographics {
    ageRange: string;
    incomeLevel: string;
    commonLocations: string[];
}

export interface Psychographics {
    motivations: { driver: string; description: string; purchasingImplication: string }[];
    dataSignals: string[];
    buyingTriggers: { trigger: string; implication: string }[];
}

export interface B2CPsychographics {
    mediaConsumptionHabits: string[];
    b2cBuyingTriggers: { trigger: string; implication: string }[];
}

export interface QuantitativeModel {
    decisionScoreFormula: string;
    variableDefinitions: { variable: string; definition: string }[];
}

export interface DataVisualizationSuiteForQuant {
    decisionDecomposition: { label: string; value: number }[];
    angleUplift: { segment: string; angle: string; uplift: number }[];
}

export interface AngleUpliftCell {
    segment: string;
    angle: string;
    uplift: number;
}

export interface LookalikeProspect {
    fullName: string;
    jobTitle: string;
    companyName: string;
    linkedinSearchQuery: string;
    googleDorkQuery: string;
    rationale: string;
    validationStatus?: 'Validated' | 'Uncertain';
    validationRationale?: string;
}

export interface ScoredProspect {
    prospectInfo: string;
    fitScore: number;
    rationale: string;
}

export interface AnalysisResult {
    sharedProfile: {
      summary: string;
      demographics: Demographics;
      commonIndustries: string[];
      commonJobFunctions: string[];
      commonCompanySizes: string[];
      psychographics: Psychographics;
      quantitativeModel: QuantitativeModel;
      dataVisualizationSuite?: DataVisualizationSuiteForQuant;
      aiEnhancement?: AIEnhancement;
    };
    lookalikeProspects: LookalikeProspect[];
}

export interface SalesPitchAsset {
    pitchPersona: string;
    pitchScript: string;
    videoScenePrompt: string;
}

export interface OpportunityBrief {
    starvingCrowd: { name: string; description: string };
    aspirinProblem: { problem: string };
    gauntletVerdict: { passes: boolean; summary: string; checklist: any };
    marketSizeEstimate?: string;
    urgencyLevel?: string;
    quantitativeModel: QuantitativeModel;
    dataVisualizationSuite?: DataVisualizationSuiteForQuant;
    aiEnhancement?: AIEnhancement;
    urgencyTriggers?: string[];
    marketMindAnalysis?: MarketMindAnalysis;
    aiPoweredSolution: {
        solutionName: string;
        description: string;
        resultsInAdvanceMechanism: { name: string; description: string };
        irresistibleOffer: string;
        aiAutomationProtocol: { protocol: string; rationale: string };
        salesPitchAsset: SalesPitchAsset;
        ultimatePrompt?: string;
    };
    fastestPathToCash: { channel: string; rationale: string };
    mentalModelApplicable: { model: string; rationale: string };
    asymmetricJVProtocol: { idealPartnerProfile: string; valueProposition: string; outreachAngle: string };
    businessInABoxAngle: { opportunityName: string; targetBuyer: string; salesPitch: string };
    methodology?: string[];
}

export interface MarketMindAnalysis {
    dominantEmotionalDrivers: { emotion: string; weight: number; rationale: string }[];
    hotButtonKeywords: { keyword: string; context: string }[];
    psycholinguisticRoutingEngine: {
        routingLogic: string;
        heroVariants: { angle: string; headline: string; adHook: string }[];
    };
}

export interface RevenuePlay {
    playName: string;
    probabilityOfSuccess: { score: number; rationale: string };
    potentialRevenue: string;
    psychologicalEdge: { principle: string; application: string };
    requiredAssets: string[];
    executionSteps: string[];
    aiAgentProtocol: { protocol: string; rationale: string };
}

export interface AlphaSignalReport {
    executiveSummary: string;
    revenuePlays: RevenuePlay[];
    aiEnhancement?: AIEnhancement;
    methodology?: string[];
}

export interface LoneWolfPlay {
    playName: string;
    incomePotential: string;
    timeToFirstCash: string;
    gatekeeperBypassTactic: { tactic: string; rationale: string };
    requiredAssets: string[];
    executionSteps: string[];
    aiAgentProtocol: { protocol: string; rationale: string };
}

export interface LoneWolfReport {
    executiveSummary: string;
    loneWolfPlays: LoneWolfPlay[];
    aiEnhancement?: AIEnhancement;
    methodology?: string[];
}

export interface EsotericStrategy {
    name: string;
    source: string;
    strategy: string;
    outreachScripts: { sms: string; rvm: string; directMail: string };
}

export interface RealEstateAlphaReport {
    esotericAlpha: { title: string; description: string; strategies: EsotericStrategy[] };
    uploadedDataAnalysis?: { summary: string; insights: string[] };
    dealFlowEngine: { harvester: any; validator: any; dossier: any };
    investorPlaybook: { title: string; steps: { stepName: string; description: string }[] };
    dataVisualizationSuite: { marketOpportunityChart: MarketOpportunityChart; samplePropertyDossier: any };
    aiAgentProtocol: { protocol: string };
    aiEnhancement?: AIEnhancement;
}

export interface MarketOpportunityChart {
    title: string;
    data: { county: string; medianPrice: number; leverageScore: number; foreclosureRate: number }[];
}

export interface StrategicBrief {
    marketTopic: string;
    opportunityDescription: string;
    analysisType: 'b2b' | 'b2c' | 'starvingCrowd' | 'competitiveDisplacement' | 'aiVentureArchitect' | 'dominanceBlueprint' | 'gatekeeperBypass' | 'chimericAgent' | 'loneWolf' | 'cashflowProtocol' | 'realEstateAlpha' | 'alphaSignal' | 'liveMarketIntel' | 'demandSignal' | 'opportunityRadar' | 'edgarAnomaly' | 'aiVideoFoundry' | 'veoVideo';
    dataPoints?: string;
}

export interface Project {
    id: string;
    name: string;
    timestamp: number;
    brief: StrategicBrief;
    results: any;
}

export interface ProjectResults {}

export interface SovereignTask {
    id: string;
    brief: string;
    status: 'Pending' | 'Waiting' | 'Executing' | 'Completed' | 'Failed';
    insight?: string;
    suggestedNextTask?: string;
    actionableOutput?: { title: string; content: string; type: string; url?: string }[];
}

export interface SovereignAgent {
    id: string;
    agentType: string;
    overallBrief: string;
    status: 'Idle' | 'Active' | 'Error';
    tasks: SovereignTask[];
}

export interface ChimericAgentReport {
    subjectSynthesis: string;
    highStakesSolutions: HighStakesSolution[];
    aiEnhancement?: AIEnhancement;
    methodology?: string[];
}

export interface HighStakesSolution {
    solutionName: string;
    problemDomain: string;
    aiLeveragePoint: string;
    monetizationModel: string;
    firstTouchProtocol: { wedge: string; rationale: string };
}

export interface GatekeeperBypassReport {
    jvAssetMap: {
        upstreamPartners: { businessType: string; estimatedListSize: string; whyTheyHaveTheBuyers: string }[];
        downstreamPartners: { businessType: string; monetizationGap: string }[];
    };
    distressRadar: {
        signals: { signal: string; interpretation: string; findingMethod: string }[];
    };
    godfatherProposal: {
        theAsk: string;
        theGive: string;
        riskReversal: string;
        emailScript: string;
    };
    productBridgeIdeas: { conceptName: string; description: string; whyItFitsPartner: string }[];
    aiEnhancement?: AIEnhancement;
    methodology?: string[];
}

export interface AIVentureBlueprint {
    validatedOpportunity: { starvingCrowd: string; aspirinProblem: string };
    dataFeasibilityAnalysis: DataFeasibilityAnalysis;
    resultsInAdvanceTool: { toolName: string; description: string; dataAssetFilename: string; dataAsset: string };
    leadCaptureMechanism: { strategy: string };
    aiSalesAgent: AISalesAgent;
    backendInstructions: { code: string; filePath: string; deploymentSteps: string[] };
    ultimatePrompt: string;
    aiEnhancement?: AIEnhancement;
    methodology?: string[];
}

export interface DataFeasibilityAnalysis {
    feasibilityScore: 'High' | 'Medium' | 'Low' | 'Very Low';
    rationale: string;
    potentialSources: { name: string; type: string; notes: string }[];
    recommendation: string;
}

export interface AISalesAgent {
    persona: string;
    triggerLogic: string;
    openingScript: string;
}

export interface DominanceBlueprint {
    conceptualImageUrl?: string;
    executiveSummary: string;
    clientAcquisitionEngine: ClientAcquisitionEngine;
    unfairAdvantageSalesProtocol: UnfairAdvantageSalesProtocol;
    phygitalSynergyProtocol?: any;
    aiEnhancement?: AIEnhancement;
    methodology?: string[];
}

export interface ClientAcquisitionEngine {
    tractionChannelAnalysis: { channel: string; rationale: string }[];
    dream100Protocol: { targetDescription: string; rationale: string }[];
    strategicPartnershipProtocol: { idealPartnerProfile: string; irresistibleOffer: string; outreachAngle: string };
}

export interface UnfairAdvantageSalesProtocol {
    agoraAngle: { marketSophisticationLevel: string; headlineAndHook: string; coreBodyCopyAngle: string };
    belfortStraightLine: { openingScript: string; intelligenceGatheringQuestions: string[] };
    fladlienOfferStack: { coreOffer: string; premiumBonuses: { name: string; value: string }[]; riskReversal: string; urgencyDriver: string };
    bleedingNeckQualification: { rationale: string; filterQuestions: string[] };
}

export interface CashflowProtocolReport {
    mindsetCalibration: { corePrinciple: string; affirmation: string };
    highTicketOffer: { offerName: string; pricePoint: string; coreComponents: string[]; irresistibleBonuses: { name: string; value: string }[] };
    prospectingDirective: { idealClientProfile: string; killListQuery: string };
    closingScript: { opening: string; painFindingQuestions: string[]; solutionPresentation: string; close: string };
    battlePlan48Hours: { hours0_6: string; hours7_24: string; hours25_48: string };
    aiEnhancement?: AIEnhancement;
}

export interface CompetitiveDisplacementBrief {
    trafficAnalysis: { marketPosition: string; supportingSignals: string[] };
    marketSizeEstimate?: string;
    quantitativeModel: QuantitativeModel;
    dataVisualizationSuite: DataVisualizationSuiteForQuant;
    marketMindAnalysis: MarketMindAnalysis;
    aiPoweredWedge: { blindSpot: string; wedgeIdea: string; wedgeDescription: string };
    outreachCopy: { subjectLine: string; body: string; rvmScript: string; textMessage: string };
    aiEnhancement?: AIEnhancement;
    methodology?: string[];
}

export interface B2CMarketDeconstruction {
    definingInterests: string[];
    influentialBrands: string[];
    competitorBrands: string[];
    customerPersonas: { name: string; description: string }[];
    b2cBuyingTriggers: { trigger: string; implication: string }[];
    marketMindAnalysis: MarketMindAnalysis;
    aiEnhancement?: AIEnhancement;
    methodology?: string[];
}

export interface LiveMarketIntelReport {
    topic: string;
    executiveSummary: string;
    marketSentiment: { sentiment: string; rationale: string; keyQuotes: string[] };
    competitorMoves: { company: string; action: string; implication: string }[];
    latestDevelopments: { headline: string; date: string; source: string; summary: string; impactAnalysis: string }[];
    sources: { uri: string; title: string }[];
    aiEnhancement?: AIEnhancement;
    methodology?: string[];
}

export interface DemandSignalReport {
    targetAudience: string;
    buyingProbabilityScore: number;
    scoreRationale: string;
    intentDecayTimeline: { phase: string; action: string; probabilityDrop: string }[];
    leadingIndicators: { signal: string; predictiveWeight: string; rationale: string }[];
    signalSources: { name: string; type: string; reachEstimate: string; engineeringAsMarketingPlay: string }[];
    aiEnhancement?: AIEnhancement;
    methodology?: string[];
}

export interface OpportunityRadarReport {
    sector: string;
    executiveSummary: string;
    realTimeTrends: { trendName: string; growthSignal: string; whyItMatters: string; sourceUrl?: string }[];
    bestOpportunity: { name: string; painPoint: string; starvingCrowd: string; marketSize: string };
    aiMultiplierStrategy: { coreSolution: string; the10xMechanism: string; automationWorkflow: string };
    formulaicBreakdown: { acquisitionFormula: string; retentionFormula: string; monetizationFormula: string };
    aiEnhancement?: AIEnhancement;
    methodology?: string[];
}

export interface EdgarAnomalyReport {
    companyIdentifier: string;
    executiveSummary: string;
    redFlags: { flag: string; implication: string }[];
    anomalies: { type: string; severity: 'High' | 'Medium' | 'Low'; description: string; sourceLocation: string }[];
    sourceFilings: { uri: string; title: string }[];
    aiEnhancement?: AIEnhancement;
    methodology?: string[];
}

export interface AIVideoFoundryReport {
    title: string;
    directorsCut: { scene: number; script: string; visualPrompts: { type: string; prompt: string }[]; voiceoverScript: string; musicCue: string; overlayText: string }[];
    technicalImplementation: { techStack: { name: string; rationale: string }[]; architecture: string[] };
    saasMonetizationModel: { pricingTiers: { name: string; price: string; description: string }[]; go_to_market_strategy: string[] };
}

export interface MonetizationStrategy {
    coreOpportunity: string;
    productIdeas: ProductIdea[];
    leadSourceProtocol: { sourcePlatform: string; filteringCriteria: string[]; rationale: string }[];
}

export interface ProductIdea {
    ideaName: string;
    description: string;
    profitPotential: string;
    aiLeveragePoint: string;
    pricingModel: { tiers: { name: string; description: string; pricePerMonth: string; features: string[] }[] };
}

export interface HighLeveragePlaybook {
    brandingPersona: string;
    positioningStatement: string;
    marketingFunnel: string[];
    irresistibleOffer: { offerName: string; pricePoint: string; components: string[]; salesPitchAsset: SalesPitchAsset };
    finalWisdom: string;
}

export interface B2BHighLeveragePlaybook extends HighLeveragePlaybook {
    searchAndAcquisitionProtocol: { alphaSignal: string; protocolSteps: string[] };
}

export interface B2CHighLeveragePlaybook extends HighLeveragePlaybook {
    asymmetricWedgeStrategy: { targetMicroTribe: string; asymmetricWedge: { wedgeType: string; idea: string; rationale: string } };
}

export interface AlphaAcquisitionPlaybook {
    channelPartnershipProtocol: { idealPartnerProfile: string; aiPoweredSearchQueries: string[]; irresistiblePartnershipOffer: string };
    buyingTriggerProtocol: { triggerEvent: string; signalIntelligence: string; strategicApproach: string }[];
}

export interface AICode {
    generatedCode: string;
}

export interface LandingPageBlueprint {
    pageTitle: string;
    sections: LandingPageSection[];
}

export interface LandingPageSection {
    sectionType: string;
    headline: string;
    subheadline?: string;
    body: string;
    ctaButtonText?: string;
}

export interface FirstStrikeReport extends Array<TargetDossier> {}

export interface TargetDossier {
    archetypeDescription: string;
    godTierDorkQueries: string[];
    firstContactAngle: string;
}

export interface ArchimedesProtocolReport {
    theMandate: { title: string; corePrinciple: string; affirmation: string };
    theSovereignFoundry: { title: string; description: string; workflow: string[] };
    theAgentCSuite: { title: string; description: string; aiAgentProtocol: { protocol: string; rationale: string } };
    theOperatorsCockpit: { title: string; description: string; yourRole: string[] };
    theSovereignArsenal: { 
        title: string; 
        description: string;
        communicationsProtocol: ArsenalProtocol;
        visionProtocol: ArsenalProtocol;
        dataAcquisitionProtocol: ArsenalProtocol;
        voiceIntelligenceProtocol: ArsenalProtocol;
        unconventionalToolsAndApis: { title: string; description: string; tools: { name: string; useCase: string; agentInteractionProtocol: string }[] };
    };
}

export interface ArsenalProtocol {
    title: string;
    description: string;
    tooling: ToolingStack;
    serverlessFunctionCode?: string;
    requiredEnvVars?: { key: string; description: string }[];
    agentApiCallProtocol?: string;
}

export interface ToolingStack {
    bestInClass: { name: string; rationale: string };
    costEffectiveAlternative: { name: string; rationale: string };
    freeOrOpenSource: { name: string; rationale: string };
}

export interface DiscoveredAudience {
    audienceName: string;
    summary: string;
    marketSizeEstimate: string;
    urgencyLevel: 'High' | 'Medium' | 'Low';
    demographics: Demographics;
    psychographics: Psychographics;
    quantitativeModel: QuantitativeModel;
    methodology: string[];
}

export interface B2CDiscoveredAudience {
    audienceName: string;
    summary: string;
    marketSizeEstimate: string;
    urgencyLevel: 'High' | 'Medium' | 'Low';
    demographics: Demographics;
    psychographics: B2CPsychographics;
    quantitativeModel: QuantitativeModel;
    methodology: string[];
}

export interface VideoStrategy {
    script: { scene: number; visual: string; voiceover: string }[];
    videoGenerationPrompt: string;
    distributionStrategy: string;
}

export interface ImageFoundryResult {
    images: string[];
}

export interface SalesCopilotResponse {
    suggestedResponse: string;
    psychologicalTactic: string;
}

export interface SovereignEngineReport {
    workflowSummary: string;
    executionLog: { step: number; action: string; status: string }[];
    finalOutput: { assetName: string; content: string }[];
}

export interface PhyGitalVideoStrategy {
    videoTitle: string;
    targetAudience: string;
    coreMessage: string;
    script: { scene: number; visual: string; voiceover: string }[];
    aiVideoPrompt: string;
    distributionPlan: string;
}

export interface ProprietaryAiSymbiosis {
    concept: string;
    benefit: string;
}

export interface SEOCompetitorAnalysis {
    competitors: string[];
    keywords: string[];
}

export interface ValuationMultiplier {
    multiplier: string;
    logic: string;
}

export interface MarketMap {
    executiveSummary: string;
    keyPlayers: { name: string; marketPosition: string; summary: string }[];
    audienceSegments: { name: string; sizeEstimate: string; description: string }[];
    whitespaceOpportunities: { opportunityName: string; description: string; strategicAngle: string }[];
    methodology?: string[];
}
