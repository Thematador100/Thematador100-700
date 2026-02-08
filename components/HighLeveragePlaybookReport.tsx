
import React from 'react';
import { HighLeveragePlaybook, B2BHighLeveragePlaybook, B2CHighLeveragePlaybook, AlphaAcquisitionPlaybook } from '../types';
import AlphaAcquisitionPlaybookReport from './AlphaAcquisitionPlaybookReport';
import SalesPitchAssetReport from './SalesPitchAssetReport';

interface HighLeveragePlaybookReportProps {
    playbook: HighLeveragePlaybook;
    analysisType: 'b2b' | 'b2c';
    onGenerateAcquisitionPlaybook: () => void;
    alphaAcquisitionPlaybook: AlphaAcquisitionPlaybook | null;
    onDeployAgents: (play: any, sourceReportType: string) => void;
    onGenerateAIVideoFoundry: (script: string) => void;
    onGenerateArchimedes: (playbook: HighLeveragePlaybook) => void;
}

const HighLeveragePlaybookReport: React.FC<HighLeveragePlaybookReportProps> = ({ 
    playbook, 
    analysisType, 
    onGenerateAcquisitionPlaybook, 
    alphaAcquisitionPlaybook,
    onGenerateAIVideoFoundry,
    onGenerateArchimedes 
}) => {
    if (!playbook) return null;

    // Type casting for safer access
    const b2b = analysisType === 'b2b' ? playbook as B2BHighLeveragePlaybook : null;
    const b2c = analysisType === 'b2c' ? playbook as B2CHighLeveragePlaybook : null;

    return (
        <div className="mt-12 bg-slate-950 rounded-3xl border-4 border-amber-500/20 shadow-[0_0_100px_rgba(245,158,11,0.1)] p-8 sm:p-12 animate-fade-in relative overflow-hidden">
            {/* Branding Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] -ml-32 -mb-32" />

            <div className="relative">
                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 tracking-tighter uppercase italic">
                        The Billionaire Playbook
                    </h2>
                    <p className="text-slate-500 mt-2 uppercase text-[10px] font-black tracking-[0.5em]">Direct High-Leverage Strategic Order</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Positioning Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 shadow-2xl">
                            <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest mb-6 border-b border-amber-500/20 pb-4">🏛️ Brand Positioning</h3>
                            <p className="text-slate-100 font-black text-2xl tracking-tight mb-4">{playbook.brandingPersona || 'Strategic Lead'}</p>
                            <blockquote className="mt-4 border-l-4 border-amber-500 pl-6 italic text-slate-300 bg-slate-950/50 p-6 rounded-r-2xl text-lg leading-relaxed shadow-inner">
                                "{playbook.positioningStatement || 'Positioning intelligence generating...'}"
                            </blockquote>
                        </div>

                        {/* Asymmetric logic for B2B/B2C */}
                        {b2b && b2b.searchAndAcquisitionProtocol && (
                            <div className="bg-blue-900/10 p-8 rounded-2xl border border-blue-500/30">
                                <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">🎯 Alpha Signal Search Protocol</h3>
                                <p className="text-slate-200 font-bold mb-4">{b2b.searchAndAcquisitionProtocol.alphaSignal}</p>
                                <div className="space-y-2">
                                    {(b2b.searchAndAcquisitionProtocol.protocolSteps || []).map((s, i) => (
                                        <p key={i} className="text-sm text-slate-400 flex gap-3">
                                            <span className="text-blue-500 font-bold">Step {i+1}:</span> {s}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}

                        {b2c && b2c.asymmetricWedgeStrategy && (
                            <div className="bg-purple-900/10 p-8 rounded-2xl border border-purple-500/30">
                                <h3 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-4">⚡ Asymmetric Wedge Strategy</h3>
                                <p className="text-slate-200 font-bold mb-2">Target: {b2c.asymmetricWedgeStrategy.targetMicroTribe}</p>
                                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 mt-4">
                                    <p className="text-xs text-purple-400 font-bold uppercase mb-1">The Wedge ({b2c.asymmetricWedgeStrategy.asymmetricWedge?.wedgeType})</p>
                                    <p className="text-slate-100 font-semibold">{b2c.asymmetricWedgeStrategy.asymmetricWedge?.idea}</p>
                                    <p className="text-slate-500 text-[10px] mt-1 italic">{b2c.asymmetricWedgeStrategy.asymmetricWedge?.rationale}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Offer Column */}
                    <div className="lg:col-span-1 space-y-8">
                         <div className="bg-amber-900/10 border-2 border-amber-500/40 p-8 rounded-2xl h-full shadow-[0_15px_40px_rgba(245,158,11,0.1)]">
                            <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest mb-6">💎 The Irresistible Offer</h3>
                            <h4 className="text-slate-100 font-black text-xl mb-2">{playbook.irresistibleOffer?.offerName || 'The Core Solution'}</h4>
                            <p className="text-amber-400 font-black text-4xl mb-6 tracking-tighter">{playbook.irresistibleOffer?.pricePoint || 'PREMIUM'}</p>
                            
                            <div className="space-y-4">
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Offer Components:</p>
                                {(playbook.irresistibleOffer?.components || []).map((comp, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                        <span className="text-amber-500 font-bold">+</span>
                                        <p className="text-xs text-slate-300 font-medium leading-snug">{comp}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Embed Sales Pitch Asset here */}
                            {playbook.irresistibleOffer?.salesPitchAsset && (
                                <div className="mt-6 pt-6 border-t border-amber-500/20">
                                    <SalesPitchAssetReport 
                                        asset={playbook.irresistibleOffer.salesPitchAsset} 
                                        onGenerateAIVideoFoundry={onGenerateAIVideoFoundry}
                                        title="Core Sales Pitch & VSL"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-6 text-center">Revenue Funnel Architecture</h3>
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {(playbook.marketingFunnel || []).map((step, i) => (
                            <div key={i} className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-black text-lg mb-4 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                                    {i+1}
                                </div>
                                <p className="text-xs text-slate-200 font-bold leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-12 border-t border-amber-500/20 text-center">
                    <p className="text-amber-200 font-black text-2xl italic tracking-tight leading-relaxed max-w-2xl mx-auto">
                        "{playbook.finalWisdom || 'Execution speed is the only barrier to entry.'}"
                    </p>
                </div>

                 {!alphaAcquisitionPlaybook && (
                    <div className="pt-16 text-center no-print flex flex-col sm:flex-row justify-center gap-6">
                        <div>
                            <button
                                onClick={onGenerateAcquisitionPlaybook}
                                className="bg-red-600 hover:bg-red-500 text-white font-black py-5 px-14 rounded-2xl shadow-[0_15px_30px_rgba(220,38,38,0.4)] transition-all hover:scale-105 active:scale-95 uppercase tracking-widest text-sm w-full sm:w-auto"
                            >
                                Execute Alpha Acquisition Protocol
                            </button>
                            <p className="text-[10px] text-slate-600 font-black mt-6 uppercase tracking-[0.4em]">Final Direct-Response Activation</p>
                        </div>
                        <div>
                            <button
                                onClick={() => onGenerateArchimedes(playbook)}
                                className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold py-5 px-14 rounded-2xl border-2 border-amber-500/20 hover:border-amber-500/50 transition-all uppercase tracking-widest text-sm w-full sm:w-auto flex items-center justify-center gap-2"
                            >
                                <span className="text-xl">🏛️</span> Archimedes Leverage
                            </button>
                            <p className="text-[10px] text-slate-600 font-black mt-6 uppercase tracking-[0.4em]">Automate Strategy</p>
                        </div>
                    </div>
                )}
            </div>
            {alphaAcquisitionPlaybook && <AlphaAcquisitionPlaybookReport playbook={alphaAcquisitionPlaybook} />}
        </div>
    );
};

export default HighLeveragePlaybookReport;
