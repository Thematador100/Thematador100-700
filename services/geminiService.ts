
import { GoogleGenAI } from "@google/genai";
import * as Schemas from "./geminiSchemas";
import { 
    StrategicBrief, 
    OpportunityBrief, 
    AnalysisResult, 
    LoneWolfReport, 
    RealEstateAlphaReport,
    ChimericAgentReport,
    GatekeeperBypassReport,
    AIVentureBlueprint,
    DominanceBlueprint,
    CashflowProtocolReport,
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
    ScoredProspect,
    SovereignAgent,
    ArchimedesProtocolReport,
    DiscoveredAudience,
    B2CDiscoveredAudience
} from "../types";

const callGemini = async <T>(prompt: string, schema: any, isTurboMode: boolean, useSearch: boolean = false): Promise<{data: T, groundingMetadata?: any}> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = isTurboMode ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
    
    const enhancedPrompt = `
    ${prompt}
    
    CRITICAL INSTRUCTION FOR COMPETITIVE ADVANTAGE:
    You MUST generate a high-level 'aiEnhancement' object. 
    1. 'the10xIdea': A strategy to make this tool 10x better using predictive AI, real-time intent decoding, or automated asymmetric data fusion.
    2. 'competitiveAdvantage': Why this idea creates an UNFAIR advantage that a competitor using basic automation cannot replicate.
    3. 'godTierPrompt': A massive (500+ words) prompt that the user can paste into an AI to build the actual code or system for this 10x enhancement.
    `;

    const config: any = {
        responseMimeType: "application/json",
        responseSchema: schema,
    };

    if (useSearch) {
        config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
        model: model,
        contents: enhancedPrompt,
        config: config,
    });
    
    if (!response.text) {
        throw new Error("AI returned an empty response.");
    }
    
    return {
        data: JSON.parse(response.text.trim()) as T,
        groundingMetadata: response.candidates?.[0]?.groundingMetadata
    };
};

export const generateOpportunityBrief = async (brief: StrategicBrief, isTurboMode: boolean): Promise<OpportunityBrief> => {
    const prompt = `Market Detective: Find a 'Starving Crowd' opportunity in: ${JSON.stringify(brief)}.`;
    const res = await callGemini<OpportunityBrief>(prompt, Schemas.opportunityBriefSchema, isTurboMode);
    return res.data;
};

export const generateB2BAnalysis = async (brief: StrategicBrief, isTurboMode: boolean): Promise<AnalysisResult> => {
    const prompt = `B2B Intelligence: Create ICP for: ${JSON.stringify(brief)}. Focus on identifying 'High-Intent' signals rather than just job titles.`;
    const res = await callGemini<AnalysisResult>(prompt, Schemas.analysisResultSchema, isTurboMode);
    return res.data;
};

export const generateLoneWolfReport = async (brief: StrategicBrief, isTurboMode: boolean): Promise<LoneWolfReport> => {
    const prompt = `Lone Wolf Deal Architect: Revenue Plays for: ${JSON.stringify(brief)}. Ensure every play uses AI to eliminate 100% of human overhead.`;
    const res = await callGemini<LoneWolfReport>(prompt, Schemas.loneWolfReportSchema, isTurboMode);
    return res.data;
};

export const generateRealEstateAlpha = async (brief: StrategicBrief, isTurboMode: boolean): Promise<RealEstateAlphaReport> => {
    const prompt = `RE Hedge Fund Analyst: Esoteric Alpha for: ${JSON.stringify(brief)}. Use AI to find correlations between public records and private distress signals.`;
    const res = await callGemini<RealEstateAlphaReport>(prompt, Schemas.realEstateAlphaSchema, isTurboMode);
    return res.data;
};

export const generateChimericAgentReport = async (brief: StrategicBrief, isTurboMode: boolean): Promise<ChimericAgentReport> => {
    const prompt = `Persona Synthesis: Create a Chimeric Agent report for: ${JSON.stringify(brief)}.`;
    const res = await callGemini<ChimericAgentReport>(prompt, (Schemas as any).chimericAgentSchema, isTurboMode);
    return res.data;
};

export const generateGatekeeperBypassReport = async (brief: StrategicBrief, isTurboMode: boolean): Promise<GatekeeperBypassReport> => {
    const prompt = `JV Protocol: Gatekeeper Bypass strategy for: ${JSON.stringify(brief)}.`;
    const res = await callGemini<GatekeeperBypassReport>(prompt, (Schemas as any).gatekeeperBypassSchema, isTurboMode);
    return res.data;
};

