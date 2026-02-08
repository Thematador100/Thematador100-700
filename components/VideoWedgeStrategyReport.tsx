import React, { useState } from 'react';
import { VideoStrategy } from '../types';

interface VideoWedgeStrategyReportProps {
    strategy: VideoStrategy;
}

const VideoWedgeStrategyReport: React.FC<VideoWedgeStrategyReportProps> = ({ strategy }) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(strategy.videoGenerationPrompt).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };
    
    return (
        <div className="animate-fade-in space-y-6">
            <h3 className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Video Wedge Director's Briefing
            </h3>
            
            <div>
                <h4 className="font-semibold text-slate-200 mb-2">Video Script (30s)</h4>
                <div className="space-y-3 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    {strategy.script.map(scene => (
                        <div key={scene.scene} className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs border-b border-slate-800 pb-2 last:border-b-0 last:pb-0">
                            <div className="md:col-span-1">
                                <p className="font-bold text-purple-300">VISUAL:</p>
                                <p className="text-slate-400">{scene.visual}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="font-bold text-pink-300">VOICEOVER:</p>
                                <p className="text-slate-200 italic">"{scene.voiceover}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-slate-200">AI Video Generation Prompt</h4>
                    <button onClick={handleCopy} className="text-sm bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded-md transition">
                        {copySuccess ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                 <pre className="text-slate-300 text-xs whitespace-pre-wrap font-mono bg-slate-950 p-3 rounded-md"><code>{strategy.videoGenerationPrompt}</code></pre>
            </div>

             <div>
                <h4 className="font-semibold text-slate-200 mb-2">Distribution Strategy</h4>
                <p className="text-sm text-slate-300 bg-slate-900/50 p-4 rounded-lg border border-slate-700">{strategy.distributionStrategy}</p>
            </div>
        </div>
    );
};

export default VideoWedgeStrategyReport;