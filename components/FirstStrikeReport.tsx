
import React, { useState } from 'react';
import { FirstStrikeReport, TargetDossier } from '../types';

interface FirstStrikeReportProps {
    report: FirstStrikeReport;
}

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };
    return (
        <button onClick={handleCopy} className="text-xs bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1 px-2 rounded-md transition">
            {copySuccess ? 'Copied!' : 'Copy'}
        </button>
    );
}

const TargetDossierCard: React.FC<{ dossier: TargetDossier }> = ({ dossier }) => (
    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
        <h4 className="font-bold text-red-300">Target Archetype:</h4>
        <p className="text-slate-300 text-sm mt-1">{dossier.archetypeDescription}</p>
        
        <div className="mt-4 pt-4 border-t border-slate-800">
            <h5 className="text-xs text-slate-400 uppercase font-semibold">"God-Tier" Search Queries:</h5>
            <div className="space-y-2 mt-2">
                {dossier.godTierDorkQueries.map((query, i) => (
                    <div key={i} className="relative bg-slate-950 p-2 rounded-md pr-16">
                        <pre className="text-slate-300 text-xs whitespace-pre-wrap font-mono"><code>{query}</code></pre>
                        <div className="absolute top-1/2 right-2 -translate-y-1/2">
                           <CopyButton text={query} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-800">
            <h5 className="text-xs text-slate-400 uppercase font-semibold">Bespoke First Contact Angle:</h5>
             <blockquote className="mt-2 border-l-4 border-red-500 pl-3 italic text-slate-300 text-xs bg-slate-950 p-2 rounded-r-lg">
                {dossier.firstContactAngle}
            </blockquote>
        </div>
    </div>
);


export const FirstStrikeReportComponent: React.FC<FirstStrikeReportProps> = ({ report }) => {
    return (
        <div className="mt-12 max-w-4xl mx-auto bg-slate-800/70 rounded-xl border-2 border-red-500/50 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                    🎯 First Strike Protocol
                </h2>
                <p className="text-slate-400 mt-2 mb-8">Your initial "kill list" of hyper-targeted prospects. Execute immediately.</p>
            </div>
            
            <div className="space-y-6">
                {report.map((dossier, index) => (
                    <TargetDossierCard key={index} dossier={dossier} />
                ))}
            </div>
        </div>
    );
};