export const generateAIVentureBlueprint = async (brief: StrategicBrief, isTurboMode: boolean): Promise<AIVentureBlueprint> => {
    const prompt = `Architect: AI Venture Blueprint for: ${JSON.stringify(brief)}.`;
    const res = await callGemini<AIVentureBlueprint>(prompt, (Schemas as any).aiVentureBlueprintSchema, isTurboMode);
    return res.data;
};

export const generateDominanceBlueprint = async (brief: StrategicBrief, isTurboMode: boolean): Promise<DominanceBlueprint> => {
    const prompt = `Kingmaker: Dominance Blueprint for: ${JSON.stringify(brief)}. Focus on building a Moat via proprietary AI logic.`;
    const res = await callGemini<DominanceBlueprint>(prompt, (Schemas as any).dominanceBlueprintSchema, isTurboMode);
    return res.data;
};

export const generateCashflowProtocol = async (brief: StrategicBrief, isTurboMode: boolean): Promise<CashflowProtocolReport> => {
    const prompt = `Closer: 48-Hour Cashflow Protocol for: ${JSON.stringify(brief)}.`;
    const res = await callGemini<CashflowProtocolReport>(prompt, (Schemas as any).cashflowProtocolSchema, isTurboMode);
    return res.data;
};

export const generateAlphaSignalReport = async (brief: StrategicBrief, isTurboMode: boolean): Promise<AlphaSignalReport> => {
    const prompt = `Quant: Alpha Signal Report for: ${JSON.stringify(brief)}. Find the asymmetric revenue triggers.`;
    const res = await callGemini<AlphaSignalReport>(prompt, Schemas.alphaSignalSchema, isTurboMode);
    return res.data;
};

export const generateCompetitiveDisplacementBrief = async (brief: StrategicBrief, isTurboMode: boolean): Promise<CompetitiveDisplacementBrief> => {
    const prompt = `Wedge Strategy: Competitive Displacement for: ${JSON.stringify(brief)}. Use AI to identify the exact technical weakness of the incumbent.`;
    const res = await callGemini<CompetitiveDisplacementBrief>(prompt, (Schemas as any).competitiveDisplacementSchema, isTurboMode);
    return res.data;
};

export const generateB2CDeconstruction = async (brief: StrategicBrief, isTurboMode: boolean): Promise<B2CMarketDeconstruction> => {
    const prompt = `Consumer Analyst: B2C Deconstruction for: ${JSON.stringify(brief)}.`;
    const res = await callGemini<B2CMarketDeconstruction>(prompt, (Schemas as any).b2cDeconSchema, isTurboMode);
    return res.data;
};

export const generateLiveMarketIntel = async (brief: StrategicBrief, isTurboMode: boolean): Promise<LiveMarketIntelReport> => {
    const prompt = `Intel System: Live Market Intelligence for: ${JSON.stringify(brief)}. Browsing the live web for current trends, competitor moves, and news.`;
    // ACTIVATE GOOGLE SEARCH GROUNDING
    const res = await callGemini<LiveMarketIntelReport>(prompt, (Schemas as any).liveMarketIntelSchema, isTurboMode, true);
    
    // Enrich the data with grounding metadata if it exists
    if (res.groundingMetadata?.groundingChunks) {
        const sources = res.groundingMetadata.groundingChunks
            .map((chunk: any) => chunk.web)
            .filter((web: any) => web && web.uri);
        res.data.sources = [...(res.data.sources || []), ...sources];
    }
    
    return res.data;
};

export const generateDemandSignal = async (brief: StrategicBrief, isTurboMode: boolean): Promise<DemandSignalReport> => {
    const prompt = `Forecaster: Demand Signal Report for: ${JSON.stringify(brief)}. Use live search data to predict buying probability and intent decay.`;
    // ACTIVATE GOOGLE SEARCH GROUNDING
    const res = await callGemini<DemandSignalReport>(prompt, (Schemas as any).demandSignalSchema, isTurboMode, true);
    return res.data;
};

export const generateOpportunityRadar = async (brief: StrategicBrief, isTurboMode: boolean): Promise<OpportunityRadarReport> => {
    const prompt = `Radar: Opportunity Radar for: ${JSON.stringify(brief)}. Use live market data to find real trends and growth signals.`;
    const res = await callGemini<OpportunityRadarReport>(prompt, (Schemas as any).opportunityRadarSchema, isTurboMode, true);
    return res.data;
};

export const generateEdgarAnomaly = async (brief: StrategicBrief, isTurboMode: boolean): Promise<EdgarAnomalyReport> => {
    const prompt = `Forensic: Edgar Anomaly Scan for: ${JSON.stringify(brief)}. Browse actual SEC filings and financial reports via Google Search.`;
    const res = await callGemini<EdgarAnomalyReport>(prompt, (Schemas as any).edgarAnomalySchema, isTurboMode, true);
    return res.data;
};

