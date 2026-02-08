import React, { useState, useEffect } from 'react';

interface VeoGeneratorProps {
    onGenerate: (args: { prompt: string, image?: { imageBytes: string, mimeType: string }, aspectRatio: '16:9' | '9:16' }) => void;
    isGenerating: boolean;
    videoUrl: string | null;
    operation: any;
    error: string | null;
    setError: (error: string | null) => void;
    onExit: () => void;
}

const VeoGenerator: React.FC<VeoGeneratorProps> = ({ onGenerate, isGenerating, videoUrl, operation, error, setError, onExit }) => {
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState<{ file: File, base64: string } | null>(null);
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = (reader.result as string).split(',')[1];
                setImage({ file, base64: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() && !image) {
            setError("Please provide a prompt or an image.");
            return;
        }
        setError(null);
        onGenerate({
            prompt,
            image: image ? { imageBytes: image.base64, mimeType: image.file.type } : undefined,
            aspectRatio
        });
    };
    
    const renderGenerationStatus = () => {
        if (!isGenerating && !videoUrl) return null;
        
        let statusMessage = "Initializing video generation...";
        if (operation?.metadata?.progressPercentage) {
            statusMessage = `Processing... ${operation.metadata.progressPercentage}% complete. This can take several minutes.`;
        } else if (operation?.done || videoUrl) {
            statusMessage = "Finalizing video...";
        }

        return (
             <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-teal-300 mb-4">Generation Status</h3>
                <div className="flex items-center space-x-4">
                     <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                     <p className="text-slate-300">{statusMessage}</p>
                </div>
                 <p className="text-xs text-slate-500 mt-4">
                    Please keep this tab open. Video generation is a complex process. We're providing clear and reassuring messages to keep you informed.
                </p>
             </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 relative">
                 <button onClick={onExit} className="absolute top-0 right-0 text-slate-500 hover:text-slate-300 text-2xl leading-none">&times;</button>
                <h2 className="text-3xl font-bold text-teal-300">AI Video Generation</h2>
                <p className="text-slate-400">Create high-quality videos from a text prompt or an initial image using Veo.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                 <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">Prompt</label>
                    <textarea
                        id="prompt"
                        rows={3}
                        className="w-full bg-slate-800 border border-slate-600 rounded-md p-3 text-slate-200"
                        placeholder="e.g., A neon hologram of a cat driving at top speed"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </div>
                 <div>
                    <label htmlFor="image-upload" className="block text-sm font-medium text-slate-300 mb-2">Starting Image (Optional)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {image ? (
                                <div className="text-slate-300">
                                    <img src={URL.createObjectURL(image.file)} alt="Preview" className="mx-auto h-24 rounded"/>
                                    <p className="text-xs mt-2">{image.file.name}</p>
                                    <button type="button" onClick={() => setImage(null)} className="text-xs text-red-400 hover:underline mt-1">Remove</button>
                                </div>
                            ) : (
                                <>
                                    <svg className="mx-auto h-12 w-12 text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-slate-400">
                                        <label htmlFor="image-upload" className="relative cursor-pointer bg-slate-700 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-800 focus-within:ring-blue-500 px-2">
                                            <span>Upload a file</span>
                                            <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleImageUpload} accept="image/png, image/jpeg" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-slate-500">PNG, JPG up to 10MB</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                 <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Aspect Ratio</label>
                    <div className="flex rounded-md shadow-sm">
                        <button type="button" onClick={() => setAspectRatio('16:9')} className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-md transition ${aspectRatio === '16:9' ? 'bg-blue-600 text-white z-10 ring-1 ring-blue-500' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>Landscape (16:9)</button>
                        <button type="button" onClick={() => setAspectRatio('9:16')} className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-md transition ${aspectRatio === '9:16' ? 'bg-blue-600 text-white z-10 ring-1 ring-blue-500' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>Portrait (9:16)</button>
                    </div>
                </div>

                 <div className="pt-4 border-t border-slate-700">
                    <button type="submit" disabled={isGenerating} className="w-full flex justify-center items-center bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed">
                        {isGenerating ? "Generating..." : "Generate Video"}
                    </button>
                </div>
            </form>
            
            {error && <div className="mt-4 text-center text-red-400 bg-red-900/50 border border-red-700 p-3 rounded-md">{error}</div>}

            {(isGenerating || videoUrl) && renderGenerationStatus()}
            
            {videoUrl && (
                 <div className="mt-8">
                    <h3 className="text-lg font-semibold text-center text-teal-300 mb-4">Your Generated Video</h3>
                    <video controls src={videoUrl} className="w-full rounded-lg shadow-lg" />
                 </div>
            )}
            <div className="mt-8 text-center">
                <button onClick={onExit} className="text-sm text-slate-400 hover:text-slate-200 transition">← Back to Main App</button>
            </div>
        </div>
    );
};

export default VeoGenerator;