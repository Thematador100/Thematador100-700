
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { 
    StrategicBrief, 
    GatekeeperBypassReport,
    LoneWolfReport,
    ChimericAgentReport,
    SovereignAgent,
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
    HighLeveragePlaybook,
    AlphaAcquisitionPlaybook,
    AICode,
    LandingPageBlueprint,
    ScoredProspect,
    ArchimedesProtocolReport,
    SovereignTask,
    MonetizationStrategy,
    DiscoveredAudience,
    B2CDiscoveredAudience
} from '../types';
import * as Schemas from './geminiSchemas';

const getModel = (isTurboMode: boolean) => {
    return isTurboMode ? "gemini-3-flash-preview" : "gemini-3-pro-preview";
};

// --- ROBUST JSON EXTRACTION ---
const cleanJson = (text: string): string => {
    if (!text) return "";
    
    // 1. Remove Markdown code blocks
    let clean = text.replace(/```json/gi, "").replace(/```/g, "").trim();

    // 2. Aggressive JSON Extraction: Find the first '{' and last '}'
    const firstOpenBrace = clean.indexOf('{');
    const lastCloseBrace = clean.lastIndexOf('}');
    
    // Also check for Arrays
    const firstOpenBracket = clean.indexOf('[');
    const lastCloseBracket = clean.lastIndexOf(']');

    // Determine if it looks like an Object or an Array
    let isArray = false;
    if (firstOpenBracket !== -1 && (firstOpenBrace === -1 || firstOpenBracket < firstOpenBrace)) {
        isArray = true;
    }

    if (isArray) {
        if (firstOpenBracket !== -1 && lastCloseBracket !== -1) {
            return clean.substring(firstOpenBracket, lastCloseBracket + 1);
        }
    } else {
        if (firstOpenBrace !== -1 && lastCloseBrace !== -1) {
            return clean.substring(firstOpenBrace, lastCloseBrace + 1);
        }
    }

    return clean;
};

const getApiKey = (): string | undefined => {
    try {
        if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
            return process.env.API_KEY;
        }
    } catch (e) {}
    return undefined;
};

const withTimeout = <T>(promise: Promise<T>, ms: number, msg: string): Promise<T> => {
    let timer: any;
    const timeout = new Promise<T>((_, reject) => {
        timer = setTimeout(() => reject(new Error(msg)), ms);
    });
    return Promise.race([
        promise.then(res => { clearTimeout(timer); return res; }),
        timeout
    ]);
};

async function callGemini<T>(prompt: string, schema: any, isTurboMode: boolean): Promise<T> {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("Deployment Error: API Key is missing.");
    }

    const ai = new GoogleGenAI({ apiKey });
    const modelId = getModel(isTurboMode);
    
    try {
        const response = await withTimeout<GenerateContentResponse>(
            ai.models.generateContent({
                model: modelId,
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                }
            }),
            60000,
            "Request Timed Out."
        );
        
        const text = response.text;
        if (!text) throw new Error("Empty response.");

        try {
            const cleanedText = cleanJson(text);
            return JSON.parse(cleanedText) as T;
        } catch (parseError) {
            throw new Error(`Failed to parse AI response.`);
        }
    } catch (e: any) {
        throw e;
    }
}

// --- SOVEREIGN ENGINE & ARCHIMEDES ---

export const generateArchimedesProtocol = async (context: any, isTurboMode: boolean): Promise<ArchimedesProtocolReport> => {
    const prompt = `
    Context: ${JSON.stringify(context)}
    
    You are Archimedes, the Architect of Global Leverage. 
    Design a master automation protocol to execute the strategy defined in the context.
    
    Requirements:
    1. **Mandate**: Define the core principle of this empire.
    2. **Foundry**: Outline an automated asset creation workflow.
    3. **C-Suite**: Define a team of AI Agents.
    4. **Arsenal**: Suggest specific communication, data, and vision tools (APIs, tools).
    `;
    return callGemini<ArchimedesProtocolReport>(prompt, Schemas.archimedesProtocolSchema, isTurboMode);
};

