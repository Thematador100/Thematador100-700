
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
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
    MonetizationStrategy,
    AICode,
    LandingPageBlueprint,
    ScoredProspect
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

// Helper to safely access env var without crashing client-side bundlers that don't polyfill 'process'
const getApiKey = (): string | undefined => {
    try {
        // Try accessing via process.env directly (bundlers often replace this string literal)
        // We use a safe check to avoid ReferenceError if process is not defined
        if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
            return process.env.API_KEY;
        }
    } catch (e) {
        // Swallow reference errors
    }
    return undefined;
};

// Timeout helper to prevent infinite spinning
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
        throw new Error("Deployment Error: API Key is missing. Please check your environment variables settings (API_KEY) in your hosting dashboard.");
    }

    const ai = new GoogleGenAI({ apiKey });
    const modelId = getModel(isTurboMode);
    
    try {
        console.log(`Calling Gemini Model: ${modelId}`);
        
        // Wrap the API call in a 60-second timeout to prevent infinite spinning
        const response = await withTimeout<GenerateContentResponse>(
            ai.models.generateContent({
                model: modelId,
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                }
            }),
            60000, // 60 seconds timeout
            "Request Timed Out: The AI model took too long to respond. The system prevented an infinite loading state. Please try again or use Turbo Mode."
        );
        
        const text = response.text;
        if (!text) throw new Error("Gemini returned an empty response.");
        
        console.log("Raw Gemini Response (first 100 chars):", text.substring(0, 100));

        try {
            const cleanedText = cleanJson(text);
            return JSON.parse(cleanedText) as T;
        } catch (parseError) {
            console.error("JSON Parse Critical Failure. Raw Text:", text);
            throw new Error(`Failed to parse AI response. The model output was not valid JSON.`);
        }
    } catch (e: any) {
        console.error("Gemini API Execution Error:", e);
        // Enhance error message for common deployment issues
        if (e.message?.includes('API_KEY') || e.message?.includes('401') || e.message?.includes('403')) {
            throw new Error("Authentication Failed: The API Key provided is invalid or has expired. Please check your deployment settings.");
        }
        throw e;
    }
}

// --- ASSET GENERATION PROTOCOLS (FOUNDRY & LANDING PAGE) ---

export const generateAICode = async (promptText: string, isTurboMode: boolean): Promise<AICode> => {
    const prompt = `
    You are an Expert Frontend Engineer (React/Tailwind).
    
    TASK:
    ${promptText}
    
    REQUIREMENTS:
    1. Return a SINGLE JSON object with a 'generatedCode' field.
    2. The code must be a single HTML file string containing React, Tailwind script, and Babel script.
    3. It must be fully functional and self-contained (no external imports other than the CDN scripts).
    4. Make it look professional and modern (Dark mode, gradients, glassmorphism).
    5. CRITICAL: Do NOT wrap the 'generatedCode' string value in markdown code blocks (e.g., no \`\`\`html inside the JSON value). Just return the raw HTML string.
    
    Example Schema: { "generatedCode": "<!DOCTYPE html>..." }
    `;
    
    // Simple schema for code generation
    const schema = {
        type: "OBJECT",
        properties: {
            generatedCode: { type: "STRING" }
        }
    };
    
    return callGemini<AICode>(prompt, schema, isTurboMode);
};

export const generateLandingPageBlueprint = async (promptText: string, isTurboMode: boolean): Promise<LandingPageBlueprint> => {
    const prompt = `
    You are a Direct Response Copywriter and CRO Expert.
    
    TASK:
    ${promptText}
    
    REQUIREMENTS:
    Generate a high-converting Landing Page Blueprint.
    Include specific copy for Hero, Problem, Solution, Social Proof, and CTA sections.
    `;
    
    const schema = {
        type: "OBJECT",
        properties: {
            pageTitle: { type: "STRING" },
            sections: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        sectionType: { type: "STRING" },
                        headline: { type: "STRING" },
                        subheadline: { type: "STRING" },
                        body: { type: "STRING" },
                        ctaButtonText: { type: "STRING" }
                    }
                }
            }
        }
    };
    
    return callGemini<LandingPageBlueprint>(prompt, schema, isTurboMode);
};

