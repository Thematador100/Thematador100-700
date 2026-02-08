
import React, { useState, useEffect } from 'react';
import { StrategicBrief } from '../types';

interface AudienceFormProps {
    onGenerate: (brief: StrategicBrief) => void;
    isLoading: boolean;
    searchHistory: any[];
    isTurboMode: boolean;
    setIsTurboMode: (value: boolean) => void;
    analysisType: StrategicBrief['analysisType'];
    setAnalysisType: (type: StrategicBrief['analysisType']) => void;
    briefToLoad?: StrategicBrief | null;
}

const ModuleButton: React.FC<{ 
    type: string; 
    currentType: string; 
    onClick: (type: any) => void; 
    color: string;
    icon: string; 
    children: React.ReactNode 
}> = ({ type, currentType, onClick, color, icon, children }) => {
    const isSelected = type === currentType;
    const activeClass = `bg-${color}-600 text-white border-${color}-400 ring-2 ring-${color}-400 ring-offset-2 ring-offset-slate-900 shadow-lg scale-105`;
    const inactiveClass = `bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white`;

    return (
        <button
            type="button"
            onClick={() => onClick(type)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 w-full h-full ${isSelected ? activeClass : inactiveClass}`}
        >
            <span className="text-2xl mb-2">{icon}</span>
            <span className="text-xs font-bold text-center leading-tight">{children}</span>
        </button>
    );
};

const SectionHeader: React.FC<{ title: string; icon: string }> = ({ title, icon }) => (
    <div className="flex items-center gap-2 mb-3 mt-6 pb-2 border-b border-slate-700">
        <span className="text-xl">{icon}</span>
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">{title}</h3>
    </div>
);

const AudienceForm: React.FC<AudienceFormProps> = ({ 
    onGenerate, 
    isLoading, 
    isTurboMode, 
    setIsTurboMode, 
    analysisType, 
    setAnalysisType,
    briefToLoad
}) => {
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field3, setField3] = useState('');
    const [field4, setField4] = useState(''); // New field for Data Points

    useEffect(() => {
        if (briefToLoad) {
            setField1(briefToLoad.marketTopic || '');
            setField2(briefToLoad.opportunityDescription || '');
            setField3(''); 
            setField4('');
            if (briefToLoad.analysisType) {
                setAnalysisType(briefToLoad.analysisType);
            }
        }
    }, [briefToLoad, setAnalysisType]);

    // Define the input configuration for each analysis type
    const getFormConfig = () => {
        switch (analysisType) {
            case 'edgarAnomaly':
                return {
                    title: "Forensic Accounting Scan",
                    btn: 'Run Forensic Analysis',
                    inputs: [
                        { id: 1, label: 'Target Company Ticker / Name', placeholder: 'e.g. TSLA, NVDA, or Apple Inc.', type: 'input' },
                        { id: 2, label: 'Specific Focus Area (Optional)', placeholder: 'e.g. "Inventory Accounting", "Executive Compensation"', type: 'input' }
                    ]
                };
            case 'realEstateAlpha':
                return {
                    title: "Real Estate Alpha Hunter",
                    btn: 'Hunt for Alpha',
                    inputs: [
                        { id: 1, label: 'Target Market (City/Zip)', placeholder: 'e.g. Austin TX, 78702', type: 'input' },
                        { id: 2, label: 'Investment Strategy', placeholder: 'e.g. "Pre-probate", "Absentee Owner", "Zoning Arbitrage"', type: 'input' },
                        { id: 3, label: 'Capital Constraints (Optional)', placeholder: 'e.g. Under $50k down', type: 'input' },
                        { id: 4, label: 'Data Dictionary / Headers (Paste here)', placeholder: 'Paste your PropertyRadar/Data columns here (e.g. Equity%, LastSaleDate, ForeclosureStatus). DO NOT paste the full dataset.', type: 'textarea' }
                    ]
                };
            case 'gatekeeperBypass':
                return {
                    title: "JV & Asset Leverage Protocol",
                    btn: 'Find Partners',
                    inputs: [
                        { id: 1, label: 'Target Audience Profile', placeholder: 'e.g. Gym Owners doing $1M+ revenue', type: 'input' },
                        { id: 2, label: 'Your Core Offer / Product', placeholder: 'e.g. AI-powered lead gen agency', type: 'textarea' },
                        { id: 3, label: 'Partner Type (Optional)', placeholder: 'e.g. Software vendors, Equipment suppliers', type: 'input' }
                    ]
                };
            case 'aiVideoFoundry':
                return {
                    title: "AI Video Architect",
                    btn: 'Architect Video App',
                    inputs: [
                        { id: 1, label: 'Video Concept / Topic', placeholder: 'e.g. "A cyberpunk documentary about AI"', type: 'input' },
                        { id: 2, label: 'Target Audience / Goal', placeholder: 'e.g. "Tech investors, goal is to raise capital"', type: 'textarea' }
                    ]
                };
            case 'chimericAgent':
                return {
                    title: "Chimeric Persona Genesis",
                    btn: 'Synthesize Agent',
                    inputs: [
                        { id: 1, label: 'Persona Synthesis (A + B)', placeholder: 'e.g. "Steve Jobs mixed with Sun Tzu"', type: 'input' },
                        { id: 2, label: 'Problem Domain', placeholder: 'e.g. "Turnaround strategy for a failing SaaS"', type: 'textarea' }
                    ]
                };
            case 'b2b':
                return {
                    title: "Ideal Customer Profile (ICP)",
                    btn: 'Analyze ICP',
                    inputs: [
                        { id: 1, label: 'Target Market / Industry', placeholder: 'e.g. Enterprise Cyber Security', type: 'input' },
                        { id: 2, label: 'Ideal Buyer Details', placeholder: 'e.g. CISOs at Fortune 500 companies facing compliance issues', type: 'textarea' }
                    ]
                };
            case 'b2c':
                return {
                    title: "B2C Tribe Deconstruction",
                    btn: 'Deconstruct Tribe',
                    inputs: [
                        { id: 1, label: 'Target Consumer Tribe', placeholder: 'e.g. Biohackers, Crossfit Moms', type: 'input' },
                        { id: 2, label: 'Core Interests / Brands', placeholder: 'e.g. Bulletproof Coffee, Peloton, Rogan', type: 'textarea' }
                    ]
                };
            case 'competitiveDisplacement':
                return {
                    title: "Competitive Displacement",
                    btn: 'Generate Wedge Strategy',
                    inputs: [
                        { id: 1, label: 'Target Competitor / Incumbent', placeholder: 'e.g. Salesforce, HubSpot', type: 'input' },
                        { id: 2, label: 'Target Segment', placeholder: 'e.g. Small agencies who hate complexity', type: 'input' },
                        { id: 3, label: 'Your Unique Angle (Optional)', placeholder: 'e.g. "AI-first", "Cheaper", "Faster"', type: 'input' }
                    ]
                };
            case 'loneWolf':
                return {
                    title: "Lone Wolf Revenue Plays",
                    btn: 'Generate Revenue Plays',
                    inputs: [
                        { id: 1, label: 'Your Skillset / Expertise', placeholder: 'e.g. Copywriting, Python Coding', type: 'input' },
                        { id: 2, label: 'Income Goal / Constraint', placeholder: 'e.g. $20k/mo, remote only, no employees', type: 'input' }
                    ]
                };
            case 'starvingCrowd':
                return {
                    title: "Starving Crowd Finder",
                    btn: 'Find Starving Crowd',
                    inputs: [
                        { id: 1, label: 'Broad Market Category', placeholder: 'e.g. Remote Workers', type: 'input' },
                        { id: 2, label: 'Observed Complaint/Problem', placeholder: 'e.g. "Zoom fatigue", "Back pain"', type: 'textarea' }
                    ]
                };
            default:
                return {
                    title: "Standard Analysis",
                    btn: 'Initialize Protocol',
                    inputs: [
                        { id: 1, label: 'Target Market / Topic', placeholder: 'Enter main topic...', type: 'input' },
                        { id: 2, label: 'Context / Specific Angle', placeholder: 'Optional details...', type: 'textarea' }
                    ]
                };
        }
    };

    const config = getFormConfig();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!field1.trim()) return;

        // Combine fields into the standard StrategicBrief structure
        // We append Field 3 to description if it exists
        const combinedDescription = field3 
            ? `${field2}\n\nAdditional Context: ${field3}` 
            : field2;

        const brief: StrategicBrief = {
            marketTopic: field1,
            opportunityDescription: combinedDescription,
            analysisType: analysisType || 'b2b',
            dataPoints: field4 // Pass the data points explicitly
        };

        onGenerate(brief);
    };

    return (
        <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <span>🎯</span> Mission Briefing
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Dynamic Inputs Section */}
                <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 transition-all duration-300">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-teal-400 uppercase tracking-widest">{config.title}</h3>
                        <span className="text-[10px] bg-slate-900 text-slate-500 px-2 py-1 rounded">Protocol Active</span>
                    </div>
                    
                    <div className="space-y-4">
                        {config.inputs.map((input) => (
                            <div key={input.id}>
                                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase ml-1">{input.label}</label>
                                {input.type === 'textarea' ? (
                                    <textarea
                                        value={input.id === 1 ? field1 : input.id === 2 ? field2 : input.id === 3 ? field3 : field4}
                                        onChange={(e) => {
                                            if (input.id === 1) setField1(e.target.value);
                                            else if (input.id === 2) setField2(e.target.value);
                                            else if (input.id === 3) setField3(e.target.value);
                                            else setField4(e.target.value);
                                        }}
                                        placeholder={input.placeholder}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-24 text-sm"
                                        disabled={isLoading}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={input.id === 1 ? field1 : input.id === 2 ? field2 : input.id === 3 ? field3 : field4}
                                        onChange={(e) => {
                                            if (input.id === 1) setField1(e.target.value);
                                            else if (input.id === 2) setField2(e.target.value);
                                            else if (input.id === 3) setField3(e.target.value);
                                            else setField4(e.target.value);
                                        }}
                                        placeholder={input.placeholder}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                                        disabled={isLoading}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-3 uppercase ml-1">Select Analysis Protocol</label>
                    
                    <SectionHeader title="Core Strategic Intelligence" icon="🧠" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <ModuleButton type="b2b" currentType={analysisType} onClick={setAnalysisType} color="blue" icon="🏢">B2B ICP Analysis</ModuleButton>
                        <ModuleButton type="b2c" currentType={analysisType} onClick={setAnalysisType} color="teal" icon="🛍️">B2C Tribe Analysis</ModuleButton>
                        <ModuleButton type="starvingCrowd" currentType={analysisType} onClick={setAnalysisType} color="amber" icon="🔥">Starving Crowd</ModuleButton>
                        <ModuleButton type="competitiveDisplacement" currentType={analysisType} onClick={setAnalysisType} color="purple" icon="⚔️">Displacement</ModuleButton>
                    </div>

                    <SectionHeader title="Venture Architecture" icon="🏗️" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <ModuleButton type="aiVentureArchitect" currentType={analysisType} onClick={setAnalysisType} color="cyan" icon="🤖">AI Venture Architect</ModuleButton>
                        <ModuleButton type="dominanceBlueprint" currentType={analysisType} onClick={setAnalysisType} color="indigo" icon="👑">Dominance Blueprint</ModuleButton>
                        <ModuleButton type="gatekeeperBypass" currentType={analysisType} onClick={setAnalysisType} color="pink" icon="🤝">JV & Asset Leverage</ModuleButton>
                        <ModuleButton type="chimericAgent" currentType={analysisType} onClick={setAnalysisType} color="fuchsia" icon="🧬">Chimeric Agent</ModuleButton>
                    </div>

                    <SectionHeader title="Tactical Revenue Plays" icon="💰" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <ModuleButton type="loneWolf" currentType={analysisType} onClick={setAnalysisType} color="orange" icon="🐺">Lone Wolf</ModuleButton>
                        <ModuleButton type="cashflowProtocol" currentType={analysisType} onClick={setAnalysisType} color="green" icon="💸">Cashflow Protocol</ModuleButton>
                        <ModuleButton type="realEstateAlpha" currentType={analysisType} onClick={setAnalysisType} color="emerald" icon="🏠">Real Estate Alpha</ModuleButton>
                        <ModuleButton type="alphaSignal" currentType={analysisType} onClick={setAnalysisType} color="red" icon="📶">Alpha Signal</ModuleButton>
                    </div>

                    <SectionHeader title="Deep Reconnaissance (Advanced)" icon="📡" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <ModuleButton type="liveMarketIntel" currentType={analysisType} onClick={setAnalysisType} color="emerald" icon="🌐">Live Market Intel</ModuleButton>
                        <ModuleButton type="demandSignal" currentType={analysisType} onClick={setAnalysisType} color="sky" icon="⚡">Demand Signal</ModuleButton>
                        <ModuleButton type="opportunityRadar" currentType={analysisType} onClick={setAnalysisType} color="violet" icon="🎯">Opportunity Radar</ModuleButton>
                        <ModuleButton type="edgarAnomaly" currentType={analysisType} onClick={setAnalysisType} color="rose" icon="🔍">Edgar Anomaly</ModuleButton>
                    </div>

                    <SectionHeader title="Asset Fabrication" icon="🎬" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <ModuleButton type="aiVideoFoundry" currentType={analysisType} onClick={setAnalysisType} color="indigo" icon="🏭">AI Video Foundry</ModuleButton>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <div className="flex items-center space-x-3">
                         <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input 
                                type="checkbox" 
                                name="toggle" 
                                id="toggle" 
                                className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                checked={isTurboMode}
                                onChange={(e) => setIsTurboMode(e.target.checked)}
                            />
                            <label htmlFor="toggle" className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${isTurboMode ? 'bg-blue-600' : 'bg-slate-700'}`}></label>
                        </div>
                        <span className="text-sm text-slate-300 font-medium">Turbo Mode (Gemini 3)</span>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !field1.trim()}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? (
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                <span>Generating...</span>
                            </div>
                        ) : (
                            config.btn
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AudienceForm;
