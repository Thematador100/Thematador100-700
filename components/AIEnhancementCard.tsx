
import React, { useState } from 'react';
import { AIEnhancement } from '../types';

interface AIEnhancementCardProps {
    enhancement: AIEnhancement;
}

const AIEnhancementCard: React.FC<AIEnhancementCardProps> = ({ enhancement }) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(enhancement.godTierPrompt).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    if (!enhancement) return null;

    return (
        <div className="mt-8 bg-slate-950 border-2 border-indigo-500/60 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(79,70,229,0.3)] animate-fade-in no-print">
            <div className="bg-indigo-900/30 p-4 border-b border-indigo-500/30 flex justify-between items-center">
                <h3 className="text-sm font-black text-indigo-300 uppercase tracking-widest flex items-center gap-2">
                    <span className="text-xl animate-pulse">⚡</span>
                    Strategic Weaponization: 10x AI Play
                </h3>
                <span className="text-[9px] bg-indigo-500/30 text-indigo-200 px-2 py-1 rounded-full font-black tracking-tighter">PREDICTIVE ADVANTAGE ACTIVATED</span>
            </div>
            
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">The 10x Evolution</p>
                        <p className="text-slate-100 font-bold text-xl leading-tight">{enhancement.the10xIdea}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">The "Unfair" Advantage</p>
                        <p className="text-indigo-200 text-sm italic leading-relaxed">"{enhancement.competitiveAdvantage}"</p>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-800">
                    <div className="flex justify-between items-center mb-3">
                        <div>
                            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">God-Tier Implementation Prompt</p>
                            <p className="text-[10px] text-slate-500 mt-1 uppercase">Paste into Claude 3.5 or Gemini 1.5 Pro to build the tool</p>
                        </div>
                        <button 
                            onClick={handleCopy}
                            className={`text-[10px] font-black px-4 py-2 rounded-lg transition-all shadow-lg ${copySuccess ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95'}`}
                        >
                            {copySuccess ? 'PROMPT SECURED' : 'COPY GOD-TIER PROMPT'}
                        </button>
                    </div>
                    <div className="bg-slate-900/80 border border-indigo-500/20 p-4 rounded-xl relative group">
                        <pre className="text-slate-400 text-[10px] leading-4 whitespace-pre-wrap font-mono h-32 overflow-y-auto scrollbar-hide">
                            <code>{enhancement.godTierPrompt}</code>
                        </pre>
                        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
                    </div>
                    <p className="text-[9px] text-slate-600 mt-3 text-center italic font-medium">This prompt instructs an LLM to architect the underlying Python/Node/React codebase for this specific competitive wedge.</p>
                </div>
            </div>
        </div>
    );
};

export default AIEnhancementCard;