export const generateLandingPageCode = async (blueprint: LandingPageBlueprint, isTurboMode: boolean): Promise<AICode> => {
    const prompt = `
    You are a Senior Web Developer.
    
    TASK:
    Convert this Landing Page Blueprint into a high-fidelity, single-file HTML/React/Tailwind page.
    
    BLUEPRINT:
    ${JSON.stringify(blueprint)}
    
    REQUIREMENTS:
    1. Use a modern, dark-themed design with gradients (slate-900 background).
    2. Use Tailwind CSS via CDN.
    3. Use React and ReactDOM via CDN.
    4. Return valid JSON: { "generatedCode": "..." }
    5. CRITICAL: Do NOT wrap the 'generatedCode' string value in markdown code blocks.
    `;
    
    const schema = {
        type: "OBJECT",
        properties: {
            generatedCode: { type: "STRING" }
        }
    };
    
    return callGemini<AICode>(prompt, schema, isTurboMode);
};

// --- CORE ANALYSIS PROTOCOLS ---

export const scoreProspectsList = async (prospectsList: string, analysisResult: AnalysisResult, isTurboMode: boolean): Promise<ScoredProspect[]> => {
    const prompt = `
    You are a Predictive Sales Analyst.
    
    CONTEXT:
    The user has generated an Ideal Customer Profile (ICP) for a specific B2B market.
    ICP Summary: ${analysisResult.sharedProfile.summary}
    Quantitative Scoring Formula: ${analysisResult.sharedProfile.quantitativeModel.decisionScoreFormula}
    
    TASK:
    Analyze the provided raw list of prospects. Score each prospect from 0-100 based on how well they fit the ICP and the likelihood of them buying.
    
    RAW PROSPECT LIST:
    ${prospectsList}
    
    REQUIREMENTS:
    1. Return a JSON array of objects.
    2. Each object must have: 'prospectInfo' (the name/details from the list), 'fitScore' (0-100 number), and 'rationale' (why you gave this score).
    3. Be critical. Do not give everyone a high score. Use the "Quantitative Model" logic to deduct points for bad fits.
    `;
    
    return callGemini<ScoredProspect[]>(prompt, Schemas.scoredProspectsSchema, isTurboMode);
};

export const generateAIVentureBlueprint = async (brief: StrategicBrief, isTurboMode: boolean): Promise<AIVentureBlueprint> => {
    const prompt = `
    Context: ${JSON.stringify(brief)}
    
    You are a Technical Co-Founder and Venture Architect.
    
    TASK:
    Design a "Micro-SaaS" or AI Tool business blueprint based on the provided context.
    The goal is a "Results-in-Advance" tool: A free or low-cost utility that solves a specific, painful problem for the target audience, capturing leads in the process.
    
    REQUIREMENTS:
    1. **Data Feasibility**: Assess if the data needed for this tool is available via APIs (OpenAI, Google Maps, public records) or scraping.
    2. **Tool Concept**: Name and describe the tool. It should produce a valuable "Digital Asset" for the user (e.g., a PDF report, a generated plan, a checked list).
    3. **Backend Logic**: Provide pseudo-code or specific instructions for a serverless function (Node.js/Python) that would power this tool.
    4. **Sales Agent**: Define the personality and opening script for an AI agent that would follow up with users who use the tool.
    5. **Ultimate Prompt**: Write the *exact* prompt the user would paste into a coding LLM (like Claude or GPT-4) to build the frontend of this tool in one shot.

    Return JSON matching the schema.
    `;
    return callGemini<AIVentureBlueprint>(prompt, Schemas.aiVentureBlueprintSchema, isTurboMode);
};

