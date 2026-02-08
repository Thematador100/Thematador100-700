
import React from 'react';
import { AIVideoFoundryReport } from '../types';

interface AIVideoFoundryReportProps {
    report: AIVideoFoundryReport;
}

const AIVideoFoundryReportComponent: React.FC<AIVideoFoundryReportProps> = ({ report }) => {
    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border-2 border-blue-500/50 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    🏭 AI Video Foundry
                </h2>
                <p className="text-slate-400 mt-2 mb-8">An AI-generated blueprint for creating a video and building a video SaaS platform.</p>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 text-left">
                    <h3 className="text-lg font-semibold text-blue-300">Video Title</h3>
                    <p className="text-slate-200 text-xl font-bold mt-1">{report.title}</p>
                </div>
            </div>

            <div className="mt-8 space-y-8">
                {/* Director's Cut */}
                <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-3">🎬 Director's Cut (Scene-by-Scene)</h3>
                    <div className="space-y-4">
                        {report.directorsCut.map(scene => (
                            <div key={scene.scene} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                                <h4 className="font-bold text-cyan-300">Scene {scene.scene}</h4>
                                <p className="text-xs text-slate-300 mt-1 italic">"{scene.script}"</p>
                                <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 text-xs">
                                    <p><strong className="text-slate-400">Visuals:</strong> {scene.visualPrompts.map(p => `(${p.type}) ${p.prompt}`).join(', ')}</p>
                                    <p><strong className="text-slate-400">Voiceover:</strong> "{scene.voiceoverScript}"</p>
                                    <p><strong className="text-slate-400">Music:</strong> {scene.musicCue}</p>
                                    <p><strong className="text-slate-400">Overlay:</strong> {scene.overlayText}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Technical Implementation */}
                <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-3">🛠️ Technical Implementation Blueprint</h3>
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 space-y-4">
                        <div>
                            <h4 className="font-bold text-cyan-300">Recommended Tech Stack</h4>
                            <div className="space-y-2 mt-2">
                                {report.technicalImplementation.techStack.map((tech, i) => (
                                    tech ? (
                                        <div key={i} className="bg-slate-950 p-2 rounded">
                                            <p className="font-semibold text-slate-200 text-sm">{tech.name}</p>
                                            <p className="text-xs text-slate-400 italic mt-1">{tech.rationale}</p>
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-cyan-300">Architecture Plan</h4>
                            <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2 mt-2">
                                {report.technicalImplementation.architecture.map((step, i) => <li key={i}>{step}</li>)}
                            </ol>
                        </div>
                    </div>
                </div>
                
                {/* SaaS Monetization Model */}
                <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-3">🚀 SaaS Monetization Model</h3>
                     <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 space-y-4">
                        <div>
                            <h4 className="font-bold text-cyan-300">Pricing Tiers</h4>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                                {report.saasMonetizationModel.pricingTiers.map((tier, i) => (
                                    tier ? (
                                        <div key={i} className="bg-slate-950 p-3 rounded text-center">
                                            <p className="font-bold text-slate-200">{tier.name}</p>
                                            <p className="font-bold text-2xl text-amber-300 my-1">{tier.price}</p>
                                            <p className="text-xs text-slate-400">{tier.description}</p>
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-cyan-300">Go-to-Market Strategy</h4>
                            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 mt-2">
                                {report.saasMonetizationModel.go_to_market_strategy.map((step, i) => <li key={i}>{step}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIVideoFoundryReportComponent;
