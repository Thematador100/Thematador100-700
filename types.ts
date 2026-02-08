
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
    };
    lookalikeProspects: LookalikeProspect[];
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
    propertyTests: { testName: string; description: string }[];
    experimentPlan: { hypothesis: string; test: string };
    addToJson: { description: string; jsonOutput: string };
  }
  
  export interface DataVisualizationSuiteForQuant {
    decisionDecomposition?: { label: string; value: number }[];
    angleUplift?: AngleUpliftCell[];
    marketOpportunityChart?: MarketOpportunityChart;
    samplePropertyDossier?: any; 
  }
  
  export interface AngleUpliftCell {
    segment: string;
    angle: string;
    uplift: number;
  }
  
  export interface MarketOpportunityChart {
    title: string;
    data: { county: string; medianPrice: number; leverageScore: number; foreclosureRate: number }[];
  }
  
  export interface DiscoveredAudience {
    audienceName: string;
    summary: string;
    marketSizeEstimate?: string;
    urgencyLevel?: string;
    quantitativeModel: { decisionScoreFormula: string };
    demographics: Demographics;
    psychographics: Psychographics;
    methodology?: string[];
  }
  
  export interface B2CDiscoveredAudience {
    audienceName: string;
    summary: string;
    marketSizeEstimate?: string;
    urgencyLevel?: string;
    quantitativeModel: { decisionScoreFormula: string };
    demographics: Demographics;
    psychographics: B2CPsychographics;
    methodology?: string[];
  }
  
  export interface OpportunityBrief {
    starvingCrowd: { name: string; description: string };
    aspirinProblem: { problem: string };
    gauntletVerdict: { passes: boolean; summary: string; checklist: any };
    marketSizeEstimate?: string;
    urgencyLevel?: string;
    quantitativeModel: QuantitativeModel;
    dataVisualizationSuite?: DataVisualizationSuiteForQuant;
    urgencyTriggers?: string[];
    marketMindAnalysis?: MarketMindAnalysis;
    aiPoweredSolution: {
        solutionName: string;
        description: string;
        resultsInAdvanceMechanism: { name: string; description: string };
        irresistibleOffer: string;
        aiAutomationProtocol: { protocol: string; rationale: string };
        salesPitchAsset: SalesPitchAsset;
        ultimatePrompt?: string; // Added to fix App.tsx error
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
  
  export interface CompetitiveDisplacementBrief {
      trafficAnalysis: { marketPosition: string; supportingSignals: string[] };
      marketSizeEstimate?: string;
      quantitativeModel: QuantitativeModel;
      dataVisualizationSuite: DataVisualizationSuiteForQuant;
      marketMindAnalysis?: MarketMindAnalysis;
      aiPoweredWedge: { blindSpot: string; wedgeIdea: string; wedgeDescription: string };
      outreachCopy: { subjectLine: string; body: string; rvmScript: string; textMessage: string };
      methodology?: string[];
  }
  
  export interface LiveMarketIntelReport {
      topic: string;
      executiveSummary: string;
      latestDevelopments: { headline: string; date: string; source: string; summary: string; impactAnalysis: string }[];
      marketSentiment: { sentiment: 'Bullish' | 'Bearish' | 'Neutral'; rationale: string; keyQuotes: string[] };
      competitorMoves: { company: string; action: string; implication: string }[];
      sources: { title: string; uri: string }[];
      methodology: string[];
  }
  
  export interface DemandSignalReport {
      targetAudience: string;
      buyingProbabilityScore: number;
      scoreRationale: string;
      leadingIndicators: { signal: string; predictiveWeight: string; rationale: string }[];
      signalSources: { 
          name: string; 
          type: string; 
          reachEstimate: string; 
          engineeringAsMarketingPlay: string;
          url?: string;
      }[];
      intentDecayTimeline: { phase: string; action: string; probabilityDrop: string }[];
      methodology: string[];
  }

  export interface OpportunityRadarReport {
      sector: string;
      executiveSummary: string;
      realTimeTrends: {
          trendName: string;
          growthSignal: string;
          sourceUrl?: string; 
          whyItMatters: string;
      }[];
      bestOpportunity: {
          name: string;
          starvingCrowd: string;
          painPoint: string;
          marketSize: string;
      };
      aiMultiplierStrategy: {
          coreSolution: string;
          the10xMechanism: string;
          automationWorkflow: string;
      };
      formulaicBreakdown: {
          acquisitionFormula: string;
          retentionFormula: string;
          monetizationFormula: string;
      };
      methodology: string[];
  }
  
  export interface ScoredProspect {
      prospectInfo: string;
      fitScore: number;
      rationale: string;
  }
  
  export interface LookalikeProspect {
      fullName: string;
      jobTitle: string;
      companyName: string;
      linkedinSearchQuery: string;
      googleDorkQuery: string;
      rationale: string;
      validationStatus?: 'Validated' | 'Potential' | 'Low Fit';
      validationRationale?: string;
  }
  
  export interface MonetizationStrategy {
      coreOpportunity: string;
      productIdeas: ProductIdea[];
      go_to_market_strategy: string[];
      leadSourceProtocol: { sourcePlatform: string; filteringCriteria: string[]; rationale: string }[];
  }
  
  export interface ProductIdea {
      ideaName: string;
      description: string;
      profitPotential: string;
      aiLeveragePoint: string;
      financialNarrative: string;
      pricingModel: { tiers: { name: string; description: string; pricePerMonth: string; features: string[] }[]; additionalCharges?: string };
      monetizationPathways: string[];
  }
  
  export interface HighLeveragePlaybook {
      brandingPersona: string;
      positioningStatement: string;
      idealClientProfile: string[];
      irresistibleOffer: { offerName: string; pricePoint: string; components: string[]; salesPitchAsset: SalesPitchAsset };
      marketingFunnel: string[];
      finalWisdom: string;
  }
  
  export interface B2BHighLeveragePlaybook extends HighLeveragePlaybook {
      searchAndAcquisitionProtocol: { alphaSignal: string; leveragePoint: string; protocolSteps: string[] };
      clientAcquisitionEngine: ClientAcquisitionEngine;
  }
  
  export interface B2CHighLeveragePlaybook extends HighLeveragePlaybook {
      asymmetricWedgeStrategy: { targetMicroTribe: string; asymmetricWedge: { idea: string; rationale: string; wedgeType: string }; infiltrationPlan: string[] };
  }
  
  export interface ClientAcquisitionEngine {
      tractionChannelAnalysis: { channel: string; rationale: string }[];
      dream100Protocol: { targetDescription: string; rationale: string }[];
      strategicPartnershipProtocol: { idealPartnerProfile: string; irresistibleOffer: string; outreachAngle: string };
  }
  
  export interface AlphaAcquisitionPlaybook {
      channelPartnershipProtocol: { idealPartnerProfile: string; aiPoweredSearchQueries: string[]; irresistiblePartnershipOffer: string };
      buyingTriggerProtocol: { triggerEvent: string; signalIntelligence: string; strategicApproach: string }[];
  }
  
  export interface VideoStrategy {
      script: { scene: string; visual: string; voiceover: string }[];
      videoGenerationPrompt: string;
      distributionStrategy: string;
  }
  
  export interface AIVentureBlueprint {
      dataFeasibilityAnalysis: DataFeasibilityAnalysis;
      validatedOpportunity: { starvingCrowd: string; aspirinProblem: string };
      resultsInAdvanceTool: { toolName: string; description: string; dataAssetFilename: string; dataAsset: string };
      leadCaptureMechanism: { strategy: string };
      aiSalesAgent: AISalesAgent;
      backendInstructions: { filePath: string; code: string; deploymentSteps: string[] };
      ultimatePrompt: string;
      methodology?: string[];
  }
  
  export interface DataFeasibilityAnalysis {
      feasibilityScore: string;
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
      executiveSummary: string;
      conceptualImageUrl?: string;
      clientAcquisitionEngine: ClientAcquisitionEngine;
      unfairAdvantageSalesProtocol: UnfairAdvantageSalesProtocol;
      phygitalSynergyProtocol?: any;
      methodology?: string[];
  }
  
  export interface PhyGitalVideoStrategy {
      videoTitle: string;
      targetAudience: string;
      coreMessage: string;
      script: { scene: string; visual: string; voiceover: string }[];
      aiVideoPrompt: string;
      distributionPlan: string;
  }
  
  export interface ProprietaryAiSymbiosis {
      // Define if needed
  }
  
  export interface SEOCompetitorAnalysis {
      // Define if needed
  }
  
  export interface UnfairAdvantageSalesProtocol {
      agoraAngle: { marketSophisticationLevel: string; headlineAndHook: string; coreBodyCopyAngle: string };
      belfortStraightLine: { openingScript: string; intelligenceGatheringQuestions: string[] };
      fladlienOfferStack: { coreOffer: string; premiumBonuses: { name: string; value: string }[]; riskReversal: string; urgencyDriver: string };
      bleedingNeckQualification: { rationale: string; filterQuestions: string[] };
  }
  
  export interface ValuationMultiplier {
      // Define if needed
  }
  
  export interface LandingPageBlueprint {
      pageTitle: string;
      sections: LandingPageSection[];
  }
  
  export interface LandingPageSection {
      sectionType: 'hero' | 'problem' | 'solution' | 'features' | 'socialProof' | 'callToAction' | 'faq' | string;
      headline: string;
      subheadline?: string;
      body: string;
      ctaButtonText?: string;
  }
  
  export interface AICode {
      generatedCode: string;
  }
  
  export interface AlphaSignalReport {
      executiveSummary: string;
      revenuePlays: RevenuePlay[];
      methodology?: string[];
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
  
  export interface ChimericAgentReport {
      subjectSynthesis: string;
      highStakesSolutions: HighStakesSolution[];
      methodology?: string[];
  }
  
  export interface HighStakesSolution {
      solutionName: string;
      problemDomain: string;
      aiLeveragePoint: string;
      monetizationModel: string;
      firstTouchProtocol: { wedge: string; rationale: string };
  }
  
  export interface LoneWolfReport {
      executiveSummary: string;
      loneWolfPlays: LoneWolfPlay[];
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
  
  export interface SovereignAgent {
      id: string;
      agentType: string;
      status: 'Idle' | 'Active' | 'Error';
      overallBrief: string;
      tasks: SovereignTask[];
  }
  
  export interface SovereignTask {
      id: string;
      brief: string;
      status: 'Pending' | 'Waiting' | 'Executing' | 'Completed' | 'Failed';
      actionableOutput?: { title: string; type: string; content: string; url?: string }[];
      insight?: string;
      suggestedNextTask?: string;
  }
  
  export interface B2CMarketDeconstruction {
      definingInterests: string[];
      influentialBrands: string[];
      competitorBrands: string[];
      customerPersonas: { name: string; description: string }[];
      b2cBuyingTriggers: { trigger: string; implication: string }[];
      marketMindAnalysis: MarketMindAnalysis;
      methodology?: string[];
  }
  
  export interface MarketMap {
      executiveSummary: string;
      keyPlayers: { name: string; marketPosition: string; summary: string }[];
      audienceSegments: { name: string; sizeEstimate: string; description: string }[];
      whitespaceOpportunities: { opportunityName: string; description: string; strategicAngle: string }[];
      methodology?: string[];
  }
  
  export interface GatekeeperBypassReport {
      jvAssetMap: {
          upstreamPartners: { 
              businessType: string; 
              whyTheyHaveTheBuyers: string; 
              estimatedListSize: string;
          }[];
          downstreamPartners: { 
              businessType: string; 
              monetizationGap: string; 
          }[];
      };
      distressRadar: {
          signals: { signal: string; interpretation: string; findingMethod: string }[];
      };
      godfatherProposal: {
          angle: string;
          theAsk: string;
          theGive: string;
          riskReversal: string;
          emailScript: string;
      };
      productBridgeIdeas: {
          conceptName: string;
          description: string;
          whyItFitsPartner: string;
      }[];
      
      // Legacy fields kept for compatibility but optional
      targetAudienceDeconstruction?: { profile: string; wateringHoles: string[]; painPointsAndDesires: string[] };
      honeypotStrategy?: { concept: string; honeypotIdeas: { name: string; description: string }[]; distributionPlan: string };
      profitSplitJVProtocol?: { idealPartnerProfile: string; irresistibleOffer: string; outreachScript: string };
      productizationRoadmap?: string[];
      methodology?: string[];
  }
  
  export interface CashflowProtocolReport {
      mindsetCalibration: { corePrinciple: string; affirmation: string };
      highTicketOffer: { offerName: string; pricePoint: string; coreComponents: string[]; irresistibleBonuses: { name: string; value: string }[] };
      prospectingDirective: { idealClientProfile: string; killListQuery: string };
      closingScript: { opening: string; painFindingQuestions: string[]; solutionPresentation: string; close: string };
      battlePlan48Hours: { hours0_6: string; hours7_24: string; hours25_48: string };
  }
  
  export interface RealEstateAlphaReport {
      esotericAlpha: { title: string; description: string; strategies: EsotericStrategy[] };
      uploadedDataAnalysis?: { summary: string; insights: string[] };
      dealFlowEngine: { harvester: any; validator: any; dossier: any };
      investorPlaybook: { title: string; steps: { stepName: string; description: string }[] };
      dataVisualizationSuite: { marketOpportunityChart: MarketOpportunityChart; samplePropertyDossier: any };
      aiAgentProtocol: { protocol: string };
  }
  
  export interface EsotericStrategy {
      name: string;
      source: string;
      strategy: string;
      outreachScripts: { sms: string; rvm: string; directMail: string };
  }
  
  export interface Project {
      id: string;
      name: string;
      timestamp: number;
      brief: StrategicBrief; // Added missing property
      results: ProjectResults;
  }
  
  export interface ProjectResults {
      analysisResult: AnalysisResult | null;
      discoveryResult: DiscoveredAudience[] | null; // Added missing property
      monetizationStrategy: MonetizationStrategy | null;
      highLeveragePlaybook: HighLeveragePlaybook | null;
      scoredProspects?: ScoredProspect[] | null;
      b2bDiscoveredAudiences?: DiscoveredAudience[] | null; // Kept for backward compatibility if needed
      b2cDiscoveryResult: B2CDiscoveredAudience[] | null;
      opportunityBrief: OpportunityBrief | null;
      competitiveDisplacementBrief: CompetitiveDisplacementBrief | null;
      videoStrategy: VideoStrategy | null;
      landingPageBlueprint: LandingPageBlueprint | null;
      landingPageCode: AICode | null;
      alphaAcquisitionPlaybook: AlphaAcquisitionPlaybook | null;
      aiVentureBlueprint: AIVentureBlueprint | null;
      generatedCode: AICode | null;
      dominanceBlueprint: DominanceBlueprint | null;
      phyGitalVideoStrategy: PhyGitalVideoStrategy | null;
      businessVideoStrategy: VideoStrategy | null;
      alphaSignalReport: AlphaSignalReport | null;
      chimericAgentReport: ChimericAgentReport | null;
      loneWolfReport: LoneWolfReport | null;
      b2cDeconResult: B2CMarketDeconstruction | null;
      marketMap: MarketMap | null;
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
      scoredProspectsResult?: ScoredProspect[] | null; // Optional alias if code uses it
      playbook?: HighLeveragePlaybook | null; // Optional alias
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
      executionLog: { step: string; action: string; status: string }[];
      finalOutput: { assetName: string; content: string }[];
  }
  
  export interface ArchimedesProtocolReport {
      theMandate: { title: string; corePrinciple: string; affirmation: string };
      theSovereignFoundry: { title: string; description: string; workflow: string[] };
      theAgentCSuite: { title: string; description: string; aiAgentProtocol: { protocol: string; rationale: string } };
      theOperatorsCockpit: { title: string; description: string; yourRole: string[] };
      theSovereignArsenal: { title: string; description: string; communicationsProtocol: ArsenalProtocol; visionProtocol: ArsenalProtocol; dataAcquisitionProtocol: ArsenalProtocol; voiceIntelligenceProtocol: ArsenalProtocol; unconventionalToolsAndApis: { title: string; description: string; tools: { name: string; useCase: string; agentInteractionProtocol: string }[] } };
  }
  
  export interface ArsenalProtocol {
      title: string;
      description: string;
      tooling: ToolingStack;
      serverlessFunctionCode: string;
      requiredEnvVars: { key: string; description: string }[];
      agentApiCallProtocol: string;
  }
  
  export interface ToolingStack {
      bestInClass: { name: string; rationale: string };
      costEffectiveAlternative: { name: string; rationale: string };
      freeOrOpenSource: { name: string; rationale: string };
  }
  
  export interface FirstStrikeReport extends Array<TargetDossier> {}
  
  export interface TargetDossier {
      archetypeDescription: string;
      godTierDorkQueries: string[];
      firstContactAngle: string;
  }
  
  export interface SalesPitchAsset {
      pitchPersona: string;
      pitchScript: string;
      videoScenePrompt: string;
  }
  
  export interface AIVideoFoundryReport {
      title: string;
      directorsCut: { scene: string; script: string; visualPrompts: { type: string; prompt: string }[]; voiceoverScript: string; musicCue: string; overlayText: string }[];
      technicalImplementation: { techStack: { name: string; rationale: string }[]; architecture: string[] };
      saasMonetizationModel: { pricingTiers: { name: string; price: string; description: string }[]; go_to_market_strategy: string[] };
  }
  
  export interface EdgarAnomalyReport {
      companyIdentifier: string;
      analysisDate: string;
      executiveSummary: string;
      anomalies: { type: string; description: string; severity: 'High' | 'Medium' | 'Low'; sourceLocation: string }[];
      redFlags: { flag: string; implication: string }[];
      sourceFilings: { title: string; uri: string }[];
      methodology: string[];
  }
  
  export interface StrategicBrief {
      analysisType?: string;
      marketTopic?: string;
      targetDemographic?: string;
      areaOfInterest?: string;
      [key: string]: any;
  }