export const generateOpportunityBrief = async (brief: StrategicBrief, isTurboMode: boolean): Promise<OpportunityBrief> => {
    const prompt = `
    Context: ${JSON.stringify(brief)}
    
    You are a Market Detective seeking "Hair on Fire" problems.
    
    TASK:
    Analyze the provided context to find a "Starving Crowd" opportunity.
    
    REQUIREMENTS:
    1. **Starving Crowd**: Define the specific segment that is desperate for a solution.
    2. **Aspirin Problem**: Define the urgent, painful problem they have right now (not a "vitamin" problem).
    3. **Gauntlet Verdict**: Run this opportunity through the "10-Point Viability Gauntlet" (Urgent? Reachable? Can pay?).
    4. **Solution**: Propose an AI-powered solution.
    5. **Results-in-Advance**: Define a mechanism to prove value before they buy.
    6. **Sales Asset**: CRITICAL: You must generate a 'salesPitchAsset' object. Include a 'pitchPersona', a 60-second 'pitchScript' (VSL), and a 'videoScenePrompt' for AI video generation.
    
    Return JSON matching the schema.
    `;
    return callGemini<OpportunityBrief>(prompt, Schemas.opportunityBriefSchema, isTurboMode);
};

export const generateB2BAnalysis = async (brief: StrategicBrief, isTurboMode: boolean): Promise<AnalysisResult> => {
    const prompt = `
    Context: ${JSON.stringify(brief)}
    
    You are a B2B Intelligence Analyst.
    
    TASK:
    Create a deep Ideal Customer Profile (ICP) analysis.
    
    REQUIREMENTS:
    1. **Shared Profile**: Demographics, firmographics, and psychographics of the ideal buyer.
    2. **Lookalike Prospects**: Generate a list of 5 specific "Archetype" prospects (Job Title + Company Type) that match this profile.
    3. **Search Queries**: Provide "Google Dork" and LinkedIn Boolean search strings to find these people.
    
    Return JSON matching the schema.
    `;
    return callGemini<AnalysisResult>(prompt, Schemas.analysisResultSchema, isTurboMode);
};

export const generateDominanceBlueprint = async (brief: StrategicBrief, isTurboMode: boolean): Promise<DominanceBlueprint> => {
    const prompt = `
    Context: ${JSON.stringify(brief)}
    
    You are a Private Equity Strategist.
    
    TASK:
    Create a "Dominance Blueprint" to capture significant market share.
    
    REQUIREMENTS:
    1. **Client Acquisition Engine**: Define traction channels and a "Dream 100" strategy.
    2. **Unfair Advantage Sales Protocol**: Script the sales process using psychological triggers (Agora style, Belfort style).
    
    Return JSON matching the schema.
    `;
    return callGemini<DominanceBlueprint>(prompt, Schemas.dominanceBlueprintSchema, isTurboMode);
};

export const generateCashflowProtocol = async (brief: StrategicBrief, isTurboMode: boolean): Promise<CashflowProtocolReport> => {
    const prompt = `
    Context: ${JSON.stringify(brief)}
    
    You are a Crisis Turnaround Expert. The user needs cash in 48 hours.
    
    TASK:
    Generate a "Cashflow Protocol" for immediate revenue generation.
    
    REQUIREMENTS:
    1. **Mindset**: Calibration for speed.
    2. **High Ticket Offer**: Construct a high-value offer from thin air (consulting, audit, done-for-you).
    3. **Kill List**: How to find the most likely buyers *today*.
    4. **Closing Script**: A direct-response sales script.
    
    Return JSON matching the schema.
    `;
    return callGemini<CashflowProtocolReport>(prompt, Schemas.cashflowProtocolSchema, isTurboMode);
};

export const generateRealEstateAlpha = async (brief: StrategicBrief, isTurboMode: boolean): Promise<RealEstateAlphaReport> => {
    const prompt = `
    Context: ${JSON.stringify(brief)}
    Available Data Points (User's Dataset): ${brief.dataPoints || "Standard Public Record Data"}
    
    You are a Real Estate Hedge Fund Analyst & Data Scientist.
    
    TASK:
    Identify "Esoteric Alpha" in the real estate market described.
    Crucially, you must build a "Predictive Leverage Scoring Model" utilizing the SPECIFIC DATA POINTS provided by the user (if any).
    
    REQUIREMENTS:
    1. **Esoteric Strategies**: Niche plays (e.g., tax liens, probate, zoning arb) that are overlooked.
    2. **Deal Flow Engine**: A system to find these deals automatically.
    3. **Predictive Model**: Create a formula using the provided data points to score leads from 0-100.
    4. **Investor Playbook**: Step-by-step execution guide.
    
    Return JSON matching the schema.
    `;
    return callGemini<RealEstateAlphaReport>(prompt, Schemas.realEstateAlphaSchema, isTurboMode);
};