export const executeAgentTask = async (agent: SovereignAgent, taskBrief: string, isTurboMode: boolean): Promise<Partial<SovereignTask>> => {
    const prompt = `
    You are an AI Sovereign Agent.
    Role: ${agent.agentType}
    Overall Mission: ${agent.overallBrief}
    
    Current Task: ${taskBrief}
    
    TASK EXECUTION PROTOCOL:
    1. Perform deep reasoning on how to execute this task for the user.
    2. Provide a 'status' (Completed).
    3. Provide an 'insight' explaining your logic.
    4. Suggest the 'suggestedNextTask' for the user.
    5. Generate 'actionableOutput' (at least 1 item). If the task is technical, return code snippets. If it's strategic, return a specific plan.
    `;
    return callGemini<Partial<SovereignTask>>(prompt, Schemas.agentTaskExecutionSchema, isTurboMode);
};

// --- ASSET GENERATION PROTOCOLS ---

export const generateAICode = async (promptText: string, isTurboMode: boolean): Promise<AICode> => {
    const prompt = `
    You are an Expert Frontend Engineer (React/Tailwind).
    TASK: ${promptText}
    Return a SINGLE JSON object with a 'generatedCode' field (raw HTML string).
    `;
    const schema = { type: Type.OBJECT, properties: { generatedCode: { type: Type.STRING } } };
    return callGemini<AICode>(prompt, schema, isTurboMode);
};

export const generateLandingPageBlueprint = async (promptText: string, isTurboMode: boolean): Promise<LandingPageBlueprint> => {
    const prompt = `
    Direct Response CRO Expert: Generate a high-converting Landing Page Blueprint for: ${promptText}.
    Include Hero, Problem, Solution, Social Proof, CTA.
    `;
    const schema = {
        type: Type.OBJECT,
        properties: {
            pageTitle: { type: Type.STRING },
            sections: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        sectionType: { type: Type.STRING },
                        headline: { type: Type.STRING },
                        subheadline: { type: Type.STRING },
                        body: { type: Type.STRING },
                        ctaButtonText: { type: Type.STRING }
                    }
                }
            }
        }
    };
    return callGemini<LandingPageBlueprint>(prompt, schema, isTurboMode);
};

export const generateLandingPageCode = async (blueprint: LandingPageBlueprint, isTurboMode: boolean): Promise<AICode> => {
    const prompt = `
    Convert this Landing Page Blueprint into a high-fidelity, single-file HTML/React/Tailwind page:
    ${JSON.stringify(blueprint)}
    `;
    const schema = { type: Type.OBJECT, properties: { generatedCode: { type: Type.STRING } } };
    return callGemini<AICode>(prompt, schema, isTurboMode);
};

// --- CORE ANALYSIS PROTOCOLS ---

export const scoreProspectsList = async (prospectsList: string, analysisResult: AnalysisResult, isTurboMode: boolean): Promise<ScoredProspect[]> => {
    const prompt = `
    Predictive Sales Analyst. Score these prospects against this ICP: ${analysisResult.sharedProfile.summary}.
    List: ${prospectsList}
    `;
    return callGemini<ScoredProspect[]>(prompt, Schemas.scoredProspectsSchema, isTurboMode);
};

export const generateAIVentureBlueprint = async (brief: StrategicBrief, isTurboMode: boolean): Promise<AIVentureBlueprint> => {
    const prompt = `Venture Architect: Design a Micro-SaaS based on: ${JSON.stringify(brief)}.`;
    return callGemini<AIVentureBlueprint>(prompt, Schemas.aiVentureBlueprintSchema, isTurboMode);
};

export const generateOpportunityBrief = async (brief: StrategicBrief, isTurboMode: boolean): Promise<OpportunityBrief> => {
    const prompt = `Market Detective: Find a 'Starving Crowd' opportunity in: ${JSON.stringify(brief)}.`;
    return callGemini<OpportunityBrief>(prompt, Schemas.opportunityBriefSchema, isTurboMode);
};

