
import React, { useState } from 'react';
import { CashflowProtocolReport } from '../types';

interface CashflowProtocolReportProps {
    report: CashflowProtocolReport;
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

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const handleCopy = () => {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };
    return (
        <button onClick={handleCopy} className="absolute top-2 right-2 text-xs bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1 px-2 rounded-md transition">
            {copySuccess ? 'Copied!' : 'Copy'}
        </button>
    );
}

const CashflowProtocolReportComponent: React.FC<CashflowProtocolReportProps> = ({ report, onDeployAgents }) => {
    if (!report) return null;

    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border-2 border-green-500/50 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="text-center">
                 <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-300">
                    💰 48-Hour Cashflow Protocol
                </h2>
                <p className="text-slate-400 mt-2 mb-8">A direct, no-nonsense battle plan for rapid monetization.</p>
            </div>
            
            <div className="mt-8 space-y-8">
                {report.mindsetCalibration && (
                    <Section title="Mindset Calibration" icon="🧠" accentColor="text-green-300">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <p className="text-xs text-slate-400 uppercase font-semibold">Core Principle:</p>
                            <p className="text-slate-200 text-sm font-semibold mb-3">{report.mindsetCalibration.corePrinciple || 'Absolute Commitment'}</p>
                            <p className="text-xs text-slate-400 uppercase font-semibold">Your Affirmation:</p>
                            <blockquote className="mt-1 border-l-4 border-green-500 pl-3 italic text-slate-100 text-lg bg-slate-950 p-2 rounded-r-lg">
                                "{report.mindsetCalibration.affirmation || 'Speed is my ultimate weapon.'}"
                            </blockquote>
                        </div>
                    </Section>
                )}

                {report.highTicketOffer && (
                    <Section title="High-Ticket Offer Construction" icon="📦" accentColor="text-green-300">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-lime-300">{report.highTicketOffer.offerName || 'The Alpha Solution'}</h4>
                                <p className="text-slate-300 text-sm">Core Components:</p>
                            </div>
                            <p className="font-bold text-3xl text-green-400">{report.highTicketOffer.pricePoint || 'Premium'}</p>
                            </div>
                            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 mt-2">
                                {(report.highTicketOffer.coreComponents || []).map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                            {report.highTicketOffer.irresistibleBonuses && (
                                <div className="mt-4 pt-4 border-t border-slate-800">
                                    <p className="text-slate-300 text-sm">Irresistible Bonuses:</p>
                                    <div className="mt-2 space-y-2">
                                        {report.highTicketOffer.irresistibleBonuses.map((bonus, i) => (
                                            bonus ? (
                                                <div key={i} className="p-2 rounded bg-slate-950 flex justify-between items-center text-xs">
                                                    <p className="text-slate-200">{bonus.name}</p>
                                                    <p className="font-semibold text-amber-300">(Value: {bonus.value})</p>
                                                </div>
                                            ) : null
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Section>
                )}
                
                {report.prospectingDirective && (
                    <Section title="Prospecting Directive" icon="🎯" accentColor="text-green-300">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 space-y-4">
                            <div>
                                <h4 className="font-bold text-lime-300">Ideal Client Profile ("Bleeding Neck"):</h4>
                                <p className="text-slate-300 text-sm mt-1">{report.prospectingDirective.idealClientProfile}</p>
                            </div>
                            <div className="relative">
                                <h4 className="font-bold text-lime-300">The "Kill List" Query:</h4>
                                <CopyButton text={report.prospectingDirective.killListQuery} />
                                <pre className="text-slate-300 text-xs whitespace-pre-wrap font-mono bg-slate-950 p-3 rounded-md mt-1 pr-16">
                                    <code>{report.prospectingDirective.killListQuery}</code>
                                </pre>
                            </div>
                        </div>
                    </Section>
                )}

                {report.closingScript && (
                    <Section title="Closing Script (Straight Line)" icon="🗣️" accentColor="text-green-300">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 space-y-4">
                            <div className="relative">
                                <h4 className="font-bold text-lime-300 text-sm">Opening:</h4>
                                <CopyButton text={report.closingScript.opening} />
                                <p className="text-xs text-slate-300 mt-1 italic pr-16">"{report.closingScript.opening}"</p>
                            </div>
                            <div className="relative">
                                <h4 className="font-bold text-lime-300 text-sm">Pain-Finding Questions:</h4>
                                <CopyButton text={(report.closingScript.painFindingQuestions || []).join('\n')} />
                                <ul className="list-decimal list-inside text-xs text-slate-300 mt-1 space-y-1 pr-16">
                                    {(report.closingScript.painFindingQuestions || []).map((q, i) => <li key={i} className="italic">"{q}"</li>)}
                                </ul>
                            </div>
                            <div className="relative">
                                <h4 className="font-bold text-lime-300 text-sm">Solution Presentation & Close:</h4>
                                <CopyButton text={`${report.closingScript.solutionPresentation}\n\n${report.closingScript.close}`} />
                                <p className="text-xs text-slate-300 mt-1 italic pr-16">"{report.closingScript.solutionPresentation} ... {report.closingScript.close}"</p>
                            </div>
                        </div>
                    </Section>
                )}

                 {report.battlePlan48Hours && (
                    <Section title="48-Hour Battle Plan" icon="⏱️" accentColor="text-green-300">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 space-y-3">
                            <div>
                                <p className="text-xs text-lime-300 uppercase font-semibold">Hours 0-6:</p>
                                <p className="text-slate-300 text-sm">{report.battlePlan48Hours.hours0_6}</p>
                            </div>
                            <div>
                                <p className="text-xs text-lime-300 uppercase font-semibold">Hours 7-24:</p>
                                <p className="text-slate-300 text-sm">{report.battlePlan48Hours.hours7_24}</p>
                            </div>
                            <div>
                                <p className="text-xs text-lime-300 uppercase font-semibold">Hours 25-48:</p>
                                <p className="text-slate-300 text-sm">{report.battlePlan48Hours.hours25_48}</p>
                            </div>
                        </div>
                    </Section>
                )}
                
                 <div className="pt-8 mt-8 border-t-2 border-dashed border-purple-500/30 text-center no-print">
                    <button
                        onClick={() => onDeployAgents(report, 'Cashflow Protocol')}
                        className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-600 transition duration-200 shadow-lg"
                    >
                        Deploy AI Agents to Execute
                    </button>
                    <p className="text-xs text-slate-500 mt-2">Accelerate your 48-hour sprints with AI workforce integration.</p>
                </div>
            </div>
        </div>
    );
};

export default CashflowProtocolReportComponent;