export const generateAlphaSignalReport = async (brief: StrategicBrief, isTurboMode: boolean): Promise<AlphaSignalReport> => {
    const prompt = `
    Context: ${JSON.stringify(brief)}
    
    You are a Quantitative Analyst.
    
    TASK:
    Generate an "Alpha Signal" report identifying high-probability revenue plays based on data signals.
    
    Return JSON matching the schema.
    `;
    return callGemini<AlphaSignalReport>(prompt, Schemas.alphaSignalSchema, isTurboMode);
};

export const generateGatekeeperBypassReport = async (brief: StrategicBrief, isTurboMode: boolean): Promise<GatekeeperBypassReport> => {
    const prompt = `
    Context: ${JSON.stringify(brief)}
    Target Opportunity/Product: ${brief.opportunityDescription || "General High-Ticket Offer"}
    
    You are a World-Renowned Joint Venture Dealmaker and "Asset Arbitrage" Specialist.
    Your Philosophy: 
    1. "A list of 50,000 buyers who have already paid $150 for a supplement is worth 100x more than a cold audience."
    2. "Buying customers is slow. Borrowing trust is fast."
    3. "The key is to find Distressed Assets (partners who are struggling) or Natural Fits (Before/After markets)."
    4. "We never ask for favors. We make Godfather Proposals they cannot refuse."

    TASK:
    Generate a 'JV & Asset Leverage Protocol'. This is NOT about cold calling. It is about identifying existing lists of buyers and structuring a deal to monetize them immediately.

    Requirements:
    1. **Asset Map**: Identify "Upstream" partners (who serves the customer BEFORE they need us?) and "Downstream" partners (who serves them AFTER?).
    2. **Distress Radar**: specific signals that a list owner is struggling (e.g. ad library stopped active ads, bad reviews on recent launch, CEO stepped down) and is desperate for a monetization event.
    3. **Godfather Proposal**: A script/proposal that handles the objection "I don't know you." The offer must be "We do the work, you click send, you keep the front-end revenue."
    4. **Product Bridge**: If the user has no product, suggest what product they should build *specifically* for the partner's list to unlock the deal.

    Return JSON matching the schema.
    `;
    return callGemini<GatekeeperBypassReport>(prompt, Schemas.gatekeeperBypassReportSchema, isTurboMode);
};

export const generateLoneWolfReport = async (brief: StrategicBrief, isTurboMode: boolean): Promise<LoneWolfReport> => {
    const prompt = `
    Context: ${JSON.stringify(brief)}
    
    You are a "Lone Wolf" Deal Architect and Information Arbitrageur.
    Generate a report detailing high-value, low-overhead revenue plays that a single operator can execute using AI and information asymmetry.
    Focus on:
    1. Income Potential
    2. Time to First Cash
    3. Gatekeeper Bypass Tactics
    4. Required Assets (that AI can build)
    
    Return JSON matching the schema.
    `;
    return callGemini<LoneWolfReport>(prompt, Schemas.loneWolfReportSchema, isTurboMode);
};

export const generateChimericAgentReport = async (brief: StrategicBrief, isTurboMode: boolean): Promise<ChimericAgentReport> => {
    const prompt = `
    Context: ${JSON.stringify(brief)}
    
    You are a Chimeric Agent Strategist.
    Synthesize a new persona or "Chimeric Agent" based on the provided context to solve high-stakes problems.
    Define solutions, the leverage points, and monetization models.
    
    Return JSON matching the schema.
    `;
    return callGemini<ChimericAgentReport>(prompt, Schemas.chimericAgentReportSchema, isTurboMode);
};

