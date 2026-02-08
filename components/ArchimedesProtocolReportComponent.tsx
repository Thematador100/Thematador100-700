
import React from 'react';
import { ArchimedesProtocolReport, ArsenalProtocol, ToolingStack } from '../types';

interface ArchimedesProtocolReportProps {
    report: ArchimedesProtocolReport;
    onDeployAgents: (play: any, sourceReportType: string) => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode; icon: string; accentColor: string }> = ({ title, children, icon, accentColor }) => (
    <div className="pt-6 border-t border-slate-700">
        <h3 className={`text-xl font-semibold ${accentColor} mb-3 flex items-center`}>
             <span className="text-2xl mr-3">{icon}</span>
             {title}
        </h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const ToolingStackDisplay: React.FC<{ stack: ToolingStack }> = ({ stack }) => {
    if (!stack) return <div className="text-xs text-slate-500 italic">No tooling stack data.</div>;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-800 p-2 rounded">
                <p className="font-bold text-green-400">✓ Best-in-Class</p>
                <p className="text-slate-200 font-semibold">{stack?.bestInClass?.name || 'N/A'}</p>
                <p className="text-slate-400 italic mt-1">{stack?.bestInClass?.rationale || 'N/A'}</p>
            </div>
            <div className="bg-slate-800 p-2 rounded">
                <p className="font-bold text-yellow-400">✓ Cost-Effective</p>
                <p className="text-slate-200 font-semibold">{stack?.costEffectiveAlternative?.name || 'N/A'}</p>
                <p className="text-slate-400 italic mt-1">{stack?.costEffectiveAlternative?.rationale || 'N/A'}</p>
            </div>
            <div className="bg-slate-800 p-2 rounded">
                <p className="font-bold text-blue-400">✓ Free/Open-Source</p>
                <p className="text-slate-200 font-semibold">{stack?.freeOrOpenSource?.name || 'N/A'}</p>
                <p className="text-slate-400 italic mt-1">{stack?.freeOrOpenSource?.rationale || 'N/A'}</p>
            </div>
        </div>
    );
};

const ArsenalProtocolCard: React.FC<{ protocol: ArsenalProtocol }> = ({ protocol }) => {
    if (!protocol) return null;
    return (
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-700">
            <h4 className="font-bold text-rose-300">{protocol?.title || 'Protocol'}</h4>
            <p className="text-xs text-slate-400 mt-1">{protocol?.description || 'Strategic automation layer.'}</p>
            {protocol?.tooling && (
                <div className="mt-3 pt-3 border-t border-slate-800">
                    <h5 className="text-xs font-semibold text-slate-300 mb-2">Tooling Stack Analysis</h5>
                    <ToolingStackDisplay stack={protocol.tooling} />
                </div>
            )}
             {protocol?.serverlessFunctionCode && (
                <div className="mt-3 pt-3 border-t border-slate-800">
                    <h5 className="text-xs font-semibold text-slate-300 mb-2">Deployable Vercel Function</h5>
                    <pre className="text-slate-300 text-[10px] leading-3 whitespace-pre-wrap font-mono bg-slate-800 p-2 rounded-md max-h-40 overflow-y-auto"><code>{protocol.serverlessFunctionCode}</code></pre>
                </div>
            )}
             {protocol?.requiredEnvVars && (
                <div className="mt-3 pt-3 border-t border-slate-800">
                    <h5 className="text-xs font-semibold text-slate-300 mb-2">Required Environment Variables</h5>
                    <div className="text-xs text-slate-400 space-y-1">
                        {(protocol.requiredEnvVars || []).map((v, i) => <p key={i}>- <code className="font-mono text-slate-300 bg-slate-800 p-0.5 rounded">{v.key}</code>: {v.description}</p>)}
                    </div>
                </div>
            )}
            {protocol?.agentApiCallProtocol && (
                <div className="mt-3 pt-3 border-t border-slate-800">
                    <h5 className="text-xs font-semibold text-slate-300 mb-2">Agent API Call Protocol</h5>
                    <pre className="text-slate-300 text-[10px] leading-3 whitespace-pre-wrap font-mono bg-slate-800 p-2 rounded-md max-h-40 overflow-y-auto"><code>{protocol.agentApiCallProtocol}</code></pre>
                </div>
            )}
        </div>
    );
};

