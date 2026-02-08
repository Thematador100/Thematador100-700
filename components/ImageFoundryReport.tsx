import React from 'react';
import { ImageFoundryResult } from '../types';

interface ImageFoundryReportProps {
    result: ImageFoundryResult;
}

const ImageFoundryReport: React.FC<ImageFoundryReportProps> = ({ result }) => {
    return (
        <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-xl border border-blue-500/50 shadow-2xl p-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-center">
                🖼️ Image Foundry Results
            </h2>
            <p className="text-center text-slate-400 mt-1 mb-8">Your AI-generated images are ready.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {result.images.map((imgSrc, index) => (
                    <div key={index} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <img 
                            src={imgSrc} 
                            alt={`Generated image ${index + 1}`} 
                            className="rounded-md w-full h-auto object-contain" 
                        />
                    </div>
                ))}
            </div>
            {result.images.length === 0 && (
                 <p className="text-slate-400 text-center py-8">No images were generated.</p>
            )}
        </div>
    );
};

export default ImageFoundryReport;