export const generateCompetitiveDisplacementBrief = async (brief: StrategicBrief, isTurboMode: boolean): Promise<CompetitiveDisplacementBrief> => {
    const prompt = `
    Context: ${JSON.stringify(brief)}
    
    You are a Corporate Raider and Competitive Intelligence Expert.
    Analyze the competitive landscape for the topic provided.
    
    TASK:
    Identify a market incumbent or competitor type and design a strategy to displace them using an "AI-Powered Wedge".
    
    Requirements:
    1. **Traffic & Position**: Analyze where they get their customers.
    2. **The Wedge**: A specific, low-friction tool or offer that steals their customers by solving a problem they ignore.
    3. **Outreach**: Write cold email, RVM, and SMS scripts to target their customers directly.
    4. **Psycholinguistics**: Analyze the emotional drivers of this market.
    
    Return JSON matching the schema.
    `;
    return callGemini<CompetitiveDisplacementBrief>(prompt, Schemas.competitiveDisplacementBriefSchema, isTurboMode);
};

export const generateB2CDeconstruction = async (brief: StrategicBrief, isTurboMode: boolean): Promise<B2CMarketDeconstruction> => {
    const prompt = `
    Context: ${JSON.stringify(brief)}
    
    You are a Cultural Anthropologist and DTC Brand Architect.
    Deconstruct the B2C "Tribe" associated with the provided topic.
    
    TASK:
    Deep dive into the lifestyle, brands, and emotional triggers of this consumer group.
    
    Requirements:
    1. **Defining Interests**: What else do they like?
    2. **Brands**: Who do they trust? Who do they buy from?
    3. **Personas**: Detailed avatars.
    4. **Market Mind**: Emotional drivers and hot-button keywords.
    
    Return JSON matching the schema.
    `;
    return callGemini<B2CMarketDeconstruction>(prompt, Schemas.b2cMarketDeconstructionSchema, isTurboMode);
};

// --- DEEP RECONNAISSANCE PROTOCOLS ---

export const generateLiveMarketIntel = async (brief: StrategicBrief, isTurboMode: boolean): Promise<LiveMarketIntelReport> => {
    const prompt = `
    Topic: ${brief.marketTopic}
    Context: ${brief.opportunityDescription}
    
    You are a Global Macro Strategist and News Analyst.
    Perform a real-time synthesis of the current market landscape for this topic.
    
    TASK:
    1. **Latest Developments**: Summarize the most recent and impactful news, trends, or shifts.
    2. **Sentiment Analysis**: Is the market bullish, bearish, or fearful? Why?
    3. **Competitor Moves**: What are the big players doing right now?
    
    Return JSON matching the schema.
    `;
    return callGemini<LiveMarketIntelReport>(prompt, Schemas.liveMarketIntelSchema, isTurboMode);
};

export const generateDemandSignal = async (brief: StrategicBrief, isTurboMode: boolean): Promise<DemandSignalReport> => {
    const prompt = `
    Topic: ${brief.marketTopic}
    Context: ${brief.opportunityDescription}
    
    You are a Predictive Behavioral Analyst.
    Determine the "Buying Probability" of the target audience right now.
    
    TASK:
    1. **Score**: 0-100 Buying Probability.
    2. **Leading Indicators**: What specific events or data points signal intent to buy?
    3. **Decay Timeline**: How fast does this intent fade?
    
    Return JSON matching the schema.
    `;
    return callGemini<DemandSignalReport>(prompt, Schemas.demandSignalSchema, isTurboMode);
};

export const generateOpportunityRadar = async (brief: StrategicBrief, isTurboMode: boolean): Promise<OpportunityRadarReport> => {
    const prompt = `
    Topic: ${brief.marketTopic}
    Context: ${brief.opportunityDescription}
    
    You are a Venture Capital Scout.
    Scan the horizon for the single best "Alpha" opportunity in this sector.
    
    TASK:
    1. **Trends**: Identify high-growth trends.
    2. **Best Opportunity**: Isolate the "Starving Crowd" with the biggest pain.
    3. **Multiplier**: Define a 10x mechanism to win.
    
    Return JSON matching the schema.
    `;
    return callGemini<OpportunityRadarReport>(prompt, Schemas.opportunityRadarSchema, isTurboMode);
};