const ArchimedesProtocolReportComponent: React.FC<ArchimedesProtocolReportProps> = ({ report, onDeployAgents }) => {
    if (!report) return null;
    const { theMandate, theSovereignFoundry, theAgentCSuite, theOperatorsCockpit, theSovereignArsenal } = report;

    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border-2 border-amber-500/50 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="text-center">
                 <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                    🏛️ The Archimedes Protocol
                </h2>
                <p className="text-slate-400 mt-2 mb-8">A Master Plan for Building an Empire of Leverage.</p>
            </div>
            
            <div className="mt-8 space-y-8">
                {theMandate && (
                    <Section title={theMandate.title || 'The Mandate'} icon="🧠" accentColor="text-amber-300">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <p className="text-xs text-slate-400 uppercase font-semibold">Core Principle:</p>
                            <p className="text-slate-200 text-sm font-semibold mb-3">{theMandate.corePrinciple || 'Strategic Domination'}</p>
                            <p className="text-xs text-slate-400 uppercase font-semibold">The Operator's Affirmation:</p>
                            <blockquote className="mt-1 border-l-4 border-amber-500 pl-3 italic text-slate-100 text-lg bg-slate-950 p-2 rounded-r-lg">
                                "{theMandate.affirmation || 'I execute with speed and conviction.'}"
                            </blockquote>
                        </div>
                    </Section>
                )}

                {theSovereignFoundry && (
                    <Section title={theSovereignFoundry.title || 'The Sovereign Foundry'} icon="🏭" accentColor="text-amber-300">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <p className="text-slate-300 text-sm mb-4">{theSovereignFoundry.description || 'Automated asset generation facility.'}</p>
                            {theSovereignFoundry.workflow && (
                                <>
                                    <h4 className="font-bold text-yellow-300">Automated Workflow:</h4>
                                    <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2 mt-2">
                                        {(theSovereignFoundry.workflow || []).map((step, i) => <li key={i}>{step}</li>)}
                                    </ol>
                                </>
                            )}
                        </div>
                    </Section>
                )}
                
                {theAgentCSuite && (
                    <Section title={theAgentCSuite.title || 'The Agent C-Suite'} icon="🤖" accentColor="text-amber-300">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 space-y-4">
                            <p className="text-slate-300 text-sm">{theAgentCSuite.description}</p>
                            
                            {/* Safe rendering for AI Agent Protocol to prevent crashes if missing */}
                            {theAgentCSuite.aiAgentProtocol ? (
                                <div className="bg-slate-900/50 p-3 rounded-lg border border-purple-500/30">
                                    <p className="text-purple-300 text-sm font-bold">AI Agent Protocol:</p>
                                    <p className="text-slate-300 text-xs mt-1">{theAgentCSuite.aiAgentProtocol.protocol}</p>
                                    <p className="text-purple-300 text-xs font-bold mt-2">Rationale:</p>
                                    <p className="text-slate-400 text-xs mt-1 italic">{theAgentCSuite.aiAgentProtocol.rationale}</p>
                                </div>
                            ) : (
                                <div className="text-xs text-red-400 bg-red-900/20 p-2 rounded">Protocol data pending generation...</div>
                            )}

                            {theAgentCSuite.aiAgentProtocol && (
                                <div className="pt-4 mt-4 border-t-2 border-dashed border-purple-500/30 text-center no-print">
                                    <button
                                        onClick={() => onDeployAgents(theAgentCSuite.aiAgentProtocol, 'Archimedes Protocol C-Suite')}
                                        className="text-lg bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold py-4 px-8 rounded-lg hover:from-amber-600 hover:to-yellow-500 transition duration-200 shadow-xl"
                                    >
                                        Deploy the C-Suite
                                    </button>
                                </div>
                            )}
                        </div>
                    </Section>
                )}

                {theOperatorsCockpit && (
                    <Section title={theOperatorsCockpit.title || 'The Operator\'s Cockpit'} icon="🕹️" accentColor="text-amber-300">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <p className="text-slate-300 text-sm mb-4">{theOperatorsCockpit.description}</p>
                            {theOperatorsCockpit.yourRole && (
                                <>
                                    <h4 className="font-bold text-yellow-300">Your High-Leverage Role:</h4>
                                    <ul className="list-disc list-inside text-sm text-slate-300 space-y-2 mt-2">
                                        {(theOperatorsCockpit.yourRole || []).map((role, i) => <li key={i}>{role}</li>)}
                                    </ul>
                                </>
                            )}
                        </div>
                    </Section>
                )}

                {theSovereignArsenal && (
                    <Section title={theSovereignArsenal.title || 'The Sovereign Arsenal'} icon="🛠️" accentColor="text-red-400">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <p className="text-slate-300 text-sm mb-4">{theSovereignArsenal.description}</p>
                            <div className="space-y-4">
                                {theSovereignArsenal.communicationsProtocol && <ArsenalProtocolCard protocol={theSovereignArsenal.communicationsProtocol} />}
                                {theSovereignArsenal.visionProtocol && <ArsenalProtocolCard protocol={theSovereignArsenal.visionProtocol} />}
                                {theSovereignArsenal.dataAcquisitionProtocol && <ArsenalProtocolCard protocol={theSovereignArsenal.dataAcquisitionProtocol} />}
                                {theSovereignArsenal.voiceIntelligenceProtocol && <ArsenalProtocolCard protocol={theSovereignArsenal.voiceIntelligenceProtocol} />}
                            </div>
                        </div>
                        {theSovereignArsenal.unconventionalToolsAndApis && (
                            <div className="mt-6 bg-slate-900/50 p-4 rounded-lg border-2 border-dashed border-sky-500/50">
                                <h4 className="font-bold text-sky-300 text-center text-lg">{theSovereignArsenal.unconventionalToolsAndApis.title}</h4>
                                <p className="text-xs text-slate-400 mt-1 text-center">{theSovereignArsenal.unconventionalToolsAndApis.description}</p>
                                <div className="mt-4 space-y-3">
                                    {(theSovereignArsenal.unconventionalToolsAndApis.tools || []).map((tool, i) => (
                                        <div key={i} className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                                            <h5 className="font-semibold text-slate-100">{tool.name}</h5>
                                            <p className="text-xs text-slate-300 mt-1"><strong className="text-sky-400">Use Case:</strong> {tool.useCase}</p>
                                            <p className="text-xs text-slate-300 mt-2"><strong className="text-sky-400">Agent Protocol:</strong> {tool.agentInteractionProtocol}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Section>
                )}
            </div>
        </div>
    );
};

export default ArchimedesProtocolReportComponent;