export const generateB2BAnalysis = async (brief: StrategicBrief, isTurboMode: boolean): Promise<AnalysisResult> => {
    const prompt = `B2B Intelligence: Create ICP for: ${JSON.stringify(brief)}.`;
    return callGemini<AnalysisResult>(prompt, Schemas.analysisResultSchema, isTurboMode);
};

export const generateDominanceBlueprint = async (brief: StrategicBrief, isTurboMode: boolean): Promise<DominanceBlueprint> => {
    const prompt = `PE Strategist: Create Dominance Blueprint for: ${JSON.stringify(brief)}.`;
    return callGemini<DominanceBlueprint>(prompt, Schemas.dominanceBlueprintSchema, isTurboMode);
};

export const generateCashflowProtocol = async (brief: StrategicBrief, isTurboMode: boolean): Promise<CashflowProtocolReport> => {
    const prompt = `Crisis Turnaround Expert: 48-Hour Cashflow Protocol for: ${JSON.stringify(brief)}.`;
    return callGemini<CashflowProtocolReport>(prompt, Schemas.cashflowProtocolSchema, isTurboMode);
};

export const generateRealEstateAlpha = async (brief: StrategicBrief, isTurboMode: boolean): Promise<RealEstateAlphaReport> => {
    const prompt = `RE Hedge Fund Analyst: Esoteric Alpha for: ${JSON.stringify(brief)}.`;
    return callGemini<RealEstateAlphaReport>(prompt, Schemas.realEstateAlphaSchema, isTurboMode);
};

export const generateAlphaSignalReport = async (brief: StrategicBrief, isTurboMode: boolean): Promise<AlphaSignalReport> => {
    const prompt = `Quant Analyst: Alpha Signal Report for: ${JSON.stringify(brief)}.`;
    return callGemini<AlphaSignalReport>(prompt, Schemas.alphaSignalSchema, isTurboMode);
};

export const generateGatekeeperBypassReport = async (brief: StrategicBrief, isTurboMode: boolean): Promise<GatekeeperBypassReport> => {
    const prompt = `JV Dealmaker: Asset Leverage Protocol for: ${JSON.stringify(brief)}.`;
    return callGemini<GatekeeperBypassReport>(prompt, Schemas.gatekeeperBypassReportSchema, isTurboMode);
};

export const generateLoneWolfReport = async (brief: StrategicBrief, isTurboMode: boolean): Promise<LoneWolfReport> => {
    const prompt = `Lone Wolf Deal Architect: Revenue Plays for: ${JSON.stringify(brief)}.`;
    return callGemini<LoneWolfReport>(prompt, Schemas.loneWolfReportSchema, isTurboMode);
};

export const generateChimericAgentReport = async (brief: StrategicBrief, isTurboMode: boolean): Promise<ChimericAgentReport> => {
    const prompt = `Chimeric Agent Strategist: Synthesis for: ${JSON.stringify(brief)}.`;
    return callGemini<ChimericAgentReport>(prompt, Schemas.chimericAgentReportSchema, isTurboMode);
};

export const generateCompetitiveDisplacementBrief = async (brief: StrategicBrief, isTurboMode: boolean): Promise<CompetitiveDisplacementBrief> => {
    const prompt = `Corporate Raider: Displacement Strategy for: ${JSON.stringify(brief)}.`;
    return callGemini<CompetitiveDisplacementBrief>(prompt, Schemas.competitiveDisplacementBriefSchema, isTurboMode);
};

export const generateB2CDeconstruction = async (brief: StrategicBrief, isTurboMode: boolean): Promise<B2CMarketDeconstruction> => {
    const prompt = `DTC Brand Architect: B2C Deconstruction for: ${JSON.stringify(brief)}.`;
    return callGemini<B2CMarketDeconstruction>(prompt, Schemas.b2cMarketDeconstructionSchema, isTurboMode);
};

