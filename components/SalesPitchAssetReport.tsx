
import React, { useState } from 'react';
import { SalesPitchAsset } from '../types';

interface SalesPitchAssetReportProps {
    asset: SalesPitchAsset;
    title?: string;
    onGenerateAIVideoFoundry?: (script: string) => void;
}

const SalesPitchAssetReport: React.FC<SalesPitchAssetReportProps> = ({ asset, title = "Sales Pitch Asset", onGenerateAIVideoFoundry }) => {
    const [copyScriptSuccess, setCopyScriptSuccess] = useState(false);
    const [copyPromptSuccess, setCopyPromptSuccess] = useState(false);

    if (!asset) {
        return (
            <div className="pt-4 mt-4 border-t border-slate-700 text-slate-500 italic text-sm text-center">
                Pitch asset generation pending...
            </div>
        );
    }

    const handleCopy = (text: string, type: 'script' | 'prompt') => {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            if (type === 'script') {
                setCopyScriptSuccess(true);
                setTimeout(() => setCopyScriptSuccess(false), 2000);
            } else {
                setCopyPromptSuccess(true);
                setTimeout(() => setCopyPromptSuccess(false), 2000);
            }
        });
    };

    return (
        <div className="pt-4 mt-4 border-t border-slate-700">
            <h3 className="text-lg font-semibold text-cyan-300 mb-2 border-b border-cyan-400/20 pb-1">{title}</h3>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 space-y-4">
                <div>
                    <h4 className="font-bold text-yellow-300">Pitch Persona:</h4>
                    <p className="text-slate-300 text-sm italic">"{asset.pitchPersona || 'N/A'}"</p>
                </div>
                <div className="relative">
                     <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-yellow-300">The "Money" Script (60-90s):</h4>
                        <button onClick={() => handleCopy(asset.pitchScript, 'script')} className="text-xs bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1 px-2 rounded-md transition">
                            {copyScriptSuccess ? 'Copied!' : 'Copy Script'}
                        </button>
                    </div>
                    <pre className="text-slate-300 text-xs whitespace-pre-wrap font-mono bg-slate-950 p-3 rounded-md max-h-40 overflow-y-auto">
                        <code>{asset.pitchScript || 'Script content pending. Try regenerating the report to force new content.'}</code>
                    </pre>
                </div>
                <div className="relative">
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-yellow-300">AI Video Scene Prompt:</h4>
                        <button onClick={() => handleCopy(asset.videoScenePrompt, 'prompt')} className="text-xs bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1 px-2 rounded-md transition">
                            {copyPromptSuccess ? 'Copied!' : 'Copy Prompt'}
                        </button>
                    </div>
                    <pre className="text-slate-300 text-xs whitespace-pre-wrap font-mono bg-slate-950 p-3 rounded-md max-h-40 overflow-y-auto">
                        <code>{asset.videoScenePrompt || 'Video prompt content pending. Try regenerating the report.'}</code>
                    </pre>
                </div>
                {onGenerateAIVideoFoundry && asset.pitchScript && (
                     <div className="pt-4 border-t border-slate-800 text-center">
                        <button
                            onClick={() => onGenerateAIVideoFoundry(asset.pitchScript)}
                            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition"
                        >
                            Build This Video in AI Video Foundry
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SalesPitchAssetReport;