export const generateAIVideoFoundry = async (brief: StrategicBrief, isTurboMode: boolean): Promise<AIVideoFoundryReport> => {
    const prompt = `Video Factory: AI Video Foundry Report for: ${JSON.stringify(brief)}.`;
    const res = await callGemini<AIVideoFoundryReport>(prompt, (Schemas as any).aiVideoFoundrySchema, isTurboMode);
    return res.data;
};

export const generateHighLeveragePlaybook = async (strategy: MonetizationStrategy, isTurboMode: boolean): Promise<HighLeveragePlaybook> => {
    const prompt = `Strategist: High Leverage Playbook based on: ${JSON.stringify(strategy)}.`;
    const res = await callGemini<HighLeveragePlaybook>(prompt, (Schemas as any).highLeveragePlaybookSchema, isTurboMode);
    return res.data;
};

export const generateAlphaAcquisitionPlaybook = async (playbook: HighLeveragePlaybook, isTurboMode: boolean): Promise<AlphaAcquisitionPlaybook> => {
    const prompt = `Acquisition Expert: Alpha Acquisition Protocol based on: ${JSON.stringify(playbook)}.`;
    const res = await callGemini<AlphaAcquisitionPlaybook>(prompt, (Schemas as any).alphaAcquisitionSchema, isTurboMode);
    return res.data;
};

export const generateAICode = async (prompt: string, isTurboMode: boolean): Promise<AICode> => {
    const aiPrompt = `Engineer: Write functional frontend code for: ${prompt}.`;
    const res = await callGemini<AICode>(aiPrompt, (Schemas as any).aiCodeSchema, isTurboMode);
    return res.data;
};

export const generateLandingPageBlueprint = async (prompt: string, isTurboMode: boolean): Promise<LandingPageBlueprint> => {
    const aiPrompt = `Copywriter: Create a Landing Page Blueprint for: ${prompt}.`;
    const res = await callGemini<LandingPageBlueprint>(aiPrompt, (Schemas as any).landingPageBlueprintSchema, isTurboMode);
    return res.data;
};

export const generateLandingPageCode = async (blueprint: LandingPageBlueprint, isTurboMode: boolean): Promise<AICode> => {
    const aiPrompt = `Engineer: Write the full HTML/Tailwind code for this blueprint: ${JSON.stringify(blueprint)}.`;
    const res = await callGemini<AICode>(aiPrompt, (Schemas as any).aiCodeSchema, isTurboMode);
    return res.data;
};

export const scoreProspectsList = async (list: string, icp: AnalysisResult, isTurboMode: boolean): Promise<ScoredProspect[]> => {
    const prompt = `Rank these prospects based on the ICP: ${list}. ICP: ${JSON.stringify(icp)}.`;
    const res = await callGemini<{ prospects: ScoredProspect[] }>(prompt, (Schemas as any).scoredProspectsSchema, isTurboMode);
    return res.data.prospects;
};

export const generateArchimedesProtocol = async (context: any, isTurboMode: boolean): Promise<ArchimedesProtocolReport> => {
    const prompt = `Architect: Generate the Archimedes ProtocolMaster Plan for: ${JSON.stringify(context)}.`;
    const res = await callGemini<ArchimedesProtocolReport>(prompt, (Schemas as any).archimedesProtocolSchema, isTurboMode);
    return res.data;
};

export const generateMonetizationStrategy = async (audience: DiscoveredAudience | B2CDiscoveredAudience, isTurboMode: boolean): Promise<MonetizationStrategy> => {
    const prompt = `Monetization Expert: Strategy for: ${JSON.stringify(audience)}.`;
    const res = await callGemini<MonetizationStrategy>(prompt, (Schemas as any).monetizationStrategySchema, isTurboMode);
    return res.data;
};

export const generateSovereignAgents = async (play: any, sourceReportType: string, isTurboMode: boolean): Promise<SovereignAgent[]> => {
    const prompt = `Manager: Instantiate 3 Sovereign Agents to execute: ${JSON.stringify(play)} from ${sourceReportType}.`;
    const res = await callGemini<{ agents: SovereignAgent[] }>(prompt, (Schemas as any).sovereignAgentsSchema, isTurboMode);
    return res.data.agents;
};

export const executeAgentTask = async (agent: SovereignAgent, taskBrief: string, isTurboMode: boolean): Promise<any> => {
    const prompt = `Agent (${agent.agentType}): Execute task: ${taskBrief}. Context: ${agent.overallBrief}. Use live search grounding if current info is needed.`;
    const res = await callGemini<any>(prompt, (Schemas as any).agentTaskResultSchema, isTurboMode, true);
    return res.data;
};