export const generateLiveMarketIntel = async (brief: StrategicBrief, isTurboMode: boolean): Promise<LiveMarketIntelReport> => {
    const prompt = `Macro Strategist: Real-time Intel for: ${brief.marketTopic}.`;
    return callGemini<LiveMarketIntelReport>(prompt, Schemas.liveMarketIntelSchema, isTurboMode);
};

export const generateDemandSignal = async (brief: StrategicBrief, isTurboMode: boolean): Promise<DemandSignalReport> => {
    const prompt = `Predictive Behavioral Analyst: Buying Prob for: ${brief.marketTopic}.`;
    return callGemini<DemandSignalReport>(prompt, Schemas.demandSignalSchema, isTurboMode);
};

export const generateOpportunityRadar = async (brief: StrategicBrief, isTurboMode: boolean): Promise<OpportunityRadarReport> => {
    const prompt = `VC Scout: Opportunity Radar for: ${brief.marketTopic}.`;
    return callGemini<OpportunityRadarReport>(prompt, Schemas.opportunityRadarSchema, isTurboMode);
};

export const generateEdgarAnomaly = async (brief: StrategicBrief, isTurboMode: boolean): Promise<EdgarAnomalyReport> => {
    const prompt = `Forensic Accountant: Edgar Scan for: ${brief.marketTopic}.`;
    return callGemini<EdgarAnomalyReport>(prompt, Schemas.edgarAnomalySchema, isTurboMode);
};

export const generateAIVideoFoundry = async (brief: StrategicBrief, isTurboMode: boolean): Promise<AIVideoFoundryReport> => {
    const prompt = `AI Video Director: Video Foundry for: ${brief.marketTopic}.`;
    return callGemini<AIVideoFoundryReport>(prompt, Schemas.aiVideoFoundrySchema, isTurboMode);
};

export const generateSovereignAgents = async (play: any, sourceReportType: string, isTurboMode: boolean): Promise<SovereignAgent[]> => {
    const prompt = `
    Context: ${JSON.stringify(play)}
    Source Report: ${sourceReportType}
    Generate specialized AI Workforce (Sovereign Agents).
    `;
    return callGemini<SovereignAgent[]>(prompt, Schemas.sovereignAgentsSchema, isTurboMode);
};

export const generateHighLeveragePlaybook = async (strategy: MonetizationStrategy, isTurboMode: boolean): Promise<HighLeveragePlaybook> => {
    const prompt = `Billionaire Strategist: High Leverage Playbook for: ${JSON.stringify(strategy)}.`;
    return callGemini<HighLeveragePlaybook>(prompt, Schemas.highLeveragePlaybookSchema, isTurboMode);
};

export const generateAlphaAcquisitionPlaybook = async (playbook: HighLeveragePlaybook, isTurboMode: boolean): Promise<AlphaAcquisitionPlaybook> => {
    const prompt = `Lead Gen Expert: Alpha Acquisition Protocol for: ${JSON.stringify(playbook)}.`;
    return callGemini<AlphaAcquisitionPlaybook>(prompt, Schemas.alphaAcquisitionPlaybookSchema, isTurboMode);
};

export const generateMonetizationStrategy = async (audience: DiscoveredAudience | B2CDiscoveredAudience, isTurboMode: boolean): Promise<MonetizationStrategy> => {
    const prompt = `
    You are a high-level Monetization Architect. 
    Context: ${JSON.stringify(audience)}
    
    MISSION:
    Develop a complete commercial strategy for this specific audience. 
    1. Define the 'Core Opportunity'.
    2. Create 2-3 'Product Ideas' with pricing tiers.
    3. Outline the 'Go-to-Market' strategy.
    4. Define a 'Lead Source Protocol' for immediate customer acquisition.
    `;
    return callGemini<MonetizationStrategy>(prompt, Schemas.monetizationStrategySchema, isTurboMode);
};