export const generateEdgarAnomaly = async (brief: StrategicBrief, isTurboMode: boolean): Promise<EdgarAnomalyReport> => {
    const prompt = `
    Target Company/Sector: ${brief.marketTopic}
    Focus Area: ${brief.opportunityDescription}
    
    You are a Forensic Accountant and Short Seller.
    Analyze the financial and operational health of this target/sector based on public knowledge (proxy for SEC filings).
    
    TASK:
    1. **Red Flags**: Look for accounting irregularities, executive departures, or weird footnotes.
    2. **Anomalies**: Deviations from the norm.
    3. **Verdict**: Is it safe or dangerous?
    
    Return JSON matching the schema.
    `;
    return callGemini<EdgarAnomalyReport>(prompt, Schemas.edgarAnomalySchema, isTurboMode);
};

export const generateAIVideoFoundry = async (brief: StrategicBrief, isTurboMode: boolean): Promise<AIVideoFoundryReport> => {
    const prompt = `
    Topic: ${brief.marketTopic}
    Context: ${brief.opportunityDescription}
    
    You are an AI Video Director and SaaS Product Architect.
    
    TASK:
    1. **Director's Cut**: Create a scene-by-scene script for a viral video that promotes a solution in this space. Include visual prompts for AI video generators (like Veo).
    2. **Technical Blueprint**: Design the tech stack to build a "Video-as-a-Service" wrapper around this concept.
    3. **Monetization**: How to sell this as a subscription product.
    
    Return JSON matching the schema.
    `;
    return callGemini<AIVideoFoundryReport>(prompt, Schemas.aiVideoFoundrySchema, isTurboMode);
};

export const generateSovereignAgents = async (play: any, sourceReportType: string, isTurboMode: boolean): Promise<SovereignAgent[]> => {
    const prompt = `
    Context: ${JSON.stringify(play)}
    Source Report: ${sourceReportType}
    
    Generate a list of Sovereign Autonomous Agents (AI workforce) required to execute the strategy described in the context.
    For each agent, define its type, initial status (usually "Idle"), an overall brief of its responsibilities, and a list of initial tasks.
    
    Return JSON matching the schema.
    `;
    return callGemini<SovereignAgent[]>(prompt, Schemas.sovereignAgentsSchema, isTurboMode);
};

export const generateHighLeveragePlaybook = async (strategy: MonetizationStrategy, isTurboMode: boolean): Promise<HighLeveragePlaybook> => {
    const prompt = `
    Context: ${JSON.stringify(strategy)}
    
    You are a Billionaire Strategist and Brand Architect.
    
    TASK:
    Generate a 'High Leverage Playbook' (Billionaire Blueprint) to execute the provided monetization strategy.
    
    REQUIREMENTS:
    1. **Brand Positioning**: Create a high-status persona and positioning statement.
    2. **Irresistible Offer**: Structure the core offer with a premium price point and component stack.
    3. **Search & Acquisition**: Define a protocol for finding high-value leads.
    4. **Funnel**: Define the step-by-step marketing funnel.
    5. **Sales Assets**: You MUST generate a 'salesPitchAsset' object containing a 'pitchPersona', 'pitchScript', and 'videoScenePrompt'.
    
    Return JSON matching the schema.
    `;
    return callGemini<HighLeveragePlaybook>(prompt, Schemas.highLeveragePlaybookSchema, isTurboMode);
};

export const generateAlphaAcquisitionPlaybook = async (playbook: HighLeveragePlaybook, isTurboMode: boolean): Promise<AlphaAcquisitionPlaybook> => {
    const prompt = `
    Context: ${JSON.stringify(playbook)}
    
    You are a Lead Generation & Partnership Expert.
    
    TASK:
    Create a tactical 'Alpha Acquisition Protocol' to execute the client acquisition strategy defined in the playbook.
    
    REQUIREMENTS:
    1. **Channel Partnerships**: Identify ideal partners and the offer to make them.
    2. **Buying Triggers**: Define specific events that signal intent and how to act on them.
    
    Return JSON matching the schema.
    `;
    return callGemini<AlphaAcquisitionPlaybook>(prompt, Schemas.alphaAcquisitionPlaybookSchema, isTurboMode);
};
